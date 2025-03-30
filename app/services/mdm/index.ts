import { ENTITY_CONFIG } from "@app/config/mdm";
import { ApiService } from "@app/services/api";
import { ApiResponse, FetchParams } from "@app/types/api";
import { EntityMap, EntityType } from "@app/types/mdm";
import axios from "axios";

export interface Option {
  label: string;
  value: string;
}

export interface ApiOptionsResponse {
  options: Option[];
}

export class MdmService<T extends EntityType> {
  private api: ApiService;
  private endpoint: string;

  constructor(entity: T) {
    this.api = new ApiService();
    this.endpoint = ENTITY_CONFIG[entity].endpoint;
  }

  fetch({
    pageIndex,
    pageSize,
    sortField,
    sortDirection,
  }: FetchParams): Promise<ApiResponse<EntityMap[T]>> {
    let url = `${this.endpoint}/?page=${pageIndex}`;
    return this.api.get<ApiResponse<EntityMap[T]>>(url);
  }

  // Get a single entity by ID
  getById(id: string | number): Promise<EntityMap[T]> {
    return this.api.get<EntityMap[T]>(`${this.endpoint}/${id}`);
  }

  // Create a new entity
  create(data: Partial<EntityMap[T]>): Promise<EntityMap[T]> {
    return this.api.post<EntityMap[T]>(`${this.endpoint}`, data);
  }

  // Update an existing entity
  update(
    id: string | number,
    data: Partial<EntityMap[T]>
  ): Promise<EntityMap[T]> {
    return this.api.put<EntityMap[T]>(`${this.endpoint}/${id}`, data);
  }

  // Delete an entity
  delete(id: string | number): Promise<void> {
    return this.api.delete(`${this.endpoint}/${id}`);
  }

  /**
   * Busca opções de um endpoint específico da API
   * @param endpoint - Endpoint da API para buscar as opções
   * @param params - Parâmetros da requisição (opcional)
   * @returns Um array de objetos com label e value
   */
  async getOptions(
    endpoint: string,
    params?: Record<string, any>
  ): Promise<Option[]> {
    try {
      const response = await axios.get<ApiOptionsResponse>(
        `${endpoint}/options`,
        {
          params,
        }
      );

      return response.data.options || [];
    } catch (error) {
      console.error("Error fetching options from API:", error);
      return [];
    }
  }
}
