import { useCharacterColumns } from '@/features/mdm/character/useCharacterColumns';
import { Character } from '@/shared/types/mdm/character';
import { LucideIcon, User } from 'lucide-react';

export interface EntityFieldConfig {
  name: string;
  type: 'text' | 'number' | 'checkbox' | 'select' | 'date' | 'textarea' | 'radio' | 'multiselect';
  required?: boolean;
  options?: Array<{ label: string; value: string }>;
  placeholder?: string;
  min?: number | string;
  max?: number | string;
  mask?: string;
  pattern?: string;
  helperText?: string;
  disabled?: boolean;
  readonly?: boolean;
  optionsSource?: 'static' | 'api';
  optionsEndpoint?: string;
  optionsParams?: Record<string, string>;
  entity?: keyof EntityMap;
}

// Base interface for entity configuration
export interface EntityConfig {
  endpoint: string;
  fields?: Record<string, EntityFieldConfig>;
  icon?: LucideIcon;
}

// Register all entities here
export const ENTITY_CONFIG: {
  [K in keyof EntityMap]: EntityConfig;
} = {
  character: {
    icon: User,
    endpoint: '/character',
    fields: {
      name: {
        name: 'name',
        type: 'text',
        required: true,
        placeholder: 'entities.character.fields.namePlaceholder',
        min: 3,
        max: 100,
      },
      status: {
        name: 'status',
        type: 'select',
        required: true,
        placeholder: 'entities.character.fields.statusPlaceholder',
        options: [
          { label: 'entities.character.status.alive', value: 'alive' },
          { label: 'entities.character.status.dead', value: 'dead' },
          { label: 'entities.character.status.unknown', value: 'unknown' },
        ],
      },
      gender: {
        name: 'gender',
        type: 'radio',
        required: true,
        helperText: 'entities.character.fields.genderHelperText',
        options: [
          { label: 'entities.character.gender.male', value: 'male' },
          { label: 'entities.character.gender.female', value: 'female' },
          {
            label: 'entities.character.gender.genderless',
            value: 'genderless',
          },
          { label: 'entities.character.gender.unknown', value: 'unknown' },
        ],
      },
      phoneNumber: {
        name: 'phoneNumber',
        type: 'text',
        required: true,
        mask: '+00 (00) 00000-0000',
        placeholder: 'entities.character.fields.phoneNumberPlaceholder',
        helperText: 'entities.character.fields.phoneNumberHelperText',
      },
      age: {
        name: 'age',
        type: 'number',
        required: true,
        min: 0,
        max: 1000,
        placeholder: 'entities.character.fields.agePlaceholder',
      },
      traits: {
        name: 'traits',
        type: 'multiselect',
        required: true,
        placeholder: 'entities.character.fields.traitsPlaceholder',
        options: [
          {
            label: 'entities.character.traits.intelligent',
            value: 'intelligent',
          },
          { label: 'entities.character.traits.brave', value: 'brave' },
          { label: 'entities.character.traits.loyal', value: 'loyal' },
          { label: 'entities.character.traits.curious', value: 'curious' },
          {
            label: 'entities.character.traits.aggressive',
            value: 'aggressive',
          },
        ],
      },
      species: {
        name: 'species',
        type: 'text',
        required: true,
        pattern: '^[A-Za-z ]+$',
        placeholder: 'entities.character.fields.speciesPlaceholder',
      },
      description: {
        name: 'description',
        type: 'textarea',
        required: true,
        placeholder: 'entities.character.fields.descriptionPlaceholder',
        min: 10,
        max: 500,
        helperText: 'entities.character.fields.descriptionHelperText',
      },
      in_active: {
        name: 'in_active',
        type: 'checkbox',
        required: true,
        helperText: 'entities.character.fields.inActiveHelperText',
      },
      birthDate: {
        name: 'birthDate',
        type: 'date',
        required: true,
        min: '1900-01-01',
        max: '2023-12-31',
        placeholder: 'entities.character.fields.birthDatePlaceholder',
        helperText: 'entities.character.fields.birthDateHelperText',
      },
    },
  },
} as const;

export type EntityType = 'character';
export type EntityMap = {
  character: Character;
};

// Helper function to get columns dynamically
export function useEntityColumns<T extends 'character'>(entity: T) {
  // Map directly to the column hooks using static imports
  const columnsMap = {
    character: useCharacterColumns,
  } as const;

  // Get the columns function from the map
  const useColumns = columnsMap[entity];

  // Execute the hook to get the columns
  const columns = useColumns();

  // Handle error case
  if (!columns) {
    console.error(`Could not find columns for entity: ${entity}`);
    return [];
  }

  return columns;
}
