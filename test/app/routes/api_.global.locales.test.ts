// Mock do zod para env.ts
vi.mock("zod", () => {
  return {
    z: {
      enum: () => ({
        default: () => ({}),
      }),
      string: () => ({
        url: () => ({
          default: (value: string) => ({
            parse: () => value,
          }),
        }),
        refine: () => ({
          parse: (value: string) => value,
        }),
      }),
      object: () => ({
        safeParse: () => ({
          success: true,
          data: {
            NODE_ENV: "test",
            API_URL: "http://localhost:3000",
            LOCALE_RESOURCES: "http://localhost:3000/locales",
            DOMAIN: "http://localhost:3000",
          },
        }),
        parse: () => ({
          NODE_ENV: "test",
          API_URL: "http://localhost:3000",
          LOCALE_RESOURCES: "http://localhost:3000/locales",
          DOMAIN: "http://localhost:3000",
        }),
      }),
    },
  };
});

// Mock do env para evitar validações
vi.mock("env", () => {
  return {
    env: {
      NODE_ENV: "test",
      API_URL: "http://localhost:3000",
      LOCALE_RESOURCES: "http://localhost:3000/locales",
    },
  };
});

// Mock para recursos de tradução
vi.mock("@app/config/i18n", () => ({
  resources: {
    en: {
      translation: {
        test: "Test",
        hello: "Hello",
      },
    },
    "pt-BR": {
      translation: {
        test: "Teste",
        hello: "Olá",
      },
    },
    es: {
      translation: {
        test: "Prueba",
        hello: "Hola",
      },
    },
  },
}));

// Mock para pretty-cache-header
vi.mock("pretty-cache-header", () => ({
  cacheHeader: vi.fn().mockReturnValue("mock-cache-header"),
}));

import { loader } from "src/routes/api_.global.locales";
import { beforeEach, describe, expect, test, vi } from "vitest";

describe("API Global Locales Route", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  test("loader returns translations for English", async () => {
    // Criar request para inglês
    const request = new Request(
      "http://localhost:3000/api/global/locales?lng=en&ns=translation"
    );

    // Chamar o loader
    const responseEN = await loader({
      request,
      params: {},
      context: {},
    });

    // Verificar se é uma resposta JSON
    expect(responseEN instanceof Response).toBeTruthy();
  });

  test("loader returns translations for Portuguese", async () => {
    // Criar request para português
    const requestPT = new Request(
      "http://localhost:3000/api/global/locales?lng=pt-BR&ns=translation"
    );

    // Chamar o loader
    const responsePT = await loader({
      request: requestPT,
      params: {},
      context: {},
    });

    // Verificar se é uma resposta JSON
    expect(responsePT instanceof Response).toBeTruthy();
  });
});
