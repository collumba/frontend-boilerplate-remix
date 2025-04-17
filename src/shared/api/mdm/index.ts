import { ENTITY_CONFIG } from '@/shared/config/mdm';
import { ApiResponse, FetchParams } from '@/shared/types/api';
import { EntityMap, EntityType } from '@/shared/types/mdm';
import { ApiService } from '../api';

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

  fetch({ pageIndex }: FetchParams): Promise<ApiResponse<EntityMap[T]>> {
    const url = `${this.endpoint}/?page=${pageIndex}`;
    return this.api.get<ApiResponse<EntityMap[T]>>(url);
  }

  // Get a single entity by ID
  getById(id: string | number): Promise<EntityMap[T]> {
    return this.api.get<EntityMap[T]>(`${this.endpoint}/${id}`);
  }

  // Create a new entity
  create(data: Partial<EntityMap[T]>): Promise<EntityMap[T]> {
    return this.api.post<EntityMap[T], Partial<EntityMap[T]>>(`${this.endpoint}`, data);
  }

  // Update an existing entity
  update(id: string | number, data: Partial<EntityMap[T]>): Promise<EntityMap[T]> {
    return this.api.put<EntityMap[T], Partial<EntityMap[T]>>(`${this.endpoint}/${id}`, data);
  }

  // Delete an entity
  delete(id: string | number): Promise<void> {
    return this.api.delete(`${this.endpoint}/${id}`);
  }

  /**
   * Search options from a specific API endpoint
   * @param endpoint - API endpoint to search options
   * @param params - Request parameters (optional)
   * @returns An array of objects with label and value
   */
  async getOptions(endpoint: string, params?: Record<string, string>): Promise<Option[]> {
    try {
      // Build the URL with parameters, if any
      let url = `${endpoint}`;
      if (params) {
        const queryParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          queryParams.append(key, String(value));
        });
        url += `?${queryParams.toString()}`;
      }

      // Use the same pattern as other methods, using the ApiService
      const data = await this.api.get<ApiOptionsResponse>(url);

      return data.options || [];
    } catch (error) {
      return [];
    }
  }
}
