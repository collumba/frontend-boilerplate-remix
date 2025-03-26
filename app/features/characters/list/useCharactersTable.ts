import { Character, CharacterService } from "@app/services/character";
import { ApiResponse } from "@app/types/api";
import { useQuery } from "@tanstack/react-query";
import {
  PaginationState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import { AxiosError } from "axios";
import { useState } from "react";

function useCharacterTable() {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 1,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([
    { id: "name", desc: false },
  ]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const characterService = new CharacterService();

  const { data, isLoading, isFetching, error, refetch } = useQuery<
    ApiResponse<Character>,
    AxiosError
  >({
    queryKey: ["characters", pageIndex, pageSize],
    queryFn: () => characterService.fetchCharacters({ pageIndex, pageSize }),
    initialData: {
      results: [],
      info: { count: 0, pages: 0, next: null, prev: null },
    },
  });

  return {
    data,
    isLoading,
    isFetching,
    error,
    refetch,
    pagination: { pageIndex, pageSize },
    setPagination,
    sorting,
    setSorting,
    columnVisibility,
    setColumnVisibility,
    rowSelection,
    setRowSelection,
  };
}

export { useCharacterTable };
