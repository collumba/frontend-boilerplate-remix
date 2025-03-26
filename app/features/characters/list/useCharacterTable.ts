import { Character, CharacterService } from "@app/services/character";
import { ApiResponse, FetchParams } from "@app/types/api";
import { useSearchParams } from "@remix-run/react";
import { useQuery } from "@tanstack/react-query";
import {
  PaginationState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import { AxiosError } from "axios";
import { useEffect, useMemo, useState } from "react";

function useCharacterTable() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Inicializar estados com valores da URL ou padrões
  // A tabela usa pageIndex 0-based, mas a API usa 1-based
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: Math.max(0, parseInt(searchParams.get("page") || "1", 10) - 1),
    pageSize: parseInt(searchParams.get("size") || "20", 10), // A API Rick and Morty retorna 20 itens por página
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
    // Na URL, mostramos pageIndex + 1 (1-based para o usuário)
    params.set("page", (pageIndex + 1).toString());
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
    queryKey: ["characters", pageIndex + 1], // Apenas a página é relevante para a API
    queryFn: () => {
      const params: FetchParams = {
        // Para a API, enviamos pageIndex + 1 (a API é 1-based)
        pageIndex: pageIndex + 1,
        pageSize, // Isso é ignorado pela API Rick and Morty
      };

      return characterService.fetchCharacters(params);
    },
    initialData: {
      results: [],
      info: { count: 0, pages: 0, next: null, prev: null },
    },
  });

  // Ordenar os resultados no frontend quando a ordenação mudar
  const sortedResults = useMemo(() => {
    if (!data?.results.length) return [];

    const [sort] = sorting;
    if (!sort) return data.results;

    return [...data.results].sort((a: any, b: any) => {
      const aValue = a[sort.id];
      const bValue = b[sort.id];

      if (aValue < bValue) return sort.desc ? 1 : -1;
      if (aValue > bValue) return sort.desc ? -1 : 1;
      return 0;
    });
  }, [data?.results, sorting]);

  return {
    data: {
      ...data,
      results: sortedResults,
    },
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
