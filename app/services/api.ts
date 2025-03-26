import axios, { AxiosInstance } from "axios";

export class ApiService {
  private client: AxiosInstance;

  constructor() {
    const baseURL = "https://rickandmortyapi.com/api";

    this.client = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  get<T>(url: string) {
    return this.client.get<T>(url).then((response) => response.data);
  }

  post<T>(url: string, data: any) {
    return this.client.post<T>(url, data).then((response) => response.data);
  }

  put<T>(url: string, data: any) {
    return this.client.put<T>(url, data).then((response) => response.data);
  }

  delete<T>(url: string) {
    return this.client.delete<T>(url).then((response) => response.data);
  }
}
