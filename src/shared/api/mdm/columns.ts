import { useCharacterColumns } from "@/features/mdm/character/useCharacterColumns";
import { ColumnFactory, EntityType } from "@/types/mdm";

// Map de factories de colunas por tipo de entidade
export const columnFactories: Record<EntityType, ColumnFactory<any>> = {
  character: {
    useColumns: useCharacterColumns,
  },
};
