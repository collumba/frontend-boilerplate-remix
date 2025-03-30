export default {
  app: {
    applicationName: "Acme Inc.",
    message: {
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
  auth: {
    login: {
      title: "Login to your account",
      description: "Enter your email below to login to your account",
      email: "Email",
      password: "Password",
      forgotPassword: "Forgot your password?",
      button: "Login",
      orContinueWith: "Or continue with",
      dontHaveAccount: "Don't have an account?",
      signUp: "Sign up",
      loginWithGitHub: "Login with GitHub",
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
      create: "Create",
      edit: "Edit",
      delete: "Delete",
      cancel: "Cancel",
      save: "Save",
      close: "Close",
      apply: "Apply",
      reset: "Reset",
      filter: "Filter",
      clear: "Clear",
      search: "Search",
      refresh: "Refresh",
      export: "Export",
      import: "Import",
      print: "Print",
      copy: "Copy",
      paste: "Paste",
      undo: "Undo",
      redo: "Redo",
      zoomIn: "Zoom in",
      zoomOut: "Zoom out",
      zoomReset: "Zoom reset",
      zoomFit: "Zoom fit",
      back: "Back",
      list: "List",
      pickDate: "Pick date",
      enterText: "Enter text",
      select: "Select",
    },
  },
  component: {
    dataTable: {
      inputSearch: {
        placeholder: "Filter...",
      },
      showColumnsText: "Columns",
      noResultsText: "No results.",
      pagination: {
        previous: "Previous",
        next: "Next",
      },
      selectedRows: {
        of: "{{count}} of {{total}} rows selected.",
      },
      error: {
        title: "Error",
        description: "Error fetching characters",
        button: "Try again",
      },
    },
  },
  entities: {
    character: {
      name: "Character",
      namePlural: "Characters",
      columns: {
        id: "ID",
        image: "Image",
        name: "Name",
        status: "Status",
        species: "Species",
        origin: "Origin",
        location: "Location",
        episode: "Episode",
        created: "Created",
        gender: "Gender",
      },
      fields: {
        name: "Name",
        status: "Status",
        species: "Species",
        gender: "Gender",
        in_active: "In Active",
        birthDate: "Birth Date",
        description: "Description",
      },
      status: {
        alive: "Alive",
        dead: "Dead",
        unknown: "Unknown",
      },
      gender: {
        male: "Male",
        female: "Female",
        genderless: "Genderless",
        unknown: "Unknown",
      },
    },
  },
  route: {
    app: {
      root: "App",
      dashboard: "Dashboard",
      mdm: {
        root: "MDM",
        create: "Create",
      },
    },
  },
};
