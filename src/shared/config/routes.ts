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
      list: (entity: string) => `/app/mdm/${entity}/list`,
      create: (entity: string) => `/app/mdm/${entity}/create`,
      edit: (entity: string, id: string) => `/app/mdm/${entity}/${id}/edit`,
      details: (entity: string, id: string) => `/app/mdm/${entity}/${id}`,
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
