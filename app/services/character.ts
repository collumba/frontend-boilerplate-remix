import { ApiService } from "@app/services/api";
import { ApiResponse } from "@app/types/api";

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: { name: string; url: string };
  location: { name: string; url: string };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export class CharacterService {
  private api: ApiService;

  constructor() {
    this.api = new ApiService();
  }

  fetchCharacters({
    pageIndex,
    pageSize,
    sortField,
    sortDirection,
  }: {
    pageIndex: number;
    pageSize: number;
    sortField?: string;
    sortDirection?: "asc" | "desc";
  }) {
    let url = `character/?page=${pageIndex}&limit=${pageSize}`;
    if (sortField && sortDirection) {
      url += `&sort=${sortField}&order=${sortDirection}`;
    }
    return this.api.get<ApiResponse<Character>>(url);
  }
}
