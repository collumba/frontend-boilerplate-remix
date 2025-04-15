import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Get route arguments from command line
const routeId = process.argv[2];

if (!routeId) {
  console.error("Please provide a route path: npm run gen:route users/profile");
  process.exit(1);
}

// Format the route path
const routePath = routeId.startsWith("/") ? routeId.substring(1) : routeId;
const routeDir = path.join(__dirname, "../src/routes", routePath);

// Create directories if they don't exist
fs.mkdirSync(routeDir, { recursive: true });

// Create route component
const routeFilename = "route.tsx";
const routeContent = `import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { z } from "zod";

export async function loader() {
  return json({ 
    pageTitle: "${routePath} Page",
  });
}

export default function ${toComponentName(routePath)}Route() {
  const { pageTitle } = useLoaderData<typeof loader>();
  
  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-4">{pageTitle}</h1>
      {/* Page content */}
    </div>
  );
}

// Schema for form validation
export const schema = z.object({
  // Define your schema here
});

export function meta() {
  return [
    { title: "${toComponentName(routePath)} Page" },
    { name: "description", content: "Description for ${routePath} page" },
  ];
}
`;

fs.writeFileSync(path.join(routeDir, routeFilename), routeContent);

// Create test file
const testContent = `import { render, screen } from "@testing-library/react";
import { createRemixStub } from "@remix-run/testing";
import ${toComponentName(routePath)}Route, { loader } from "./route";

describe("${toComponentName(routePath)}Route", () => {
  it("renders correctly", async () => {
    const RemixStub = createRemixStub([
      {
        path: "/${routePath}",
        Component: ${toComponentName(routePath)}Route,
        loader,
      },
    ]);

    render(<RemixStub initialEntries={["/${routePath}"]} />);

    expect(await screen.findByText("${routePath} Page")).toBeInTheDocument();
  });
});
`;

fs.writeFileSync(path.join(routeDir, "route.test.tsx"), testContent);

console.log(
  `✅ Route '/${routePath}' was created successfully in src/routes/${routePath}`
);

// Helper function to convert path to component name
function toComponentName(path) {
  return path
    .split(/[\/\-_]/)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join("");
}
