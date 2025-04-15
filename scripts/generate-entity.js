import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Get entity name from command line arguments
const entityName = process.argv[2];

if (!entityName) {
  console.error(
    "Please provide a name for the entity: npm run gen:entity <entityName>"
  );
  process.exit(1);
}

const entityDir = path.join(__dirname, "../src/entities", entityName);

// Create entity directory structure
const directories = ["ui", "model", "api", "lib", "config"];

// Create the main entity directory
fs.mkdirSync(entityDir, { recursive: true });

// Create subdirectories
directories.forEach((dir) => {
  fs.mkdirSync(path.join(entityDir, dir), { recursive: true });
});

// Create index.ts file
const indexContent = `// Public API for the entity
export * from './ui';
export * from './model';
`;

fs.writeFileSync(path.join(entityDir, "index.ts"), indexContent);

// Create UI index file
const uiIndexContent = `// Export UI components for the entity
`;

fs.writeFileSync(path.join(entityDir, "ui/index.ts"), uiIndexContent);

// Create model index file with types
const modelContent = `// Types for ${entityName}
export interface ${entityName} {
  id: string;
  // Add more properties here
}

// Export model, types for the entity
export * from './store';
`;

fs.writeFileSync(path.join(entityDir, "model/index.ts"), modelContent);

// Create store file
const storeContent = `// Store and queries for ${entityName}
import { ${entityName} } from './index';

// Example query hook for ${entityName}
export const use${entityName} = (id: string) => {
  // Implement query logic here
  return null as unknown as ${entityName};
};

// Example query hook for ${entityName} list
export const use${entityName}List = () => {
  // Implement query logic here
  return [] as ${entityName}[];
};
`;

fs.writeFileSync(path.join(entityDir, "model/store.ts"), storeContent);

// Create README.md with documentation
const readmeContent = `# ${entityName} Entity

## Description
This entity represents a ${entityName.toLowerCase()} in the application.

## Usage
\`\`\`tsx
import { ${entityName}, use${entityName} } from '@entities/${entityName}';

const MyComponent = () => {
  const ${entityName.toLowerCase()} = use${entityName}('some-id');
  
  return <div>{/* Render entity data */}</div>;
};
\`\`\`

## Structure
- \`ui/\` - UI components specific to this entity
- \`model/\` - Entity type definitions and state management
- \`api/\` - API requests related to this entity
- \`lib/\` - Utility functions specific to this entity
- \`config/\` - Entity-specific configurations
`;

fs.writeFileSync(path.join(entityDir, "README.md"), readmeContent);

console.log(
  `✅ Entity '${entityName}' was created successfully in src/entities/${entityName}`
);
