import { AppSidebar } from "@app/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@app/components/ui/breadcrumb";
import { Separator } from "@app/components/ui/separator";
import ShowError from "@app/components/ui/show-error";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@app/components/ui/sidebar";
import { ROUTES } from "@app/config/routes";
import ErrorBoundaryParserError from "@app/utils/error-bondary";
import { Outlet, useMatches, useRouteError } from "@remix-run/react";
import React from "react";
import { useTranslation } from "react-i18next";

interface Handle {
  breadcrumb: {
    label: string;
    href: string;
  };
}

interface AppMatch {
  handle: Handle;
}

export const handle = {
  breadcrumb: {
    label: "App",
    href: ROUTES.app.root,
  },
};

export default function AppPage() {
  const matches = useMatches() as AppMatch[];
  const breadcrumbs = matches
    .filter((match) => match.handle?.breadcrumb)
    .map((match) => match.handle.breadcrumb);
  const { t } = useTranslation();

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
                        <BreadcrumbPage>{t(crumb.label)}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink href={crumb.href}>
                          {t(crumb.label)}
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
