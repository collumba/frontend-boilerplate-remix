import { ColumnFactory, EntityType } from "@app/types/mdm";
import { useCharacterColumns } from "src/features/mdm/character/useCharacterColumns";

// Map de factories de colunas por tipo de entidade
export const columnFactories: Record<EntityType, ColumnFactory<any>> = {
  character: {
    useColumns: useCharacterColumns,
  },
};
