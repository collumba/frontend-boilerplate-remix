import { LoaderFunctionArgs } from "@remix-run/node";
import {
  MetaFunction,
  Outlet,
  useMatches,
  useRouteError,
} from "@remix-run/react";
import React from "react";
import { useTranslation } from "react-i18next";

import { requireAuth } from "@/modules/auth/auth-server";
import { ROUTES } from "@/shared/config/routes";
import ErrorBoundaryParserError from "@/shared/lib/error-bondary";
import { AppMatch } from "@/shared/types/breadcrumb";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/ui/breadcrumb";
import { Separator } from "@/shared/ui/separator";
import ShowError from "@/shared/ui/show-error";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/shared/ui/sidebar";
import { AppSidebar } from "@/widgets/navigation/app-sidebar";

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
  return {};
}

export default function AppPage() {
  const matches = useMatches() as AppMatch[];
  const { t } = useTranslation();
  const breadcrumbs = matches
    .filter((match) => match.handle?.breadcrumb)
    .map((match) => {
      const breadcrumb =
        typeof match.handle.breadcrumb === "function"
          ? match.handle.breadcrumb(match.params)
          : match.handle.breadcrumb;
      return breadcrumb;
    });

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
