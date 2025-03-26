import {
  DataTable,
  DataTableError,
  DataTableSkeleton,
} from "@app/components/ui/data-table";
import { useCharacterColumns } from "@app/features/characters/list/useCharacterColumns";
import { useCharacterTable } from "@app/features/characters/list/useCharacterTable";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

export default function CharactersListPage() {
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
  } = useCharacterTable();
  const columns = useCharacterColumns();

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
