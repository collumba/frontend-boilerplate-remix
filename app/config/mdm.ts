import { useCharacterColumns } from "@app/features/mdm/character/useCharacterColumns";
import useCharacterForm from "@app/features/mdm/character/useCharacterForm";
import { useEpisodeColumns } from "@app/features/mdm/episode/useEpisodeColumns";
import { useLocationColumns } from "@app/features/mdm/location/useLocationColumns";
import { Character } from "@app/types/mdm/character";
import { Episode } from "@app/types/mdm/episode";
import { Location } from "@app/types/mdm/location";

// Interface base para configuração de entidade
export interface EntityConfig<T> {
  endpoint: string;
}

// Registre todas as entidades aqui
export const ENTITY_CONFIG = {
  character: {
    endpoint: "character",
  },
  location: {
    endpoint: "location",
  },
  episode: {
    endpoint: "episode",
  },
} as const;

// Tipos gerados automaticamente a partir da configuração
export type EntityType = keyof typeof ENTITY_CONFIG;
export type EntityMap = {
  [K in EntityType]: K extends "character"
    ? Character
    : K extends "location"
    ? Location
    : K extends "episode"
    ? Episode
    : never;
};

// Função auxiliar para obter as colunas dinamicamente
export function useEntityColumns<T extends EntityType>(entity: T) {
  try {
    // Mapeia diretamente os hooks de colunas usando importações estáticas
    const columnsMap = {
      character: useCharacterColumns,
      location: useLocationColumns,
      episode: useEpisodeColumns,
    };

    // Obtenha a função de colunas do mapa
    const useColumns = columnsMap[entity];

    if (!useColumns) {
      throw new Error(
        `Não foi possível encontrar colunas para a entidade: ${entity}`
      );
    }

    // Execute o hook para obter as colunas
    return useColumns();
  } catch (error) {
    console.error(`Erro ao obter colunas para ${entity}:`, error);
    // Retorna colunas vazias para evitar quebrar a UI
    return [];
  }
}
export const useEntityForm = (entity: EntityType) => {
  const formsMap = {
    character: useCharacterForm,
    location: null,
    episode: null,
  };

  const useFormConfig = formsMap[entity];

  if (!useFormConfig) {
    throw new Error(
      `Não foi possível encontrar configuração para a entidade: ${entity}`
    );
  }
  return useFormConfig();
};
