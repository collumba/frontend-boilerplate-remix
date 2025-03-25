import { apiClient } from "@app/utils/axios-api/apiClient";
import { PaginationState } from "@tanstack/react-table";

export async function fetchCharacters({
  pageIndex,
  pageSize,
}: PaginationState) {
  const { data } = await apiClient.get("/character", {
    params: {
      page: pageIndex,
      count: pageSize,
    },
  });
  return data;
}

export async function createPost(newPost: { title: string; body: string }) {
  const { data } = await apiClient.post("/posts", newPost);
  return data;
}
