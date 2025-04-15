import { MdmService } from "@app/shared/api/mdm";
import { ENTITY_CONFIG, useEntityColumns } from "@app/shared/config/mdm";
import { ROUTES } from "@app/shared/config/routes";
import { useDataTable } from "@app/shared/lib/hooks/useDataTable";
import { EntityMap, EntityType } from "@app/shared/types/mdm";
import { Button } from "@app/shared/ui/button";
import {
  DataTable,
  DataTableError,
  DataTableSkeleton,
} from "@app/shared/ui/data-table";
import PageHeader from "@app/shared/ui/page-header";
import { LoaderFunctionArgs } from "@remix-run/node";
import { json, useLoaderData, useNavigate } from "@remix-run/react";
import { PlusIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

export const handle = {
  breadcrumb: (params: { entity: string }) => ({
    label: `common.action.list`,
    labelParams: { value: params.entity },
    href: `${ROUTES.app.root}/${params.entity}`,
  }),
};

export async function loader({ params }: LoaderFunctionArgs) {
  const { entity } = params;

  if (!entity || !Object.keys(ENTITY_CONFIG).includes(entity)) {
    throw new Response("Entity not found", { status: 404 });
  }

  return json({ entity });
}

export default function MassDataManagementListPage() {
  const { entity } = useLoaderData<typeof loader>();

  const entityType = entity as EntityType;

  const columns = useEntityColumns(entityType);
  const service = new MdmService(entityType);

  const { table, isLoading, isFetching, error, refetch } = useDataTable<
    EntityMap[typeof entityType]
  >({
    queryKey: entityType,
    fetchData: (params) => service.fetch(params),
    columns,
    initialPageSize: 20,
    defaultSort: { id: "name", desc: false },
  });
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div>
      <PageHeader title={`entities.${entity}.namePlural`} hasBackButton>
        <Button
          variant="outline"
          onClick={() => navigate(ROUTES.app.mdm.create(entity))}
        >
          <PlusIcon className="h-4 w-4" />
          {t("common.action.create")}
        </Button>
      </PageHeader>
      {isLoading || isFetching ? (
        <DataTableSkeleton />
      ) : error ? (
        <DataTableError
          title={error.status?.toString()}
          description={error.message}
          reload={refetch}
        />
      ) : (
        <DataTable table={table} />
      )}
    </div>
  );
}
