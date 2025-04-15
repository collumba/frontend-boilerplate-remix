import { useCharacterColumns } from "@app/features/mdm/character/useCharacterColumns";
import { ColumnFactory, EntityType } from "@app/types/mdm";

// Map de factories de colunas por tipo de entidade
export const columnFactories: Record<EntityType, ColumnFactory<any>> = {
  character: {
    useColumns: useCharacterColumns,
  },
};
