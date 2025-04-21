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
          title: 'Serviço indisponível',
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
      title: 'Faça login na sua conta',
      description: 'Digite seu email abaixo para fazer login na sua conta',
      email: 'Email',
      password: 'Senha',
      forgotPassword: 'Esqueceu sua senha?',
      button: 'Login',
      orContinueWith: 'Ou continue com',
      dontHaveAccount: 'Não tem uma conta?',
      signUp: 'Crie uma conta',
      loginWithGitHub: 'Login com GitHub',
      error: {
        authenticationFailed: 'Autenticação falhou. Por favor, verifique suas credenciais.',
      },
    },
    register: {
      title: 'Crie uma conta',
      description: 'Preencha os dados abaixo para criar sua conta',
      username: 'Nome de usuário',
      email: 'Email',
      password: 'Senha',
      confirmPassword: 'Confirmar senha',
      register: 'Criar conta',
      loading: 'Processando...',
      alreadyHaveAccount: 'Já tem uma conta?',
      login: 'Login',
      error: {
        passwordMismatch: 'As senhas não coincidem',
        passwordTooShort: 'A senha deve ter pelo menos 6 caracteres',
        registrationFailed: 'Falha ao criar conta. Por favor, tente novamente.',
      },
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
      changed: 'Idioma alterado para {{language}}',
    },
  },
  common: {
    action: {
      goToHome: 'Ir para a home',
      create: 'Criar',
      edit: 'Editar',
      delete: 'Excluir',
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
      enterText: 'Digite o texto',
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
        description: 'Operação concluída com sucesso em {{app}}.',
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
        title: 'Informação',
        description: 'Aqui está alguma informação importante.',
      },
      default: {
        title: 'Notificação',
        description: 'Uma nova notificação.',
      },
      task: {
        created: {
          title: 'Tarefa criada',
          description: '{{count}} nova tarefa adicionada com sucesso.',
        },
        deleted: {
          title: 'Tarefa removida',
          description: 'A tarefa foi removida com sucesso.',
        },
        error: {
          title: 'Erro na tarefa',
          description: 'Não foi possível realizar a operação na tarefa.',
        },
      },
    },
    dataTable: {
      inputSearch: {
        placeholder: 'Filtrar...',
      },
      showColumnsText: 'Colunas',
      noResultsText: 'Nenhum resultado.',
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
  entities: {
    character: {
      name: 'Personagem',
      namePlural: 'Personagens',
      columns: {
        id: 'ID',
        image: 'Imagem',
        name: 'Nome',
        status: 'Status',
        species: 'Espécie',
        origin: 'Origem',
        location: 'Localização',
        episode: 'Episódio',
        created: 'Criado',
        gender: 'Gênero',
      },
      fields: {
        name: 'Nome',
        namePlaceholder: 'Digite o nome do personagem',
        status: 'Status',
        statusPlaceholder: 'Selecione o status do personagem',
        species: 'Espécie',
        speciesPlaceholder: 'Digite a espécie (apenas letras)',
        gender: 'Gênero',
        genderHelperText: 'Selecione o gênero do personagem',
        phoneNumber: 'Telefone',
        phoneNumberPlaceholder: 'Digite o telefone',
        phoneNumberHelperText: 'Formato: +XX (XX) XXXXX-XXXX',
        age: 'Idade',
        agePlaceholder: 'Digite a idade',
        traits: 'Características do personagem',
        traitsPlaceholder: 'Selecione as características do personagem',
        in_active: 'Inativo',
        inActiveHelperText: 'Verifique se este personagem está ativo',
        birthDate: 'Data de nascimento',
        birthDatePlaceholder: 'Selecione a data de nascimento',
        birthDateHelperText: 'Deve ser entre 1900 e 2023',
        description: 'Descrição',
        descriptionPlaceholder: 'Digite a descrição do personagem',
        descriptionHelperText: 'Mínimo 10 caracteres, máximo 500',
      },
      status: {
        alive: 'Vivo',
        dead: 'Morto',
        unknown: 'Desconhecido',
      },
      gender: {
        male: 'Masculino',
        female: 'Feminino',
        genderless: 'Sem gênero',
        unknown: 'Desconhecido',
      },
      traits: {
        intelligent: 'Inteligente',
        brave: 'Corajoso',
        loyal: 'Leal',
        curious: 'Curioso',
        aggressive: 'Aggressivo',
      },
    },
  },
  route: {
    app: {
      root: 'App',
      dashboard: 'Dashboard',
    },
  },
};
