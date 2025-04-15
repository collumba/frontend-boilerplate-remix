import { api, ApiError, handleApiError } from "@shared/api/api-client";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";

type QueryKeyT = readonly unknown[];

export function useApiQuery<T>(
  queryKey: QueryKeyT,
  url: string,
  options?: UseQueryOptions<T, ApiError, T, QueryKeyT>
) {
  return useQuery<T, ApiError>({
    queryKey,
    queryFn: async () => {
      try {
        return await api.get<T>(url);
      } catch (error) {
        throw handleApiError(error);
      }
    },
    ...options,
  });
}

export function useApiMutation<TData, TVariables>(
  url: string,
  method: "post" | "put" | "patch" | "delete" = "post",
  options?: UseMutationOptions<TData, ApiError, TVariables>
) {
  const queryClient = useQueryClient();

  return useMutation<TData, ApiError, TVariables>({
    mutationFn: async (variables) => {
      try {
        if (method === "delete") {
          return await api.delete<TData>(url);
        }
        return await api[method]<TData>(url, variables);
      } catch (error) {
        throw handleApiError(error);
      }
    },
    onSettled: () => {
      if (options?.onSettled) {
        options.onSettled();
      }
    },
    ...options,
  });
}

export function useInvalidateQueries() {
  const queryClient = useQueryClient();

  return {
    invalidateQueries: (queryKey: QueryKeyT) => {
      return queryClient.invalidateQueries({ queryKey });
    },
  };
}

export function usePrefetchQuery<T>(queryKey: QueryKeyT, url: string) {
  const queryClient = useQueryClient();

  return {
    prefetch: async () => {
      await queryClient.prefetchQuery({
        queryKey,
        queryFn: async () => {
          try {
            return await api.get<T>(url);
          } catch (error) {
            throw handleApiError(error);
          }
        },
      });
    },
  };
}
