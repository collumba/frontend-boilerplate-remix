import { Button } from "@app/components/ui/button";
import {
  DataTable,
  DataTableError,
  DataTableSkeleton,
} from "@app/components/ui/data-table";
import PageHeader from "@app/components/ui/page-header";
import { ENTITY_CONFIG, useEntityColumns } from "@app/config/mdm";
import { ROUTES } from "@app/config/routes";
import { useDataTable } from "@app/hooks/useDataTable";
import { MdmService } from "@app/services/mdm";
import { EntityMap, EntityType } from "@app/types/mdm";
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

  // if (isLoading || isFetching) return <DataTableSkeleton />;
  // if (error)
  //   return (
  //     <DataTableError
  //       title={error.status?.toString()}
  //       description={error.message}
  //       reload={refetch}
  //     />
  //   );

  // return <DataTable table={table} />;
}
