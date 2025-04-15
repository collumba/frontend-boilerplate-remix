export interface ApiResponse<T> {
  results: T[];
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
}

export interface FetchParams {
  pageIndex: number;
  pageSize: number;
  sortField?: string;
  sortDirection?: "asc" | "desc";
}
