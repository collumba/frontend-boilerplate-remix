import { Avatar, AvatarFallback, AvatarImage } from "@app/components/ui/avatar";
import { useFormattedDate } from "@app/hooks/useFormattedDate";
import { Character } from "@app/services/character";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

const useCharacterColumns = () => {
  const { t } = useTranslation();

  const columns: ColumnDef<Character>[] = [
    {
      accessorKey: "id",
      header: t("entities.character.columns.id"),
      enableHiding: false,
    },
    {
      accessorKey: "image",
      header: t("entities.character.columns.image"),
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
      header: t("entities.character.columns.name"),
      enableSorting: true,
    },
    {
      accessorKey: "status",
      header: t("entities.character.columns.status"),
      enableSorting: false,
    },
    {
      accessorKey: "species",
      header: t("entities.character.columns.species"),
    },
    {
      accessorKey: "gender",
      header: t("entities.character.columns.gender"),
    },
    {
      accessorKey: "origin",
      header: t("entities.character.columns.origin"),
      cell: ({ row }) => {
        return <div>{row.original.origin.name}</div>;
      },
    },
    {
      accessorKey: "location",
      header: t("entities.character.columns.location"),
      cell: ({ row }) => {
        return <div>{row.original.location.name}</div>;
      },
    },
    {
      accessorKey: "episode",
      header: t("entities.character.columns.episode"),
      cell: ({ row }) => {
        return <div>{row.original.episode.length}</div>;
      },
    },
    {
      accessorKey: "created",
      header: t("entities.character.columns.created"),
      cell: ({ row }) => {
        return <div>{useFormattedDate(row.original.created)}</div>;
      },
    },
  ];

  return columns;
};

export { useCharacterColumns };
