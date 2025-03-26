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

export interface CharacterFetchParams {
  pageIndex: number;
  pageSize: number;
  sortField?: string;
  sortDirection?: "asc" | "desc";
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
  }: CharacterFetchParams) {
    // A API Rick and Morty não suporta ordenação, apenas paginação
    let url = `character/?page=${pageIndex}`;

    // Nota: o parâmetro 'limit' também não é suportado pela API
    // A API Rick and Morty retorna um número fixo de personagens por página

    return this.api.get<ApiResponse<Character>>(url);
  }
}
