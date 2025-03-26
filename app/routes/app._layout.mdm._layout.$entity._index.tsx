import {
  DataTable,
  DataTableError,
  DataTableSkeleton,
} from "@app/components/ui/data-table";
import { ROUTES } from "@app/config/routes";
import { useCharacterColumns } from "@app/features/characters/list/useCharacterColumns";
import { useDataTable } from "@app/hooks/useDataTable";
import { ENTITY_CONFIG, EntityType } from "@app/services/base";
import { ServiceFactory } from "@app/services/factory";
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
  const columns = useCharacterColumns();

  // Validar se o entity é um tipo válido
  if (!entity || !Object.keys(ENTITY_CONFIG).includes(entity)) {
    throw new Error(`Invalid entity type: ${entity}`);
  }

  const service = ServiceFactory.getService(entity as EntityType);

  const { table, isLoading, isFetching, error, refetch } = useDataTable({
    queryKey: `${entity}`,
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
