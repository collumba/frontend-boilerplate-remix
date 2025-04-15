import { Character } from "@/shared/types/mdm/character";
import { ColumnDef } from "@tanstack/react-table";
export interface BaseEntity {
  id: number;
  name: string;
  created: string;
}

export interface CommonEntity {
  // Empty interface to represent common option entities
}

export type EntityMap = {
  character: Character;
};

export type EntityType = keyof EntityMap;

export interface ColumnFactory<T> {
  useColumns: () => ColumnDef<T>[];
}
