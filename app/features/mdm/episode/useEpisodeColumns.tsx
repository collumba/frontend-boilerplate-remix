import { Location } from "@app/types/mdm/location";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

const useEpisodeColumns = () => {
  const { t } = useTranslation();

  const columns: ColumnDef<Location>[] = [
    {
      accessorKey: "id",
      header: t("entities.location.columns.id"),
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: t("entities.location.columns.name"),
      enableSorting: true,
    },
  ];

  return columns;
};

// Exportação padrão e nomeada
export default useEpisodeColumns;
export { useEpisodeColumns };
