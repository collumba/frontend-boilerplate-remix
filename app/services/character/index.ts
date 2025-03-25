import { apiClient } from "@app/utils/axios-api/apiClient";

export async function fetchCharacters() {
  const { data } = await apiClient.get("/character");
  return data;
}

export async function createPost(newPost: { title: string; body: string }) {
  const { data } = await apiClient.post("/posts", newPost);
  return data;
}
