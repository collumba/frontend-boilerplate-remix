import { Outlet } from "@remix-run/react";
import { ROUTES } from "src/shared/config/routes";

export const handle = {
  breadcrumb: {
    label: "route.app.mdm.root",
    href: ROUTES.app.mdm.root,
  },
};

export default function MassDataManagementLayout() {
  return <Outlet />;
}
