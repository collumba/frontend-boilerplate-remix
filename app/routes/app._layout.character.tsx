import {
  DataTable,
  DataTableError,
  DataTableSkeleton,
} from "@app/components/ui/data-table";
import { useCharacterColumns } from "@app/features/characters/list/useCharacterColumns";
import { useTable } from "@app/hooks/useTable";
import { Character, CharacterService } from "@app/services/character";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

export default function CharactersListPage() {
  const columns = useCharacterColumns();
  const characterService = new CharacterService();

  const {
    data,
    isLoading,
    isFetching,
    error,
    refetch,
    pagination,
    setPagination,
    sorting,
    setSorting,
    columnVisibility,
    setColumnVisibility,
    rowSelection,
    setRowSelection,
  } = useTable<Character>({
    queryKey: "characters",
    fetchData: (params) => characterService.fetchCharacters(params),
    initialPageSize: 20,
    defaultSort: { id: "name", desc: false },
  });

  const table = useReactTable({
    data: data?.results || [],
    columns,
    onSortingChange: (updater) =>
      setSorting((prev) =>
        typeof updater === "function" ? updater(prev) : updater
      ),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: (updater) =>
      setColumnVisibility((prev) =>
        typeof updater === "function" ? updater(prev) : updater
      ),
    onRowSelectionChange: setRowSelection,
    onPaginationChange: (updater) =>
      setPagination((prev) =>
        typeof updater === "function" ? updater(prev) : updater
      ),
    manualPagination: true,
    enableSorting: true,
    pageCount: data?.info.pages || 0,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      pagination,
    },
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
