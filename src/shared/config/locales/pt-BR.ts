export default {
  app: {
    applicationName: 'Acme Inc.',
    message: {
      error: {
        404: {
          title: 'Página não encontrada',
          message: 'A página que você está procurando não existe.',
        },
        500: {
          title: 'Erro interno do servidor',
          message: 'Ocorreu um erro ao processar sua solicitação.',
        },
        503: {
          title: 'Serviço não disponível',
          message:
            'O serviço está temporariamente indisponível. Por favor, tente novamente mais tarde.',
        },
        401: {
          title: 'Não autorizado',
          message: 'Você não tem permissão para acessar este recurso.',
        },
        unknown: {
          title: 'Erro desconhecido',
          message: 'Ocorreu um erro desconhecido. Por favor, tente novamente mais tarde.',
        },
      },
    },
  },
  auth: {
    login: {
      title: 'Faça login em sua conta',
      description: 'Digite seu email abaixo para fazer login em sua conta',
      email: 'Email',
      password: 'Senha',
      forgotPassword: 'Esqueceu sua senha?',
      button: 'Login',
      orContinueWith: 'Ou continue com',
      dontHaveAccount: 'Não tem uma conta?',
      signUp: 'Cadastre-se',
      loginWithGitHub: 'Login com GitHub',
      error: {
        authenticationFailed: 'Falha na autenticação. Por favor, verifique suas credenciais.',
      },
    },
    register: {
      title: 'Crie uma conta',
      description: 'Preencha os dados abaixo para criar sua conta',
      username: 'Nome de usuário',
      email: 'Email',
      password: 'Senha',
      confirmPassword: 'Confirmar senha',
      register: 'Cadastrar',
      loading: 'Processando...',
      alreadyHaveAccount: 'Já tem uma conta?',
      login: 'Login',
      error: {
        passwordMismatch: 'As senhas não coincidem',
        passwordTooShort: 'A senha deve ter pelo menos 6 caracteres',
        registrationFailed: 'Falha no cadastro. Por favor, tente novamente.',
      },
    },
    error: {
      checkAuth: 'Erro ao verificar autenticação',
      checkAuthDescription: 'Não foi possível verificar a autenticação',
      login: 'Erro ao fazer login',
      loginDescription: 'Não foi possível fazer login',
      logout: 'Erro ao fazer logout',
      logoutDescription: 'Não foi possível fazer logout',
      register: 'Erro ao cadastrar',
      registerDescription: 'Não foi possível cadastrar',
    },
  },
  theme: {
    toggle: 'Alternar tema',
    light: 'Claro',
    dark: 'Escuro',
  },
  locale: {
    toggle: 'Alternar idioma',
    languages: {
      en: 'Inglês',
      es: 'Espanhol',
      'pt-BR': 'Português (Brasil)',
      pt: 'Português',
    },
    changed: 'Idioma alterado para {{language}}',
  },
  common: {
    action: {
      goToHome: 'Ir para a home',
      create: 'Criar',
      edit: 'Editar',
      delete: 'Deletar',
      cancel: 'Cancelar',
      save: 'Salvar',
      close: 'Fechar',
      apply: 'Aplicar',
      reset: 'Resetar',
      filter: 'Filtrar',
      clear: 'Limpar',
      search: 'Pesquisar',
      refresh: 'Atualizar',
      export: 'Exportar',
      import: 'Importar',
      print: 'Imprimir',
      copy: 'Copiar',
      paste: 'Colar',
      undo: 'Desfazer',
      redo: 'Refazer',
      zoomIn: 'Zoom in',
      zoomOut: 'Zoom out',
      zoomReset: 'Zoom reset',
      zoomFit: 'Zoom fit',
      back: 'Voltar',
      list: 'Lista',
      pickDate: 'Selecionar data',
      enterText: 'Digitar texto',
      select: 'Selecionar',
      selectOptions: 'Selecionar opções...',
      searchOptions: 'Pesquisar opções...',
      noResults: 'Nenhum resultado encontrado.',
      logout: 'Sair',
    },
    form: {
      requiredFieldsNote: 'Os campos marcados com',
      areRequired: 'são obrigatórios',
    },
  },
  component: {
    sidebar: {
      registers: {
        title: 'Registros',
      },
    },
    toast: {
      success: {
        title: 'Sucesso!',
        description: 'Operação completada com sucesso em {{app}}.',
      },
      error: {
        title: 'Erro!',
        description: 'Ocorreu um erro ao processar sua solicitação.',
      },
      warning: {
        title: 'Aviso!',
        description: 'Por favor, note os detalhes antes de prosseguir.',
      },
      info: {
        title: 'Informação!',
        description: 'Aqui está alguma informação importante.',
      },
      default: {
        title: 'Notificação',
        description: 'Uma nova notificação.',
      },
      language: {
        changed: 'Idioma alterado para {{language}}',
      },
    },
    dataTable: {
      inputSearch: {
        placeholder: 'Filtrar...',
      },
      showColumnsText: 'Colunas',
      noResultsText: 'Nenhum resultado encontrado.',
      pagination: {
        previous: 'Anterior',
        next: 'Próximo',
      },
      selectedRows: {
        of: '{{count}} de {{total}} linhas selecionadas.',
      },
      error: {
        title: 'Erro',
        description: 'Erro ao buscar personagens',
        button: 'Tentar novamente',
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
