/**
 * ESLint configuration baseada em arquitetura Feature Slice Design (FSD).
 * Regras para controle de dependências entre camadas, suporte a TypeScript, React e boas práticas.
 */

/** @type {import('eslint').Linter.Config} */
module.exports = {
  // Define que esta é a configuração raiz e não deve herdar de arquivos superiores
  root: true,

  // Define como o código será interpretado
  parserOptions: {
    ecmaVersion: "latest", // Suporta a sintaxe mais recente do JavaScript
    sourceType: "module",  // Usa módulos ES6 (import/export)
    ecmaFeatures: {
      jsx: true,           // Ativa o suporte a JSX para React
    },
  },

  // Define os ambientes globais do projeto
  env: {
    browser: true,  // Permite variáveis como window, document
    commonjs: true, // Suporta require, module.exports
    es6: true,      // Habilita recursos ES6 como let, const, arrow functions
  },

  // Define arquivos/pastas que devem ser ignorados pelo ESLint
  ignorePatterns: [
    "!**/.server",  // Explicitamente inclui arquivos server-side (Remix)
    "!**/.client",  // Explicitamente inclui arquivos client-side (Remix)
    "dist",         // Ignora pastas de build
    "build",
    "node_modules",
    "scripts",
  ],

  // Conjuntos de regras básicas ativadas
  extends: [
    "eslint:recommended",             // Regras básicas do ESLint
    "plugin:boundaries/recommended", // Regras do plugin boundaries para arquitetura modular
  ],

  // Plugins adicionais
  plugins: [
    "boundaries", // Plugin que impõe regras de separação entre camadas
  ],

  // Configuração global do plugin boundaries
  settings: {
    "boundaries/elements": [
      { type: "app",      pattern: "src/app/*" },
      { type: "routes",   pattern: "src/routes/*" },
      { type: "widgets",  pattern: "src/widgets/*" },
      { type: "features", pattern: "src/features/*" },
      { type: "entities", pattern: "src/entities/*" },
      { type: "shared",   pattern: "src/shared/*" },
    ],
    "boundaries/ignore": [
      "**/*.test.*", // Ignora testes
      "**/*.spec.*",
    ],
  },

  // Regras gerais de código
  rules: {
    "no-unused-vars": "off",                      // Desativa a regra padrão
    "unused-imports/no-unused-imports": "error",  // Erro se houver importações não usadas
    "unused-imports/no-unused-vars": "warn",      // Aviso se variáveis não forem usadas
  },

  // Regras específicas para diferentes contextos
  overrides: [
    // Para arquivos de source em src
    {
      files: ["src/**/*.{js,jsx,ts,tsx}"],
      rules: {
        "import/no-relative-parent-imports": "error", // Proíbe imports relativos para diretórios pai (../)
        "import/order": ["error", {
          "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
          "pathGroups": [
            { "pattern": "@app/**", "group": "internal", "position": "before" },
            { "pattern": "@routes/**", "group": "internal", "position": "before" },
            { "pattern": "@widgets/**", "group": "internal", "position": "before" },
            { "pattern": "@features/**", "group": "internal", "position": "before" },
            { "pattern": "@entities/**", "group": "internal", "position": "before" },
            { "pattern": "@shared/**", "group": "internal", "position": "before" }
          ],
          "newlines-between": "always",
          "alphabetize": { "order": "asc", "caseInsensitive": true }
        }],
        "boundaries/element-types": [
          "error",
          {
            default: "disallow",
            rules: [
              { from: "app",      allow: ["app", "shared", "entities", "features", "widgets"] },
              { from: "routes",   allow: ["routes", "app", "widgets", "features", "entities", "shared"] },
              { from: "widgets",  allow: ["widgets", "features", "entities", "shared"] },
              { from: "features", allow: ["features", "entities", "shared"] },
              { from: "entities", allow: ["entities", "shared"] },
              { from: "shared",   allow: ["shared"] },
            ],
          },
        ],
      },
    },

    // Para arquivos React (JS e TS)
    {
      files: ["**/*.{js,jsx,ts,tsx}"],
      plugins: ["react", "jsx-a11y", "unused-imports"],
      extends: [
        "plugin:react/recommended",        // Boas práticas do React
        "plugin:react/jsx-runtime",        // Suporte ao JSX automático (React 17+)
        "plugin:react-hooks/recommended",  // Regras para hooks
        "plugin:jsx-a11y/recommended",     // Acessibilidade
      ],
      settings: {
        react: { version: "detect" }, // Detecta automaticamente a versão do React
        formComponents: ["Form"],     // Componente de formulário para acessibilidade
        linkComponents: [             // Componentes de link utilizados no projeto
          { name: "Link", linkAttribute: "to" },
          { name: "NavLink", linkAttribute: "to" },
        ],
        "import/resolver": {
          typescript: {}, // Resolver imports usando o TypeScript
        },
      },
    },

    // Para arquivos TypeScript
    {
      files: ["**/*.{ts,tsx}"],
      plugins: ["@typescript-eslint", "import"],
      parser: "@typescript-eslint/parser",
      settings: {
        "import/internal-regex": "^~/",
        "import/resolver": {
          node: {
            extensions: [".ts", ".tsx"],
          },
          typescript: {
            alwaysTryTypes: true,
          },
          alias: {
            map: [
              ["@app", "./src/app"],
              ["@routes", "./src/routes"],
              ["@widgets", "./src/widgets"],
              ["@features", "./src/features"],
              ["@entities", "./src/entities"],
              ["@shared", "./src/shared"]
            ],
            extensions: [".ts", ".tsx", ".js", ".jsx"]
          }
        },
      },
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:import/recommended",
        "plugin:import/typescript",
      ],
      rules: {
        // Proíbe o uso de "any" explícito
        "@typescript-eslint/no-explicit-any": "error",
        
        // Limita a complexidade das funções (ciclomática)
        "complexity": ["warn", { max: 10 }],
        
        // Limita o número de linhas por função
        "max-lines-per-function": ["warn", { max: 50, skipBlankLines: true, skipComments: true }],
        
        // Limita o número de linhas por arquivo
        "max-lines": ["warn", { max: 300, skipBlankLines: true, skipComments: true }],
      }
    },

    // Para arquivos NodeJS (ex: .eslintrc.cjs)
    {
      files: [".eslintrc.cjs"],
      env: {
        node: true,
      },
    },
  ],
};
