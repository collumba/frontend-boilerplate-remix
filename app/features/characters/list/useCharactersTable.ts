import { Character, CharacterService } from "@app/services/character";
import { ApiResponse } from "@app/types/api";
import { useSearchParams } from "@remix-run/react";
import { useQuery } from "@tanstack/react-query";
import {
  PaginationState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

function useCharacterTable() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Inicializar estados com valores da URL ou padrões
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: parseInt(searchParams.get("page") || "1", 10),
    pageSize: parseInt(searchParams.get("size") || "10", 10),
  });

  const [sorting, setSorting] = useState<SortingState>(() => {
    const sortField = searchParams.get("sort");
    const sortDir = searchParams.get("dir");

    if (sortField) {
      return [{ id: sortField, desc: sortDir === "desc" }];
    }

    return [{ id: "name", desc: false }];
  });

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const characterService = new CharacterService();

  // Sincronizar estado com a URL quando mudar
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageIndex.toString());
    params.set("size", pageSize.toString());

    if (sorting.length > 0) {
      params.set("sort", sorting[0].id);
      params.set("dir", sorting[0].desc ? "desc" : "asc");
    }

    setSearchParams(params, { replace: true });
  }, [pageIndex, pageSize, sorting, setSearchParams]);

  const { data, isLoading, isFetching, error, refetch } = useQuery<
    ApiResponse<Character>,
    AxiosError
  >({
    queryKey: ["characters", pageIndex, pageSize, sorting],
    queryFn: () =>
      characterService.fetchCharacters({
        pageIndex,
        pageSize,
        sortField: sorting.length > 0 ? sorting[0].id : undefined,
        sortDirection:
          sorting.length > 0 ? (sorting[0].desc ? "desc" : "asc") : undefined,
      }),
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
