import { AUTH_CONFIG } from "@app/config/auth";
import { ApiService } from "./api";

interface LoginCredentials {
  identifier: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

interface AuthResponse {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

interface MeResponse {
  id: number;
  username: string;
  email: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  avatar: string;
}

export class AuthService {
  private api: ApiService;
  private TOKEN_KEY = AUTH_CONFIG.TOKEN_KEY;

  constructor() {
    this.api = new ApiService();
  }

  // Autenticar usuário
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // Garantir que estamos enviando exatamente o que o Strapi espera
      const payload = {
        identifier: credentials.identifier,
        password: credentials.password,
      };

      const response = await this.api.post<AuthResponse>(
        "/api/auth/local",
        payload
      );
      this.setToken(response.jwt);
      return response;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  }

  // Registrar novo usuário
  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await this.api.post<AuthResponse>(
        "/api/auth/local/register",
        data
      );
      this.setToken(response.jwt);
      return response;
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  }

  // Buscar informações do usuário atual
  async me(): Promise<MeResponse> {
    try {
      const token = this.getToken();
      if (!token) {
        throw new Error("No authentication token found");
      }

      return await this.api.get<MeResponse>("/api/users/me");
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      throw error;
    }
  }

  // Fazer logout
  logout(): void {
    this.removeToken();
  }

  // Salvar token como cookie
  private setToken(token: string, rememberMe = false): void {
    const expiresIn = rememberMe
      ? AUTH_CONFIG.EXPIRATION.REMEMBER_ME
      : AUTH_CONFIG.EXPIRATION.DEFAULT;
    const expires = new Date(Date.now() + expiresIn * 1000);

    // Salvar o token como cookie
    document.cookie = `${
      this.TOKEN_KEY
    }=${token}; expires=${expires.toUTCString()}; path=/; SameSite=Lax;`;

    // Manter retrocompatibilidade
    if (rememberMe) {
      localStorage.setItem(this.TOKEN_KEY, token);
    } else {
      sessionStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  // Obter token de autenticação
  getToken(): string | null {
    // Verificar primeiro nos cookies
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split("=");
      if (name === this.TOKEN_KEY) {
        return value;
      }
    }

    // Retrocompatibilidade: verificar em localStorage/sessionStorage
    return (
      localStorage.getItem(this.TOKEN_KEY) ||
      sessionStorage.getItem(this.TOKEN_KEY)
    );
  }

  // Remover token
  private removeToken(): void {
    // Remover cookie
    document.cookie = `${this.TOKEN_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

    // Remover também do localStorage/sessionStorage
    localStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(this.TOKEN_KEY);
  }

  // Verificar se o usuário está autenticado
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export const authService = new AuthService();
