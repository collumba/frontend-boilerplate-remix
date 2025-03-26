import { Character } from "@app/types/mdm/character";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

export const useLocationColumns = () => {
  const { t } = useTranslation();

  const columns: ColumnDef<Character>[] = [
    {
      accessorKey: "id",
      header: t("entities.character.columns.id"),
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: t("entities.character.columns.name"),
      enableSorting: true,
    },
  ];

  return columns;
};
