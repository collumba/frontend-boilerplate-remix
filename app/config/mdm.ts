import { useCharacterColumns } from "@app/features/mdm/character/useCharacterColumns";
import { useEpisodeColumns } from "@app/features/mdm/episode/useEpisodeColumns";
import { useLocationColumns } from "@app/features/mdm/location/useLocationColumns";
import { Character } from "@app/types/mdm/character";
import { Episode } from "@app/types/mdm/episode";
import { Location } from "@app/types/mdm/location";

export interface EntityFieldConfig {
  name: string;
  type:
    | "text"
    | "number"
    | "checkbox"
    | "select"
    | "date"
    | "textarea"
    | "radio"
    | "multiselect";
  required?: boolean;
  options?: Array<{ label: string; value: string }>;
}

// Interface base para configuração de entidade
export interface EntityConfig<T> {
  endpoint: string;
  fields?: Record<string, EntityFieldConfig>;
}

// Registre todas as entidades aqui
export const ENTITY_CONFIG = {
  character: {
    endpoint: "character",
    fields: {
      name: { name: "name", type: "text", required: true },
      status: {
        name: "status",
        type: "select",
        required: true,
        options: [
          { label: "entities.character.status.alive", value: "alive" },
          { label: "entities.character.status.dead", value: "dead" },
          { label: "entities.character.status.unknown", value: "unknown" },
        ],
      },
      gender: {
        name: "gender",
        type: "radio",
        required: true,
        options: [
          { label: "entities.character.gender.male", value: "male" },
          { label: "entities.character.gender.female", value: "female" },
          {
            label: "entities.character.gender.genderless",
            value: "genderless",
          },
          { label: "entities.character.gender.unknown", value: "unknown" },
        ],
      },
      traits: {
        name: "traits",
        type: "multiselect",
        required: false,
        options: [
          {
            label: "entities.character.traits.intelligent",
            value: "intelligent",
          },
          { label: "entities.character.traits.brave", value: "brave" },
          { label: "entities.character.traits.loyal", value: "loyal" },
          { label: "entities.character.traits.curious", value: "curious" },
          {
            label: "entities.character.traits.aggressive",
            value: "aggressive",
          },
        ],
      },
      species: { name: "species", type: "text", required: true },
      description: { name: "description", type: "textarea", required: false },
      in_active: { name: "in_active", type: "checkbox", required: false },
      birthDate: { name: "birthDate", type: "date", required: true },
    },
  },
  location: {
    endpoint: "location",
    fields: {
      name: { name: "name", type: "text", required: true },
      type: { name: "type", type: "text", required: true },
    },
  },
  episode: {
    endpoint: "episode",
    fields: {
      name: { name: "name", type: "text", required: true },
      air_date: { name: "air_date", type: "text", required: true },
      episode: { name: "episode", type: "text", required: true },
    },
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
