import {
  DataTable,
  DataTableError,
  DataTableSkeleton,
} from "@app/components/ui/data-table";
import { useCharacterColumns } from "@app/features/characters/list/useCharacterColumns";
import { useDataTable } from "@app/hooks/useDataTable";
import { Character, CharacterService } from "@app/services/character";

export default function CharactersListPage() {
  const columns = useCharacterColumns();
  const characterService = new CharacterService();

  const { table, isLoading, isFetching, error, refetch } =
    useDataTable<Character>({
      queryKey: "characters",
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
