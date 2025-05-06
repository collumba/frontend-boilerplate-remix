# Remix Boilerplate

A frontend web application boilerplate project using Remix.run and TypeScript.

## Technologies Used

- **Remix.run** (v2.5.0) - Full-stack web framework based on React
- **React** (v18.2.0) - JavaScript library for building user interfaces
- **TypeScript** (v5.8.2) - Typed superset of JavaScript
- **Tailwind CSS** (v4.0.14) - Utility-first CSS framework
- **Vite** (v5.4.14) - Fast build tool for modern web development
- **shadcn/ui** - Reusable UI components built with Radix UI and Tailwind CSS
- **Radix UI** (v1.1.6) - Unstyled, accessible UI components for React
- **React Router** (v6.26.0) - Routing library for React
- **React Hook Form** (v7.55.0) - Form library for React
- **Zod** (v3.23.8) - TypeScript-first schema validation
- **Tanstack Query** (v5.59.1) - Data fetching and state management library
- **Tanstack Table** (v8.10.0) - Headless UI for building powerful tables
- **i18next** (v23.12.2) - Internationalization framework
- **Axios** (v1.7.7) - Promise-based HTTP client
- **date-fns** (v4.1.0) - JavaScript date utility library
- **Lucide React** (v0.482.0) - Icon library for React
- **ESLint** (v8.57.1) - Static code analysis tool
- **Vitest** (v3.0.8) - Fast Vite-based testing framework

## Architecture

This project follows the Feature Slice Design (FSD) architecture pattern, which organizes code by business domains and technical layers.

### Project Structure

- `src/` - Main source directory
  - `app/` - Application layer: global configuration, providers, styles
  - `routes/` - Routing layer: route components and layouts
  - `widgets/` - Composite UI blocks used on pages
  - `features/` - Business logic and UI for specific use cases
  - `entities/` - Business entities with their data models and basic UI
  - `shared/` - Reusable code, UI kit, utilities

### Layer Dependencies

The project follows a strict dependency rule where each layer can only import from layers below it:

- `app` can import from `shared`, `entities`, `features`, `widgets`
- `routes` can import from `app`, `widgets`, `features`, `entities`, `shared`
- `widgets` can import from `features`, `entities`, `shared`
- `features` can import from `entities`, `shared`
- `entities` can import from `shared`
- `shared` has no dependencies on other layers

## Features

This boilerplate includes:

1. **Core Framework**:

   - Remix.run setup with TypeScript
   - React 18 integration
   - React Query for data fetching and caching

2. **UI Component System**:

   - Comprehensive component library with 35+ components
   - Basic components: Button, Input, Textarea, Select
   - Advanced components: DataTable, Popover, Dialog
   - Form components with validation support
   - Responsive components
   - Theme switching (light/dark mode)

3. **Authentication & Authorization**:

   - Authentication system with login/register forms
   - Authentication context and hooks
   - Protected routes

4. **Internationalization (i18n)**:

   - Support for multiple languages
   - Language switching component
   - Localized content

5. **Forms & Validation**:

   - Form components with validation
   - Entity forms with complex data handling
   - Support for masked inputs

6. **Data Management**:

   - API service layer
   - Data fetching hooks (useTable, useDataTable)

7. **Navigation & Layout**:

   - Application sidebar
   - Navigation components
   - Page layouts
   - Breadcrumb navigation

8. **Routing**:

   - Nested route structure
   - Layout-based routing
   - API routes for backend functionality

9. **State Management**:

   - Context API implementation
   - React Query for server state
   - Custom hooks for state management

10. **Styling & Design System**:

    - Tailwind CSS integration
    - Consistent UI/UX patterns
    - Typography system
    - Custom theming

11. **Utilities**:

    - Toast notification system
    - Cookie management
    - Date formatting
    - Client-only components
    - Error handling

12. **Developer Experience**:

    - TypeScript configuration
    - ESLint setup
    - VS Code integration
    - Documentation
    - Component generation scripts

13. **API Integration**:

    - Axios wrapper
    - Request/response handling
    - Error handling

14. **Testing Configuration**:
    - Vitest setup for testing

## Getting Started

### Prerequisites

- Node.js (version 20.0.0 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/frontend-boilerplate-remix.git
   cd frontend-boilerplate-remix
   ```

2. Install dependencies:

   ```bash
   rm -rf .vite .cache node_modules build && npm install
   # or
   rm -rf .vite .cache node_modules build && yarn
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run start` - Start the production server
- `npm run typecheck` - Check TypeScript types
- `npm run lint` - Run the linter to check code
- `npm run lint:fix` - Run the linter and fix issues
- `npm run format` - Format code with Prettier
- `npm run test` - Run tests
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage
- `npm run test:watch` - Run tests in watch mode
- `npm run gen:feature` - Generate a new feature
- `npm run gen:entity` - Generate a new entity
- `npm run gen:shared` - Generate a new shared module
- `npm run gen:component` - Generate a new component

## Code Generation

This boilerplate includes scripts to generate new features, entities, shared modules, and components according to the Feature Slice Design architecture:

- `npm run gen:feature` - Generate a new feature
- `npm run gen:entity` - Generate a new entity
- `npm run gen:shared` - Generate a new shared module
- `npm run gen:component` - Generate a new component

## Deployment

To deploy the application to production:

1. Build the project:

   ```bash
   npm run build
   # or
   yarn build
   ```

2. Start the production server:
   ```bash
   npm run start
   # or
   yarn start
   ```

For more information about deployment, see the [Remix documentation](https://remix.run/docs/en/main/guides/deployment).

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
