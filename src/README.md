# Feature Slice Design (FSD) Structure

This project is organized following the Feature Slice Design architecture pattern:

## Layers

- **app/** - Application layer: global configuration, providers, styles
  - **providers/** - Global providers (contexts, shared providers)
  - **styles/** - Global styles
  - **layouts/** - Global layouts used across multiple features
- **routes/** - Routing layer: route components, layouts specific to routes
  - Route components with minimal logic that compose widgets/features
- **widgets/** - Composite UI blocks used on pages
  - Widgets can use features and entities but shouldn't know about pages
- **features/** - Business logic and UI for specific use cases
  - Each feature is a slice with its own internal structure:
    - **ui/** - React components specific to this feature
    - **model/** - Business logic (store slices, effects, etc.)
    - **api/** - API requests related to this feature
    - **lib/** - Feature-specific utilities and helpers
    - **config/** - Feature configuration
- **entities/** - Business entities with their data models and basic UI
  - Each entity is a slice with its own internal structure similar to features
- **shared/** - Reusable code, UI kit, utilities
  - **ui/** - UI kit (basic UI components)
  - **api/** - API setup, base queries
  - **config/** - Global configuration
  - **lib/** - Utility functions and hooks
  - **types/** - Shared TypeScript types

## Usage Rules

1. Layers can only import from layers below them
2. A layer cannot import from sibling modules in the same layer
3. Features should be isolated and can be composed into widgets or pages

## Benefits of FSD

- Clear dependency rules
- Isolated features that are easier to maintain and test
- Code organization that mirrors business domain
- Enables parallel development by different teams
