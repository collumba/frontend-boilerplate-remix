import { apiClient } from "@app/utils/axios-api/apiClient";
import { PaginationState } from "@tanstack/react-table";

export type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  created: string;
};

export type CharacterServiceResponse = {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };
  results: Character[];
};
export class CharacterService {
  async fetchCharacters({
    pageIndex,
    pageSize,
  }: PaginationState): Promise<CharacterServiceResponse> {
    const { data } = await apiClient.get("/character", {
      params: {
        page: pageIndex,
        count: pageSize,
      },
    });
    return data;
  }
}
