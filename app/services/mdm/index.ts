import { ENTITY_CONFIG } from "@app/config/mdm";
import { ApiService } from "@app/services/api";
import { ApiResponse, FetchParams } from "@app/types/api";
import { EntityMap, EntityType } from "@app/types/mdm";

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
}
