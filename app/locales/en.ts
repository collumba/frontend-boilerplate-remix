export default {
  title: "remix-i18next (en)",
  description: "A Remix + Vite + remix-i18next example",
  app: {
    message: {
      title: "Th",
      error: {
        404: {
          title: "Page not found",
          message: "The page you are looking for does not exist.",
        },
        500: {
          title: "Internal server error",
          message: "An error occurred while processing your request.",
        },
        503: {
          title: "Service unavailable",
          message:
            "The service is currently unavailable. Please try again later.",
        },
        401: {
          title: "Unauthorized",
          message: "You are not authorized to access this resource.",
        },
        unknown: {
          title: "Unknown error",
          message: "An unknown error occurred. Please try again later.",
        },
      },
    },
  },
  theme: {
    toggle: "Toggle theme",
    light: "Light",
    dark: "Dark",
  },
  locale: {
    toggle: "Toggle locale",
    languages: {
      en: "English",
      es: "Spanish",
      "pt-BR": "Portuguese (Brazil)",
    },
  },
  common: {
    action: {
      goToHome: "Go to home",
    },
  },
};
