import { useCharacterColumns } from "@app/features/mdm/character/useCharacterColumns";
import { useLocationColumns } from "@app/features/mdm/location/useLocationColumns";
export const ENTITY_CONFIG = {
  character: {
    endpoint: "character",
    useColumns: useCharacterColumns,
  },
  location: {
    endpoint: "location",
    useColumns: useLocationColumns,
  },
} as const;
