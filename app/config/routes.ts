export const ROUTES = {
  home: "/",
  auth: {
    login: "/login",
    register: "/register",
    forgotPassword: "/forgot-password",
    resetPassword: "/reset-password",
  },
  app: {
    root: "/app",
    dashboard: "/app/dashboard",
    characters: {
      root: "/app/characters",
      create: "/app/characters/create",
      detail: (id: string) => `/app/characters/${id}`,
      edit: (id: string) => `/app/characters/${id}/edit`,
    },
    userProfile: (userId: string) => `/app/users/${userId}`,
  },
  api: {
    root: "/api",
    global: {
      locales: "/api/global/locales",
      setTheme: "/api/global/set-theme",
      healthCheck: "/api/global/health-check",
    },
  },
};
