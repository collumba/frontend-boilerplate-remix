import { Character } from "@app/types/mdm/character";
import { Location } from "@app/types/mdm/location";
import { ColumnDef } from "@tanstack/react-table";
export interface BaseEntity {
  id: number;
  name: string;
  created: string;
}

export type EntityMap = {
  character: Character;
  location: Location;
};

export type EntityType = keyof EntityMap;

export interface ColumnFactory<T> {
  useColumns: () => ColumnDef<T>[];
}
