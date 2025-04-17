/**
 * ESLint Config - Nível Avançado para projetos com arquitetura Feature Slice Design (FSD)
 */

/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  ignorePatterns: ['!**/.server', '!**/.client', 'dist', 'build', 'node_modules', 'scripts'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  plugins: [
    '@typescript-eslint',
    'import',
    'react',
    'react-hooks',
    'jsx-a11y',
    'boundaries',
    'simple-import-sort',
    'unused-imports',
    'prettier',
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
    'boundaries/elements': [
      { type: 'app', pattern: 'src/app/*' },
      { type: 'routes', pattern: 'src/routes/*' },
      { type: 'widgets', pattern: 'src/widgets/*' },
      { type: 'features', pattern: 'src/features/*' },
      { type: 'entities', pattern: 'src/entities/*' },
      { type: 'shared', pattern: 'src/shared/*' },
    ],
    'boundaries/ignore': ['**/*.test.*', '**/*.spec.*'],
  },
  rules: {
    // FSD architecture protection
    'boundaries/element-types': [
      'error',
      {
        default: 'disallow',
        rules: [
          { from: 'app', allow: ['app', 'shared', 'entities', 'features', 'widgets'] },
          { from: 'routes', allow: ['routes', 'app', 'widgets', 'features', 'entities', 'shared'] },
          { from: 'widgets', allow: ['widgets', 'features', 'entities', 'shared'] },
          { from: 'features', allow: ['features', 'entities', 'shared'] },
          { from: 'entities', allow: ['entities', 'shared'] },
          { from: 'shared', allow: ['shared'] },
        ],
      },
    ],
    // Unused imports cleanup
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: true },
    ],

    // Import sort & grouping
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',

    // TypeScript strictness
    '@typescript-eslint/no-explicit-any': 'error',

    // Code quality
    'max-lines-per-function': ['warn', 80],
    'max-lines': ['warn', { max: 400, skipBlankLines: true, skipComments: true }],
    'max-params': ['warn', 4],
    complexity: ['warn', 10],

    // Prettier
    'prettier/prettier': ['error', { endOfLine: 'lf' }],

    // Desabilita aviso falso-positivo do React
    'import/no-named-as-default-member': 'off',
  },
  overrides: [
    {
      files: ['**/*.test.ts', '**/*.spec.ts'],
      env: { jest: true },
      rules: {
        'max-lines-per-function': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
    {
      files: ['.eslintrc.cjs'],
      env: { node: true },
    },
  ],
};
