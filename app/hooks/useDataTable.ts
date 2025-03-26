import { useTable } from "@app/hooks/useTable";
import { FetchParams } from "@app/types/api";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

interface UseDataTableProps<TData> {
  queryKey: string;
  fetchData: (params: FetchParams) => Promise<any>;
  columns: any[];
  initialPageSize?: number;
  defaultSort?: { id: string; desc: boolean };
}

export function useDataTable<TData>({
  queryKey,
  fetchData,
  columns,
  initialPageSize = 20,
  defaultSort,
}: UseDataTableProps<TData>) {
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
  } = useTable<TData>({
    queryKey,
    fetchData,
    initialPageSize,
    defaultSort,
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

  return {
    table,
    isLoading,
    isFetching,
    error,
    refetch,
  };
}
