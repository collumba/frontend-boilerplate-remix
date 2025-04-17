/**
 * ESLint Config - Nível 2 (Avançado) para projetos com arquitetura Feature Slice Design (FSD)
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
    'plugin:security/recommended',
    'plugin:sonarjs/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  plugins: [
    '@typescript-eslint',
    'import',
    'react',
    'react-hooks',
    'jsx-a11y',
    'security',
    'sonarjs',
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
      node: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      },
      typescript: {
        alwaysTryTypes: true,
      },
      alias: {
        map: [
          ['@app', './src/app'],
          ['@routes', './src/routes'],
          ['@widgets', './src/widgets'],
          ['@features', './src/features'],
          ['@entities', './src/entities'],
          ['@shared', './src/shared'],
        ],
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
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
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: true },
    ],

    // Import organization
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/no-relative-parent-imports': 'error',

    // TypeScript quality
    '@typescript-eslint/no-explicit-any': 'error',

    // Code quality rules
    'max-lines-per-function': ['warn', 80],
    'max-lines': ['warn', { max: 400, skipBlankLines: true, skipComments: true }],
    'max-params': ['warn', 4],
    complexity: ['warn', 10],
    'sonarjs/cognitive-complexity': ['warn', 15],

    // Security best practices
    'security/detect-eval-with-expression': 'error',
    'security/detect-object-injection': 'warn',

    // Prettier integration
    'prettier/prettier': ['error', { endOfLine: 'lf' }],
  },
  overrides: [
    {
      files: ['**/*.test.ts', '**/*.spec.ts'],
      env: { jest: true, vitest: true },
      plugins: ['vitest'],
      extends: ['plugin:vitest/recommended'],
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
