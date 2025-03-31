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
      error: {
        authenticationFailed:
          "Authentication failed. Please check your credentials.",
      },
    },
    register: {
      title: "Create an account",
      description: "Fill in the data below to create your account",
      username: "Username",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm password",
      register: "Register",
      loading: "Processing...",
      alreadyHaveAccount: "Already have an account?",
      login: "Login",
      error: {
        passwordMismatch: "The passwords do not match",
        passwordTooShort: "The password must be at least 6 characters long",
        registrationFailed: "Registration failed. Please try again.",
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
      selectOptions: "Select options...",
      searchOptions: "Search options...",
      noResults: "No results found.",
      logout: "Logout",
    },
    form: {
      requiredFieldsNote: "The fields marked with",
      areRequired: "are required",
    },
  },
  component: {
    sidebar: {
      registers: {
        title: "Registers",
      },
    },
    toast: {
      success: {
        title: "Success!",
        description: "Operation completed successfully in {{app}}.",
      },
      error: {
        title: "Error!",
        description: "There was an error processing your request.",
      },
      warning: {
        title: "Warning!",
        description: "Please note the details before proceeding.",
      },
      info: {
        title: "Information",
        description: "Here's some important information.",
      },
      default: {
        title: "Notification",
        description: "A new notification.",
      },
      task: {
        created: {
          title: "Task Created",
          description: "{{count}} new task added successfully.",
        },
        deleted: {
          title: "Task Removed",
          description: "The task was successfully deleted.",
        },
        error: {
          title: "Task Error",
          description: "Unable to perform operation on task.",
        },
      },
    },
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
        namePlaceholder: "Enter character name",
        status: "Status",
        statusPlaceholder: "Select character status",
        species: "Species",
        speciesPlaceholder: "Enter species (letters only)",
        gender: "Gender",
        genderHelperText: "Select the character's gender identity",
        phoneNumber: "Phone Number",
        phoneNumberPlaceholder: "Enter phone number",
        phoneNumberHelperText: "Format: +XX (XX) XXXXX-XXXX",
        age: "Age",
        agePlaceholder: "Enter age",
        traits: "Character Traits",
        traitsPlaceholder: "Select character traits",
        in_active: "In Active",
        inActiveHelperText: "Check if this character is currently active",
        birthDate: "Birth Date",
        birthDatePlaceholder: "Select birth date",
        birthDateHelperText: "Must be between 1900 and 2023",
        description: "Description",
        descriptionPlaceholder: "Enter character description",
        descriptionHelperText: "Minimum 10 characters, maximum 500",
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
      traits: {
        intelligent: "Intelligent",
        brave: "Brave",
        loyal: "Loyal",
        curious: "Curious",
        aggressive: "Aggressive",
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
