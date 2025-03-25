import { Avatar, AvatarFallback, AvatarImage } from "@app/components/ui/avatar";
import {
  DataTable,
  DataTableError,
  DataTableSkeleton,
} from "@app/components/ui/data-table";
import { useFormattedDate } from "@app/hooks/useFormattedDate";
import { fetchCharacters } from "@app/services/character";
import { useQuery } from "@tanstack/react-query";
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { AxiosError } from "axios";
import { useState } from "react";

export type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  created: string;
};

export const columns: ColumnDef<Character>[] = [
  {
    accessorKey: "id",
    header: "ID",
    enableHiding: false,
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      return (
        <Avatar className="h-8 w-8 rounded-lg">
          <AvatarImage src={row.original.image} alt={row.original.name} />
          <AvatarFallback className="rounded-lg">
            {row.original.name.at(0)}
          </AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    enableSorting: true,
  },
  {
    accessorKey: "status",
    header: "Status",
    enableSorting: false,
  },
  {
    accessorKey: "species",
    header: "Species",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "origin",
    header: "Origin",
    cell: ({ row }) => {
      return <div>{row.original.origin.name}</div>;
    },
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => {
      return <div>{row.original.location.name}</div>;
    },
  },
  {
    accessorKey: "episode",
    header: "Episode",
    cell: ({ row }) => {
      return <div>{row.original.episode.length}</div>;
    },
  },
  {
    accessorKey: "created",
    header: "Created",
    cell: ({ row }) => {
      return <div>{useFormattedDate(row.original.created)}</div>;
    },
  },
];

export default function CharactersListPage() {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 1,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "name",
      desc: false,
    },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const { data, isLoading, isFetching, error, refetch } = useQuery<
    {
      results: Character[];
      info: {
        count: number;
        pages: number;
        next: string | null;
        prev: string | null;
      };
    },
    AxiosError
  >({
    queryKey: ["characters", pageIndex, pageSize],
    queryFn: () => fetchCharacters({ pageIndex, pageSize }),

    initialData: {
      results: [],
      info: {
        count: 0,
        pages: 0,
        next: null,
        prev: null,
      },
    },
  });

  const table = useReactTable({
    data: data?.results || [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    manualPagination: true,
    rowCount: data?.info.count || 0,
    enableSorting: true,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: {
        pageIndex,
        pageSize,
      },
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
