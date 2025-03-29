import { ROUTES } from "@app/config/routes";

export const handle = {
  breadcrumb: (params: { entity: string }) => ({
    label: `common.action.create`,
    labelParams: { value: params.entity },
    href: `${ROUTES.app.mdm.create(params.entity)}`,
  }),
};
export default function MassDataManagementCreate() {
  return <div>MassDataManagementCreate</div>;
}
