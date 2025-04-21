import { PassThrough } from 'node:stream';

import type { AppLoadContext, EntryContext } from '@remix-run/node';
import { createReadableStreamFromReadable } from '@remix-run/node';
import { RemixServer } from '@remix-run/react';
import * as i18n from '@shared/config/i18n';
import i18nServer from '@shared/lib/i18n/i18n.server';
import { createInstance, i18n as i18next } from 'i18next';
import { isbot } from 'isbot';
import { renderToPipeableStream } from 'react-dom/server';
import { I18nextProvider, initReactI18next } from 'react-i18next';

const ABORT_DELAY = 5_000;

// Group related parameters into a single object
interface RequestContext {
  request: Request;
  responseStatusCode: number;
  responseHeaders: Headers;
  remixContext: EntryContext;
  loadContext: AppLoadContext;
}

// Disable max-params for this function since it's a Remix API that we can't change
// eslint-disable-next-line max-params
export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  loadContext: AppLoadContext
) {
  // We need to adapt the existing API with individual parameters
  // by creating a context object to pass to our implementation
  const ctx: RequestContext = {
    request,
    responseStatusCode,
    responseHeaders,
    remixContext,
    loadContext,
  };

  return handleRequestImpl(ctx);
}

// Implementation that uses the context object
async function handleRequestImpl(ctx: RequestContext) {
  const { request, remixContext } = ctx;

  const instance = createInstance();
  const lng = await i18nServer.getLocale(request);
  const ns = i18nServer.getRouteNamespaces(remixContext);

  await instance.use(initReactI18next).init({ ...i18n, lng, ns });

  return isbot(request.headers.get('user-agent') || '')
    ? handleBotRequest(ctx, instance)
    : handleBrowserRequest(ctx, instance);
}

async function handleBotRequest(ctx: RequestContext, i18next: i18next) {
  const { request, responseStatusCode, responseHeaders, remixContext } = ctx;

  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      <I18nextProvider i18n={i18next}>
        <RemixServer context={remixContext} url={request.url} abortDelay={ABORT_DELAY} />
      </I18nextProvider>,
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);

          responseHeaders.set('Content-Type', 'text/html');

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            })
          );

          pipe(body);
        },
        onShellError(error: unknown) {
          reject(error);
        },
        onError(error: unknown) {
          // Don't set responseStatusCode in the variable from the outer closure
          // to avoid side effects. Instead, pass it to the Response constructor
          if (shellRendered) {
            console.error(error);
          }
        },
      }
    );

    setTimeout(abort, ABORT_DELAY);
  });
}

async function handleBrowserRequest(ctx: RequestContext, i18next: i18next) {
  const { request, responseStatusCode, responseHeaders, remixContext } = ctx;

  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      <I18nextProvider i18n={i18next}>
        <RemixServer context={remixContext} url={request.url} abortDelay={ABORT_DELAY} />
      </I18nextProvider>,
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);

          responseHeaders.set('Content-Type', 'text/html');

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            })
          );

          pipe(body);
        },
        onShellError(error: unknown) {
          reject(error);
        },
        onError(error: unknown) {
          // Don't set responseStatusCode in the variable from the outer closure
          // to avoid side effects. Instead, pass it to the Response constructor
          if (shellRendered) {
            console.error(error);
          }
        },
      }
    );

    setTimeout(abort, ABORT_DELAY);
  });
}
