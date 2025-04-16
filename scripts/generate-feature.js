import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
/* eslint-env node */

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Get feature name from command line arguments
const featureName = process.argv[2];

if (!featureName) {
  console.error(
    "Please provide a name for the feature: npm run gen:feature <featureName>"
  );
  process.exit(1);
}

const featureDir = path.join(__dirname, "../src/features", featureName);

// Create feature directory structure
const directories = ["ui", "model", "api", "lib", "config"];

// Create the main feature directory
fs.mkdirSync(featureDir, { recursive: true });

// Create subdirectories
directories.forEach((dir) => {
  fs.mkdirSync(path.join(featureDir, dir), { recursive: true });
});

// Create index.ts file
const indexContent = `// Public API for the feature
export * from './ui';
`;

fs.writeFileSync(path.join(featureDir, "index.ts"), indexContent);

// Create UI index file
const uiIndexContent = `// Export UI components for the feature
`;

fs.writeFileSync(path.join(featureDir, "ui/index.ts"), uiIndexContent);

// Create model index file
const modelIndexContent = `// Export model, types, and store for the feature
`;

fs.writeFileSync(path.join(featureDir, "model/index.ts"), modelIndexContent);

// Create README.md with documentation
const readmeContent = `# ${featureName} Feature

## Description
Brief description of what this feature does and its purpose in the application.

## Usage
\`\`\`tsx
import { SomeComponent } from '@features/${featureName}';

const MyComponent = () => {
  return <SomeComponent />;
};
\`\`\`

## Structure
- \`ui/\` - UI components specific to this feature
- \`model/\` - State, types, and business logic
- \`api/\` - API requests and data fetching
- \`lib/\` - Utility functions specific to this feature
- \`config/\` - Feature-specific configurations
`;

fs.writeFileSync(path.join(featureDir, "README.md"), readmeContent);

console.log(
  `✅ Feature '${featureName}' was created successfully in src/features/${featureName}`
);
