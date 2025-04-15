# Contributing Guide

This project follows the Feature-Sliced Design (FSD) architecture. Please take the time to understand this architecture before contributing.

## Project Architecture

The codebase is organized according to Feature-Sliced Design (FSD) principles with the following layer structure:

1. **app**: Application layer containing global configurations, providers, and styles
2. **routes**: Page components and layouts for specific routes
3. **widgets**: Composite UI blocks used on pages
4. **features**: Business logic and UI for specific use cases
5. **entities**: Business entity data models and basic UI
6. **shared**: Reusable code, UI kit, utilities

### Import Rules

Layers can only import from layers below them:

- `app` → can import from `shared`, `entities`, `features`, `widgets`
- `routes` → can import from `app`, `widgets`, `features`, `entities`, `shared`
- `widgets` → can import from `features`, `entities`, `shared`
- `features` → can import from `entities`, `shared`
- `entities` → can import from `shared`
- `shared` → cannot import from any other layer

### Path Aliases

Use the following path aliases for imports:

- `@app/*` → `src/*`
- `@routes/*` → `src/routes/*`
- `@widgets/*` → `src/widgets/*`
- `@features/*` → `src/features/*`
- `@entities/*` → `src/entities/*`
- `@shared/*` → `src/shared/*`

### Module Organization

Each module (feature, entity, shared) should maintain a consistent structure:

- **Features & Entities**:

  - `ui/` - UI components
  - `model/` - State, types, business logic
  - `api/` - API requests
  - `lib/` - Utility functions
  - `config/` - Configurations
  - `index.ts` - Public API

- **Shared**:
  - `ui/` - UI components
  - `api/` - API-related code
  - `lib/` - Utility functions
  - `config/` - Configurations
  - `types/` - Type definitions
  - `index.ts` - Public API

## Development Tools

This project provides several code generation tools to help maintain consistency:

```bash
# Generate a new feature
npm run gen:feature <featureName>

# Generate a new entity
npm run gen:entity <entityName>

# Generate a new shared module
npm run gen:shared <moduleName> [moduleType]
# moduleType can be: ui, api, lib, config, types

# Generate a new component
npm run gen:component <componentName> [layerName]
# layerName can be: shared, entities, features, widgets, app

# Generate a new route
npm run gen:route <routePath>
# Example: npm run gen:route users/profile

# Check FSD architecture violations
npm run check:fsd
```

## Tech Stack

- **Framework**: Remix
- **UI**: React with Tailwind CSS
- **State Management**: React Query
- **Data Fetching**: Axios
- **Form Handling**: React Hook Form + Zod
- **UI Components**: Radix UI
- **Testing**: Vitest + Testing Library
- **Internationalization**: i18next

## Code Conventions

1. Use TypeScript for all code
2. Create tests for all components and features
3. Use the existing libraries and utilities before adding new ones
4. Export all components and utilities through index.ts files
5. Follow the project's code style (enforced by ESLint and Prettier)
6. Use English for code, comments, and documentation

## Commit Guidelines

This project follows the conventional commits specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

Where `type` is one of:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Changes that do not affect the code logic
- `refactor`: Code changes that neither fixes a bug nor adds a feature
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Changes to the build process or auxiliary tools

## Pull Request Process

1. Ensure your code follows the project's architecture and conventions
2. Run the tests and make sure they pass
3. Run `npm run check:fsd` to verify no FSD architecture violations
4. Update documentation if necessary
5. Create a pull request with a descriptive title and detailed description
