export const ROUTES = {
  home: "/",
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  app: {
    root: "/app",
    dashboard: "/app/dashboard",
    profile: "/app/profile",
    settings: "/app/settings",
    users: "/app/users",
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
