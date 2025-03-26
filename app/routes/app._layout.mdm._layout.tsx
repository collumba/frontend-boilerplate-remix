import { ROUTES } from "@app/config/routes";
import { Outlet } from "@remix-run/react";

export const handle = {
  breadcrumb: {
    label: `app.massDataManagement.name`,
    href: ROUTES.app.mdm.root,
  },
};

export default function MassDataManagement() {
  return <Outlet />;
}
