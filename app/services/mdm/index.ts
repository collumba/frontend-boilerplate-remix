import { ENTITY_CONFIG } from "@app/config/mdm";
import { ApiService } from "@app/services/api";
import { ApiResponse, FetchParams } from "@app/types/api";
import { EntityMap, EntityType } from "@app/types/mdm";

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
      // Constrói a URL com parâmetros, se houver
      let url = `${endpoint}`;
      if (params) {
        const queryParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          queryParams.append(key, String(value));
        });
        url += `?${queryParams.toString()}`;
      }

      // Usa o mesmo padrão dos outros métodos, utilizando a ApiService
      const data = await this.api.get<ApiOptionsResponse>(url);

      return data.options || [];
    } catch (error) {
      console.error("Error fetching options from API:", error);
      return [];
    }
  }
}
