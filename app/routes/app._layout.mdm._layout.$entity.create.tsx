import { ROUTES } from "@app/config/routes";

export const handle = {
  breadcrumb: (params: { entity: string }) => ({
    label: `route.mdm.create`,
    labelParams: { value: params.entity },
    href: `${ROUTES.app.root}/${params.entity}`,
  }),
};
export default function MassDataManagementCreate() {
  return <div>MassDataManagementCreate</div>;
}
