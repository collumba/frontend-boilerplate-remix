import { ApiResponse, FetchParams } from "@app/types/api";

export interface BaseService<T> {
  fetch: (params: FetchParams) => Promise<ApiResponse<T>>;
}

export type EntityType = "character" | "location" | "episode";

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
