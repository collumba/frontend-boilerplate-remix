# Feature-Sliced Design (FSD) Architecture Validation

This project uses [Feature-Sliced Design](https://feature-sliced.design/) architecture and enforces its rules through ESLint.

## Architecture Rules

FSD defines a layered architecture with specific import rules:

| Layer    | Can Import From                                  |
| -------- | ------------------------------------------------ |
| app      | app, shared, entities, features, widgets         |
| routes   | routes, app, widgets, features, entities, shared |
| widgets  | widgets, features, entities, shared              |
| features | features, entities, shared                       |
| entities | entities, shared                                 |
| shared   | shared                                           |

## ESLint Validation

We use the following ESLint plugins to enforce architectural rules:

1. `eslint-plugin-boundaries` - Enforces dependencies between layers
2. `eslint-plugin-import` - Enforces import patterns and alias usage

The configuration is in `.eslintrc.cjs`.

### Import Rules

The project enforces the following import rules:

- **No parent directory imports** (`import/no-relative-parent-imports`): Prevents using `../` in imports
  - You must use path aliases like `@app/`, `@shared/`, etc. instead of relative paths
  - This rule applies to `src/` files only, test files are exempt

### Running Validation

You can check your code for FSD architecture violations using:

```bash
# Check all ESLint rules (including FSD and parent import rules)
npm run lint

# Fix auto-fixable issues
npm run eslint:fix
```

The following rules are enforced:

1. **Layer dependencies** (`boundaries/element-types`): Enforces the allowed imports between layers
2. **No parent directory imports** (`import/no-relative-parent-imports`): Prevents using `../` in imports
3. **Import order** (`import/order`): Enforces consistent ordering of imports:
   - Built-in modules (e.g., `react`, `node:fs`)
   - External modules (from node_modules)
   - Internal modules (path aliases like `@shared`, `@app`, etc.)
   - Parent directories
   - Same directory
   - Index imports
   - Imports are alphabetized and separated by newlines between groups

### Ignoring Files

Some files are temporarily exempted from FSD validation in `.eslintrc.cjs`. This is done by adding paths to the `boundaries/ignore` array.

## Path Aliases

The project uses path aliases for imports between layers:

- `@app/*` - Application layer
- `@routes/*` - Routes layer
- `@widgets/*` - Widgets layer
- `@features/*` - Features layer
- `@entities/*` - Entities layer
- `@shared/*` - Shared layer

Always use these aliases instead of relative imports between layers.

## Script-Based Validation

In addition to ESLint rules, we have a custom script that can check FSD architecture violations:

```bash
npm run check:fsd
```

This script analyzes imports directly without using ESLint.

## Code Quality Rules

In addition to the architecture rules, the project enforces several code quality rules:

1. **No explicit any** (`@typescript-eslint/no-explicit-any`): Prevents the use of the `any` type, promoting better type safety
2. **Complexity limit** (`complexity`): Warns when functions exceed a complexity score of 10
3. **Function size limit** (`max-lines-per-function`): Warns when functions exceed 50 lines of code
4. **File size limit** (`max-lines`): Warns when files exceed 300 lines of code

These limits help maintain code quality by encouraging:

- Breaking down complex functions into simpler ones
- Creating smaller, more focused components and modules
- Proper type definitions instead of using `any`
