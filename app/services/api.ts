import axios, { AxiosInstance } from "axios";

export class ApiService {
  private client: AxiosInstance;
  constructor() {
    const baseURL = import.meta.env.VITE_API_URL;
    this.client = axios.create({
      baseURL,
      timeout: 5000,
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
