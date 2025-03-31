import { AppSidebar } from "@app/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@app/components/ui/breadcrumb";
import { Button } from "@app/components/ui/button";
import { Separator } from "@app/components/ui/separator";
import ShowError from "@app/components/ui/show-error";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@app/components/ui/sidebar";
import { ROUTES } from "@app/config/routes";
import { useAuthContext } from "@app/contexts/auth-context";
import { useToast } from "@app/hooks/use-toast";
import { AppMatch } from "@app/types/breadcrumb";
import { requireAuth } from "@app/utils/auth-server";
import ErrorBoundaryParserError from "@app/utils/error-bondary";
import { createSuccessToast } from "@app/utils/toast.server";
import { LoaderFunctionArgs } from "@remix-run/node";
import {
  json,
  MetaFunction,
  Outlet,
  useMatches,
  useRouteError,
} from "@remix-run/react";
import React from "react";
import { useTranslation } from "react-i18next";

export const meta: MetaFunction = () => {
  return [{ title: "App" }, { name: "description", content: "App" }];
};

export const handle = {
  breadcrumb: {
    label: "route.app.root",
    href: ROUTES.app.root,
  },
};

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAuth(request);
  const toastResult = await createSuccessToast(
    request,
    "Título do toast", // título
    "Mensagem detalhada", // descrição (opcional)
    {}, // parâmetros de tradução do título (opcional)
    {} // parâmetros de tradução da descrição (opcional)
  );

  // Retornar os dados + headers do toast
  return json(
    {},
    {
      headers: toastResult.headers,
    }
  );
}

export default function AppPage() {
  const matches = useMatches() as AppMatch[];
  const { t } = useTranslation();
  const { user } = useAuthContext();
  const breadcrumbs = matches
    .filter((match) => match.handle?.breadcrumb)
    .map((match) => {
      const breadcrumb =
        typeof match.handle.breadcrumb === "function"
          ? match.handle.breadcrumb(match.params)
          : match.handle.breadcrumb;
      return breadcrumb;
    });
  const { toast, success, error, warning, info } = useToast();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((crumb, index) => (
                  <React.Fragment key={index}>
                    <BreadcrumbItem className="hidden md:block">
                      {index === breadcrumbs.length - 1 ? (
                        <BreadcrumbPage>
                          {t(crumb.label, crumb.labelParams)}
                        </BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink href={crumb.href}>
                          {t(crumb.label, crumb.labelParams)}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {index < breadcrumbs.length - 1 && (
                      <BreadcrumbSeparator className="hidden md:block" />
                    )}
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Button
            onClick={() =>
              success({
                title: "toast.success.title",
                description: "toast.success.description",
                titleParams: { app: "Toast" },
              })
            }
          >
            Click me
          </Button>
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  const { errorMessage, errorCode } = ErrorBoundaryParserError({ error });
  return <ShowError code={errorCode} message={errorMessage} />;
}
