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
    mdm: {
      root: "/app/mdm",
      create: (entity: string) => `/app/mdm/${entity}/create`,
      edit: (entity: string, id: string) => `/app/mdm/${entity}/${id}/edit`,
    },
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
