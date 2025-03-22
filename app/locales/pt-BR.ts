export default {
  app: {
    message: {
      title: "Oi",
      error: {
        404: {
          title: "Página não encontrada",
          message: "A página que você está procurando não existe.",
        },
        500: {
          title: "Erro interno do servidor",
          message: "Ocorreu um erro ao processar sua solicitação.",
        },
        503: {
          title: "Serviço não disponível",
          message:
            "O serviço está temporariamente indisponível. Por favor, tente novamente mais tarde.",
        },
        401: {
          title: "Não autorizado",
          message: "Você não tem permissão para acessar este recurso.",
        },
        unknown: {
          title: "Erro desconhecido",
          message:
            "Ocorreu um erro desconhecido. Por favor, tente novamente mais tarde.",
        },
      },
    },
  },
  locale: {
    en: "Inglês",
    es: "Espanhol",
    "pt-BR": "Português (Brasil)",
  },
  common: {
    action: {
      goToHome: "Ir para a home",
    },
  },
};
