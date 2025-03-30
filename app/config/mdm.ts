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
  placeholder?: string;
  min?: number;
  max?: number;
  mask?: string;
  pattern?: string;
  helperText?: string;
  disabled?: boolean;
  readonly?: boolean;
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
      name: {
        name: "name",
        type: "text",
        required: true,
        placeholder: "entities.character.fields.namePlaceholder",
        min: 3,
        max: 100,
      },
      status: {
        name: "status",
        type: "select",
        required: true,
        placeholder: "entities.character.fields.statusPlaceholder",
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
        helperText: "entities.character.fields.genderHelperText",
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
      phoneNumber: {
        name: "phoneNumber",
        type: "text",
        required: true,
        mask: "+00 (00) 00000-0000",
        placeholder: "entities.character.fields.phoneNumberPlaceholder",
        helperText: "entities.character.fields.phoneNumberHelperText",
      },
      age: {
        name: "age",
        type: "number",
        required: true,
        min: 0,
        max: 1000,
        placeholder: "entities.character.fields.agePlaceholder",
      },
      traits: {
        name: "traits",
        type: "multiselect",
        required: true,
        placeholder: "entities.character.fields.traitsPlaceholder",
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
      species: {
        name: "species",
        type: "text",
        required: true,
        pattern: "^[A-Za-z ]+$",
        placeholder: "entities.character.fields.speciesPlaceholder",
      },
      description: {
        name: "description",
        type: "textarea",
        required: true,
        placeholder: "entities.character.fields.descriptionPlaceholder",
        min: 10,
        max: 500,
        helperText: "entities.character.fields.descriptionHelperText",
      },
      in_active: {
        name: "in_active",
        type: "checkbox",
        required: true,
        helperText: "entities.character.fields.inActiveHelperText",
      },
      birthDate: {
        name: "birthDate",
        type: "date",
        required: true,
        min: "1900-01-01",
        max: "2023-12-31",
        placeholder: "entities.character.fields.birthDatePlaceholder",
        helperText: "entities.character.fields.birthDateHelperText",
      },
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
