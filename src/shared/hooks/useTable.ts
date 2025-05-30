import { useSearchParams } from '@remix-run/react';
import { ApiResponse, FetchParams } from '@shared/types/api';
import { useQuery } from '@tanstack/react-query';
import { PaginationState, SortingState, VisibilityState } from '@tanstack/react-table';
import { AxiosError } from 'axios';
import { useEffect, useMemo, useState } from 'react';

interface UseTableProps<T> {
  queryKey: string;
  fetchData: (params: FetchParams) => Promise<ApiResponse<T>>;
  initialPageSize?: number;
  defaultSort?: { id: string; desc: boolean };
}

function useInitialPagination(
  searchParams: URLSearchParams,
  initialPageSize: number
): PaginationState {
  return {
    pageIndex: Math.max(0, parseInt(searchParams.get('page') || '1', 10) - 1),
    pageSize: parseInt(searchParams.get('size') || initialPageSize.toString(), 10),
  };
}

function useInitialSorting(
  searchParams: URLSearchParams,
  defaultSort: { id: string; desc: boolean }
): SortingState {
  const sortField = searchParams.get('sort');
  const sortDir = searchParams.get('dir');

  if (sortField) {
    return [{ id: sortField, desc: sortDir === 'desc' }];
  }

  return [defaultSort];
}

function getSortedResults<T>(results: T[], sorting: SortingState): T[] {
  if (!results.length) return [];

  const [sort] = sorting;
  if (!sort) return results;

  return [...results].sort((a: T, b: T) => {
    const aValue = a[sort.id as keyof T];
    const bValue = b[sort.id as keyof T];

    if (aValue < bValue) return sort.desc ? 1 : -1;
    if (aValue > bValue) return sort.desc ? -1 : 1;
    return 0;
  });
}

function useTable<T>({
  queryKey,
  fetchData,
  initialPageSize = 20,
  defaultSort = { id: 'name', desc: false },
}: UseTableProps<T>) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>(
    useInitialPagination(searchParams, initialPageSize)
  );

  const [sorting, setSorting] = useState<SortingState>(
    useInitialSorting(searchParams, defaultSort)
  );

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set('page', (pageIndex + 1).toString());
    params.set('size', pageSize.toString());

    if (sorting.length > 0) {
      params.set('sort', sorting[0].id);
      params.set('dir', sorting[0].desc ? 'desc' : 'asc');
    }

    setSearchParams(params, { replace: true });
  }, [pageIndex, pageSize, sorting, searchParams, setSearchParams]);

  const { data, isLoading, isFetching, error, refetch } = useQuery<ApiResponse<T>, AxiosError>({
    queryKey: [queryKey, pageIndex + 1],
    queryFn: () => {
      const params: FetchParams = {
        pageIndex: pageIndex + 1,
        pageSize,
      };

      return fetchData(params);
    },
    initialData: {
      results: [],
      info: { count: 0, pages: 0, next: null, prev: null },
    },
  });

  const sortedResults = useMemo(
    () => getSortedResults(data?.results || [], sorting),
    [data?.results, sorting]
  );

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

export { useTable };
