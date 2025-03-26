import { Location } from "@app/types/mdm/location";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

const useLocationColumns = () => {
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
    {
      accessorKey: "type",
      header: t("entities.location.columns.type"),
    },
    {
      accessorKey: "dimension",
      header: t("entities.location.columns.dimension"),
    },
    {
      accessorKey: "created",
      header: t("entities.location.columns.created"),
    },
  ];

  return columns;
};

// Exportação padrão e nomeada
export default useLocationColumns;
export { useLocationColumns };
