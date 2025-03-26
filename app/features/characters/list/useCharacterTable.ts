import { useTable } from "@app/hooks/useTable";
import { Character, CharacterService } from "@app/services/character";

function useCharacterTable() {
  const characterService = new CharacterService();

  return useTable<Character>({
    queryKey: "characters",
    fetchData: (params) => characterService.fetchCharacters(params),
    initialPageSize: 20,
    defaultSort: { id: "name", desc: false },
  });
}

export { useCharacterTable };
