import {
  DataTable,
  DataTableError,
  DataTableSkeleton,
} from "@app/components/ui/data-table";
import { ENTITY_CONFIG } from "@app/config/mdm";
import { ROUTES } from "@app/config/routes";
import { useDataTable } from "@app/hooks/useDataTable";
import { MdmService } from "@app/services/mdm";
import { EntityMap, EntityType } from "@app/types/mdm";
import { useParams } from "@remix-run/react";

export const handle = {
  breadcrumb: (params: { entity: string }) => ({
    label: `entities.${params.entity}.namePlural`,
    labelParams: { value: params.entity },
    href: `${ROUTES.app.root}/${params.entity}`,
  }),
};

export default function MassDataManagementList() {
  const { entity } = useParams();

  if (!entity || !Object.keys(ENTITY_CONFIG).includes(entity)) {
    throw new Error(`Invalid entity type: ${entity}`);
  }

  const entityType = entity as EntityType;

  const columns = ENTITY_CONFIG[entityType].useColumns();
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

  if (isLoading || isFetching) return <DataTableSkeleton />;
  if (error)
    return (
      <DataTableError
        title={error.status?.toString()}
        description={error.message}
        reload={refetch}
      />
    );

  return <DataTable table={table} />;
}
