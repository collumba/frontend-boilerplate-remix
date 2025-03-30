import EntityForm from "@app/components/entity-form";
import { ENTITY_CONFIG } from "@app/config/mdm";
import { EntityType } from "@app/types/mdm";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const handle = {
  breadcrumb: (params: { entity: string; id: string }) => ({
    label: `common.action.edit`,
    labelParams: { value: params.id },
  }),
};

export async function loader({ params }: LoaderFunctionArgs) {
  const { entity, id } = params;

  if (!entity || !id || !Object.keys(ENTITY_CONFIG).includes(entity)) {
    throw new Response("Entity not found", { status: 404 });
  }

  return json({ entity, id });
}

export default function MassDataManagementEditPage() {
  const { entity, id } = useLoaderData<typeof loader>();
  return (
    <div className="container mx-auto px-4 py-6">
      <EntityForm entity={entity as EntityType} id={id} isCreate={false} />
    </div>
  );
}
