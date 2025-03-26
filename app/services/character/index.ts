import { ApiService } from "@app/services/api";
import { ApiResponse, FetchParams } from "@app/types/api";

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
  }: FetchParams) {
    let url = `character/?page=${pageIndex}`;
    return this.api.get<ApiResponse<Character>>(url);
  }
}
