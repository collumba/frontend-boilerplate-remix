import { EntityMap, EntityType } from '@shared/config/mdm';
import { ColumnFactory } from '@shared/types/mdm';

import { useCharacterColumns } from '@/features/mdm/character/useCharacterColumns';

// Map de factories de colunas por tipo de entidade
export const columnFactories: Record<EntityType, ColumnFactory<EntityMap[EntityType]>> = {
  character: {
    useColumns: useCharacterColumns,
  },
};
