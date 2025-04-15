/**
 * Authentication related configurations
 */

export const AUTH_CONFIG = {
  /**
   * Token name used in cookies, localStorage and sessionStorage
   */
  TOKEN_KEY: "strapi_token",

  /**
   * Token expiration time (in seconds)
   */
  EXPIRATION: {
    /** 1 day */
    DEFAULT: 24 * 60 * 60,
    /** 30 days */
    REMEMBER_ME: 30 * 24 * 60 * 60,
  },
};
