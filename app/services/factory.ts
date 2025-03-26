import { BaseService, EntityType } from "./base";
import { CharacterService } from "./character";

export class ServiceFactory {
  static getService(entity: EntityType): BaseService<any> {
    switch (entity) {
      case "character":
        return new CharacterService();
      // Adicione outros casos conforme necessário
      default:
        throw new Error(`Unsupported entity type: ${entity}`);
    }
  }
}
