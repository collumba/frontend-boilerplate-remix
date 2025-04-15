export interface BreadcrumbHandleType {
  breadcrumb:
    | {
        label: string;
        labelParams?: Record<string, string>;
        href: string;
      }
    | ((params: Record<string, string>) => {
        label: string;
        labelParams?: Record<string, string>;
        href: string;
      });
}

export interface AppMatch {
  handle: BreadcrumbHandleType;
  params: Record<string, string>;
}
