import {
  DataTable,
  DataTableError,
  DataTableSkeleton,
} from "@app/components/ui/data-table";
import { useCharactersColumns } from "@app/features/characters/list/useCharactersColumns";
import { useCharacterTable } from "@app/features/characters/list/useCharactersTable";
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
  const columns = useCharactersColumns();
  const table = useReactTable({
    data: data?.results || [],
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
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
