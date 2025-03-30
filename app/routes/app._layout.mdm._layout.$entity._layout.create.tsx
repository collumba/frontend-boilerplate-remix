import EntityForm from "@app/components/entity-form";
import { ENTITY_CONFIG } from "@app/config/mdm";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useTranslation } from "react-i18next";

export const handle = {
  breadcrumb: (params: { entity: string }) => ({
    label: `common.action.create`,
    labelParams: { value: params.entity },
  }),
};

export async function loader({ params }: LoaderFunctionArgs) {
  const { entity } = params;

  if (!entity || !Object.keys(ENTITY_CONFIG).includes(entity)) {
    throw new Response("Entity not found", { status: 404 });
  }

  return json({ entity });
}

export default function MassDataManagementCreatePage() {
  const { entity } = useLoaderData<typeof loader>();
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-6">
      <EntityForm entity={entity as any} isCreate={true} />
    </div>
  );
}
