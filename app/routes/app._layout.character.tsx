import { Avatar, AvatarFallback, AvatarImage } from "@app/components/ui/avatar";
import {
  DataTable,
  DataTableError,
  DataTableSkeleton,
} from "@app/components/ui/data-table";
import { fetchCharacters } from "@app/services/character";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { AxiosError } from "axios";

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
  },
  {
    accessorKey: "status",
    header: "Status",
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
      return <div>{row.original.created}</div>;
    },
  },
];

export default function CharactersListPage() {
  const { data, isLoading, error, refetch } = useQuery<
    {
      results: Character[];
      info: {
        count: number;
        pages: number;
      };
    },
    AxiosError
  >({
    queryKey: ["characters"],
    queryFn: fetchCharacters,
  });
  if (isLoading) return <DataTableSkeleton />;
  if (error)
    return (
      <DataTableError
        title={error.status?.toString()}
        description={error.message}
        reload={refetch}
      />
    );
  return <DataTable columns={columns} data={data?.results || []} />;
}
