import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Get component arguments from command line
const [, , componentName, layerName = "shared"] = process.argv;

if (!componentName) {
  console.error(
    "Please provide a name for the component: npm run gen:component <componentName> [layerName]"
  );
  process.exit(1);
}

// Validate layer name
const validLayers = ["shared", "entities", "features", "widgets", "app"];
if (!validLayers.includes(layerName)) {
  console.error(
    `Invalid layer: ${layerName}. Use one of the following: ${validLayers.join(
      ", "
    )}`
  );
  process.exit(1);
}

const componentDir = path.join(
  __dirname,
  `../src/${layerName}/ui/`,
  componentName
);

// Create component directory
fs.mkdirSync(componentDir, { recursive: true });

// Create component file
const componentContent = `import { forwardRef } from 'react';

export interface ${componentName}Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const ${componentName} = forwardRef<HTMLDivElement, ${componentName}Props>(
  ({ children, className, ...props }, ref) => {
    return (
      <div className={className} ref={ref} {...props}>
        {children}
      </div>
    );
  }
);

${componentName}.displayName = '${componentName}';

export { ${componentName} };
`;

fs.writeFileSync(
  path.join(componentDir, `${componentName}.tsx`),
  componentContent
);

// Create test file
const testContent = `import { render, screen } from '@testing-library/react';
import { ${componentName} } from './${componentName}';

describe('${componentName}', () => {
  it('renders correctly', () => {
    render(<${componentName}>Test Content</${componentName}>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});
`;

fs.writeFileSync(
  path.join(componentDir, `${componentName}.test.tsx`),
  testContent
);

// Create index file
const indexContent = `export * from './${componentName}';
`;

fs.writeFileSync(path.join(componentDir, "index.ts"), indexContent);

// Update UI index file to export the new component
const uiIndexPath = path.join(__dirname, `../src/${layerName}/ui/index.ts`);

// Create UI index if it doesn't exist
if (!fs.existsSync(uiIndexPath)) {
  fs.mkdirSync(path.dirname(uiIndexPath), { recursive: true });
  fs.writeFileSync(uiIndexPath, "");
}

// Append export to UI index
const exportLine = `export * from './${componentName}';\n`;
fs.appendFileSync(uiIndexPath, exportLine);

console.log(
  `✅ Component '${componentName}' was created successfully in src/${layerName}/ui/${componentName}`
);
