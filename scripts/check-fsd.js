import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

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

// Expected directory structure for each layer
const expectedDirectories = {
  features: ["ui", "model", "api", "lib", "config"],
  entities: ["ui", "model", "api", "lib", "config"],
  shared: ["ui", "api", "lib", "config", "types"],
};

// File name patterns
const filePatterns = {
  ui: /\.(tsx|jsx)$/,
  model: /\.(ts|js)$/,
  api: /\.(ts|js)$/,
  lib: /\.(ts|js)$/,
  config: /\.(ts|js)$/,
  types: /\.(ts|js)$/,
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

// Helper function to check directory structure
function checkDirectoryStructure(layerPath, layerName) {
  const violations = [];

  if (!expectedDirectories[layerName]) {
    return violations; // No specific structure expected
  }

  // Get all subdirectories
  const subdirs = fs
    .readdirSync(layerPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  // Check for expected directories in features and entities modules
  if (layerName === "features" || layerName === "entities") {
    subdirs.forEach((subdir) => {
      const moduleDir = path.join(layerPath, subdir);

      // Check if module has the required structure
      const moduleDirs = fs
        .readdirSync(moduleDir, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);

      // Check for missing directories
      const missingDirs = expectedDirectories[layerName].filter(
        (dir) => !moduleDirs.includes(dir)
      );

      if (missingDirs.length > 0) {
        violations.push({
          directory: path.relative(rootDir, moduleDir),
          message: `Missing expected directories: ${missingDirs.join(", ")}`,
        });
      }

      // Check for index.ts file
      if (!fs.existsSync(path.join(moduleDir, "index.ts"))) {
        violations.push({
          directory: path.relative(rootDir, moduleDir),
          message: "Missing index.ts file",
        });
      }
    });
  } else if (layerName === "shared") {
    // Check if shared has the required structure
    const missingDirs = expectedDirectories[layerName].filter(
      (dir) => !subdirs.includes(dir)
    );

    if (missingDirs.length > 0) {
      violations.push({
        directory: path.relative(rootDir, layerPath),
        message: `Missing expected directories: ${missingDirs.join(", ")}`,
      });
    }
  }

  return violations;
}

// Find all TypeScript and TSX files
console.log("Checking FSD architecture violations...");

// Check directory structure
let structureViolations = [];
Object.keys(expectedDirectories).forEach((layerName) => {
  const layerPath = path.join(rootDir, "src", layerName);
  if (fs.existsSync(layerPath)) {
    structureViolations = structureViolations.concat(
      checkDirectoryStructure(layerPath, layerName)
    );
  }
});

if (structureViolations.length > 0) {
  console.log("\n⚠️ Directory structure violations:");
  structureViolations.forEach((v) => {
    console.log(`  - ${v.directory}: ${v.message}`);
  });
}

// Check import violations
const tsFiles = execSync('find src -type f -name "*.ts" -o -name "*.tsx"', {
  encoding: "utf-8",
})
  .split("\n")
  .filter(Boolean);

let importViolations = [];

tsFiles.forEach((file) => {
  try {
    const content = fs.readFileSync(path.join(rootDir, file), "utf-8");
    importViolations = importViolations.concat(
      checkImportViolations(path.join(rootDir, file), content)
    );
  } catch (error) {
    console.error(`Error checking ${file}:`, error.message);
  }
});

if (importViolations.length > 0) {
  console.log("\n⚠️ Import violations:");
  importViolations.forEach((v) => {
    console.log(`  - ${v.file}: ${v.message} (import: ${v.import})`);
  });
}

const totalViolations = structureViolations.length + importViolations.length;

if (totalViolations > 0) {
  console.log(`\n❌ Total of violations found: ${totalViolations}`);
  process.exit(1);
} else {
  console.log("\n✅ No FSD architecture violations found!");
}
