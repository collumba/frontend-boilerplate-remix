import { useCharacterColumns } from '@/features/mdm/character/useCharacterColumns';
import { EntityMap, EntityType } from '@/shared/config/mdm';
import { ColumnFactory } from '@/shared/types/mdm';

// Map de factories de colunas por tipo de entidade
export const columnFactories: Record<EntityType, ColumnFactory<EntityMap[EntityType]>> = {
  character: {
    useColumns: useCharacterColumns,
  },
};
