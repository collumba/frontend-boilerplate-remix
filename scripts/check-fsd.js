import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
/* eslint-env node */

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");

// FSD architecture rules
const layers = {
  app: ["shared", "entities", "features", "widgets"],
  routes: ["app", "widgets", "features", "entities", "shared"],
  widgets: ["features", "entities", "shared"],
  features: ["entities", "shared"],
  entities: ["shared"],
  shared: [],
};

// Helper function to check import violations
function checkImportViolations(filePath, content) {
  const violations = [];

  // Determine the layer of the current file
  const relativePath = path.relative(rootDir, filePath);
  const fileLayer = Object.keys(layers).find((layer) =>
    relativePath.includes(`/src/${layer}/`)
  );

  if (!fileLayer) {
    return violations; // Not a layer file
  }

  // Extract imports
  const importRegex =
    /import\s+(?:(?:{[^}]*}|\*\s+as\s+[^;]+|[^;{]*)\s+from\s+)?['"]([^'"]+)['"]/g;
  let match;

  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1];

    // Check if it's an alias import
    if (importPath.startsWith("@")) {
      const importLayer = importPath.split("/")[0].substring(1);

      // Check if import is allowed
      if (
        importLayer !== fileLayer &&
        !layers[fileLayer].includes(importLayer) &&
        Object.keys(layers).includes(importLayer)
      ) {
        violations.push({
          file: relativePath,
          import: importPath,
          message: `Layer '${fileLayer}' cannot import from '${importLayer}'`,
        });
      }
    }
  }

  return violations;
}

// Find all TypeScript and TSX files
console.log("Checking FSD architecture violations...");
const tsFiles = execSync('find src -type f -name "*.ts" -o -name "*.tsx"', {
  encoding: "utf-8",
})
  .split("\n")
  .filter(Boolean);

let totalViolations = 0;

tsFiles.forEach((file) => {
  try {
    const content = fs.readFileSync(path.join(rootDir, file), "utf-8");
    const violations = checkImportViolations(path.join(rootDir, file), content);

    if (violations.length > 0) {
      totalViolations += violations.length;
      console.log(`\n⚠️ Violations in ${file}:`);
      violations.forEach((v) => {
        console.log(`  - ${v.message} (import: ${v.import})`);
      });
    }
  } catch (error) {
    console.error(`Error checking ${file}:`, error.message);
  }
});

if (totalViolations > 0) {
  console.log(`\n❌ Total of violations found: ${totalViolations}`);
  process.exit(1);
} else {
  console.log("\n✅ No FSD architecture violations found!");
}
