import { RemixBrowser } from "@remix-run/react";
import { render as rtlRender } from "@testing-library/react";

function render(ui: React.ReactElement) {
  return rtlRender(ui, {
    wrapper: ({ children }) => <RemixBrowser>{children}</RemixBrowser>,
  });
}

export * from "@testing-library/react";
export { render };
