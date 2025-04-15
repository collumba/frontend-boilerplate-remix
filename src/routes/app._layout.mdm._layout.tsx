import { ROUTES } from "@app/shared/config/routes";
import { Outlet } from "@remix-run/react";

export const handle = {
  breadcrumb: {
    label: "route.app.mdm.root",
    href: ROUTES.app.mdm.root,
  },
};

export default function MassDataManagementLayout() {
  return <Outlet />;
}
