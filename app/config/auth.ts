/**
 * Configurações relacionadas à autenticação
 */

export const AUTH_CONFIG = {
  /**
   * Nome do token usado em cookies, localStorage e sessionStorage
   */
  TOKEN_KEY: "strapi_token",

  /**
   * Tempo de expiração do token (em segundos)
   */
  EXPIRATION: {
    /** 1 dia */
    DEFAULT: 24 * 60 * 60,
    /** 30 dias */
    REMEMBER_ME: 30 * 24 * 60 * 60,
  },
};
