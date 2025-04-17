import { Outlet } from '@remix-run/react';

import { ROUTES } from '@/shared/config/routes';

export const handle = {
  breadcrumb: (params: { entity: string }) => ({
    label: `entities.${params.entity}.namePlural`,
    labelParams: { value: params.entity },
    href: `${ROUTES.app.mdm.list(params.entity)}`,
  }),
};
export default function MassDataManagementLayout() {
  return <Outlet />;
}
