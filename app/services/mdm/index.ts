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
}
