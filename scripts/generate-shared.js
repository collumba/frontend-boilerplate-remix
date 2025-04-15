import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Get shared module name from command line arguments
const moduleName = process.argv[2];
const moduleType = process.argv[3] || "ui"; // Default to UI module

if (!moduleName) {
  console.error(
    "Please provide a name for the module: npm run gen:shared <moduleName> [moduleType]"
  );
  process.exit(1);
}

// Validate module type
const validModuleTypes = ["ui", "api", "lib", "config", "types"];
if (!validModuleTypes.includes(moduleType)) {
  console.error(
    `Invalid module type: ${moduleType}. Use one of the following: ${validModuleTypes.join(
      ", "
    )}`
  );
  process.exit(1);
}

const moduleDir = path.join(__dirname, "../src/shared", moduleType, moduleName);

// Create module directory
fs.mkdirSync(moduleDir, { recursive: true });

// Create index.ts file
const indexContent = `// Public API for the shared module
`;

fs.writeFileSync(path.join(moduleDir, "index.ts"), indexContent);

// Create specific files based on module type
if (moduleType === "ui") {
  // Create component file
  const componentContent = `import { forwardRef } from 'react';

export interface ${moduleName}Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const ${moduleName} = forwardRef<HTMLDivElement, ${moduleName}Props>(
  ({ children, className, ...props }, ref) => {
    return (
      <div className={className} ref={ref} {...props}>
        {children}
      </div>
    );
  }
);

${moduleName}.displayName = '${moduleName}';

export { ${moduleName} };
`;

  fs.writeFileSync(path.join(moduleDir, `${moduleName}.tsx`), componentContent);

  // Create test file
  const testContent = `import { render, screen } from '@testing-library/react';
import { ${moduleName} } from './${moduleName}';

describe('${moduleName}', () => {
  it('renders correctly', () => {
    render(<${moduleName}>Test Content</${moduleName}>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});
`;

  fs.writeFileSync(path.join(moduleDir, `${moduleName}.test.tsx`), testContent);

  // Update index file to export the component
  fs.writeFileSync(
    path.join(moduleDir, "index.ts"),
    `export * from './${moduleName}';\n`
  );
} else if (moduleType === "lib") {
  // Create utility file
  const utilContent = `/**
 * ${moduleName} utility functions
 */

/**
 * Example utility function
 */
export function example(): void {
  // Implementation
}
`;

  fs.writeFileSync(path.join(moduleDir, `${moduleName}.ts`), utilContent);

  // Create test file
  const testContent = `import { example } from './${moduleName}';

describe('${moduleName}', () => {
  it('example function works correctly', () => {
    expect(typeof example).toBe('function');
  });
});
`;

  fs.writeFileSync(path.join(moduleDir, `${moduleName}.test.ts`), testContent);

  // Update index file to export the utility
  fs.writeFileSync(
    path.join(moduleDir, "index.ts"),
    `export * from './${moduleName}';\n`
  );
} else if (moduleType === "types") {
  // Create types file
  const typesContent = `/**
 * ${moduleName} type definitions
 */

export interface Example {
  id: string;
  name: string;
}
`;

  fs.writeFileSync(path.join(moduleDir, `${moduleName}.ts`), typesContent);

  // Update index file to export the types
  fs.writeFileSync(
    path.join(moduleDir, "index.ts"),
    `export * from './${moduleName}';\n`
  );
}

// Update the parent index file
const parentIndexPath = path.join(
  __dirname,
  `../src/shared/${moduleType}/index.ts`
);

// Create parent index if it doesn't exist
if (!fs.existsSync(parentIndexPath)) {
  fs.mkdirSync(path.dirname(parentIndexPath), { recursive: true });
  fs.writeFileSync(parentIndexPath, "");
}

// Append export to parent index
const exportLine = `export * from './${moduleName}';\n`;
fs.appendFileSync(parentIndexPath, exportLine);

console.log(
  `✅ Shared ${moduleType} module '${moduleName}' was created successfully in src/shared/${moduleType}/${moduleName}`
);
