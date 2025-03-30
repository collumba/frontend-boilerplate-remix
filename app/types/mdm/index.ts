import { Character } from "@app/types/mdm/character";
import { Location } from "@app/types/mdm/location";
import { ColumnDef } from "@tanstack/react-table";
export interface BaseEntity {
  id: number;
  name: string;
  created: string;
}

export interface CommonEntity {
  // Interface vazia para representar entidades comuns de opções
}

export type EntityMap = {
  character: Character;
  location: Location;
  common: CommonEntity; // Adiciona common como um tipo de entidade
};

export type EntityType = keyof EntityMap;

export interface ColumnFactory<T> {
  useColumns: () => ColumnDef<T>[];
}
