import {
  DataTable,
  DataTableError,
  DataTableSkeleton,
} from "@app/components/ui/data-table";
import { useCharacterColumns } from "@app/features/characters/list/useCharacterColumns";
import { useDataTable } from "@app/hooks/useDataTable";
import { Character, CharacterService } from "@app/services/character";

const ENTITY = "character";

export const handle = {
  breadcrumb: (params: { entity: string }) => ({
    label: `entities.${params.entity}.name`,
    labelParams: { value: params.entity },
    href: `/app/${params.entity}`,
  }),
};

export default function MassDataManagementList() {
  const columns = useCharacterColumns();
  const characterService = new CharacterService();

  const { table, isLoading, isFetching, error, refetch } =
    useDataTable<Character>({
      queryKey: `${ENTITY}`,
      fetchData: (params) => characterService.fetchCharacters(params),
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
