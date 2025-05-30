export default {
  app: {
    applicationName: 'Acme Inc.',
    message: {
      error: {
        404: {
          title: 'Page not found',
          message: 'The page you are looking for does not exist.',
        },
        500: {
          title: 'Internal server error',
          message: 'An error occurred while processing your request.',
        },
        503: {
          title: 'Service unavailable',
          message: 'The service is currently unavailable. Please try again later.',
        },
        401: {
          title: 'Unauthorized',
          message: 'You are not authorized to access this resource.',
        },
        unknown: {
          title: 'Unknown error',
          message: 'An unknown error occurred. Please try again later.',
        },
      },
    },
  },
  auth: {
    login: {
      title: 'Login to your account',
      description: 'Enter your email below to login to your account',
      email: 'Email',
      password: 'Password',
      forgotPassword: 'Forgot your password?',
      button: 'Login',
      orContinueWith: 'Or continue with',
      dontHaveAccount: "Don't have an account?",
      signUp: 'Sign up',
      loginWithGitHub: 'Login with GitHub',
      error: {
        authenticationFailed: 'Authentication failed. Please check your credentials.',
      },
    },
    register: {
      title: 'Create an account',
      description: 'Fill in the data below to create your account',
      username: 'Username',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm password',
      register: 'Register',
      loading: 'Processing...',
      alreadyHaveAccount: 'Already have an account?',
      login: 'Login',
      error: {
        passwordMismatch: 'The passwords do not match',
        passwordTooShort: 'The password must be at least 6 characters long',
        registrationFailed: 'Registration failed. Please try again.',
      },
    },
    error: {
      checkAuth: 'Error checking authentication',
      checkAuthDescription: 'Unable to check authentication',
      login: 'Error logging in',
      loginDescription: 'Unable to log in',
      logout: 'Error logging out',
      logoutDescription: 'Unable to log out',
      register: 'Error registering',
      registerDescription: 'Unable to register',
    },
  },
  theme: {
    toggle: 'Toggle theme',
    light: 'Light',
    dark: 'Dark',
  },
  locale: {
    toggle: 'Toggle language',
    languages: {
      en: 'English',
      es: 'Spanish',
      'pt-BR': 'Portuguese (Brazil)',
      pt: 'Portuguese',
    },
    changed: 'Language changed to {{language}}',
  },
  common: {
    action: {
      goToHome: 'Go to home',
      create: 'Create',
      edit: 'Edit',
      delete: 'Delete',
      cancel: 'Cancel',
      save: 'Save',
      close: 'Close',
      apply: 'Apply',
      reset: 'Reset',
      filter: 'Filter',
      clear: 'Clear',
      search: 'Search',
      refresh: 'Refresh',
      export: 'Export',
      import: 'Import',
      print: 'Print',
      copy: 'Copy',
      paste: 'Paste',
      undo: 'Undo',
      redo: 'Redo',
      zoomIn: 'Zoom in',
      zoomOut: 'Zoom out',
      zoomReset: 'Zoom reset',
      zoomFit: 'Zoom fit',
      back: 'Back',
      list: 'List',
      pickDate: 'Pick date',
      enterText: 'Enter text',
      select: 'Select',
      selectOptions: 'Select options...',
      searchOptions: 'Search options...',
      noResults: 'No results found.',
      logout: 'Logout',
    },
    form: {
      requiredFieldsNote: 'The fields marked with',
      areRequired: 'are required',
    },
  },
  component: {
    sidebar: {
      registers: {
        title: 'Registers',
      },
    },
    toast: {
      success: {
        title: 'Success!',
        description: 'Operation completed successfully in {{app}}.',
      },
      error: {
        title: 'Error!',
        description: 'There was an error processing your request.',
      },
      warning: {
        title: 'Warning!',
        description: 'Please note the details before proceeding.',
      },
      info: {
        title: 'Information',
        description: "Here's some important information.",
      },
      default: {
        title: 'Notification',
        description: 'A new notification.',
      },
      language: {
        changed: 'Language changed to {{language}}',
      },
    },
    dataTable: {
      inputSearch: {
        placeholder: 'Filter...',
      },
      showColumnsText: 'Columns',
      noResultsText: 'No results.',
      pagination: {
        previous: 'Previous',
        next: 'Next',
      },
      selectedRows: {
        of: '{{count}} of {{total}} rows selected.',
      },
      error: {
        title: 'Error',
        description: 'Error fetching characters',
        button: 'Try again',
      },
    },
  },
  entities: {},
  route: {
    app: {
      root: 'App',
      dashboard: 'Dashboard',
    },
  },
};
