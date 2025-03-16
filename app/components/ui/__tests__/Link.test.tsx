import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Link } from "../Link";
import { render } from "./setup";

describe("Link", () => {
  it("renders correctly with default props", () => {
    render(<Link to="/test">Click me</Link>);
    const link = screen.getByText("Click me");
    expect(link).toBeInTheDocument();
    expect(link.closest("a")).toHaveAttribute("href", "/test");
  });

  it("renders with different variants", () => {
    const { rerender } = render(
      <Link to="/test" variant="button">
        Button Link
      </Link>
    );
    expect(screen.getByText("Button Link")).toHaveClass("rounded-md");

    rerender(
      <Link to="/test" variant="underline">
        Underlined Link
      </Link>
    );
    expect(screen.getByText("Underlined Link")).toHaveClass("underline");
  });

  it("renders with different sizes", () => {
    const { rerender } = render(
      <Link to="/test" size="sm">
        Small Link
      </Link>
    );
    expect(screen.getByText("Small Link")).toHaveClass("text-sm");

    rerender(
      <Link to="/test" size="lg">
        Large Link
      </Link>
    );
    expect(screen.getByText("Large Link")).toHaveClass("text-lg");
  });

  it("renders with different colors", () => {
    const { rerender } = render(
      <Link to="/test" color="error">
        Error Link
      </Link>
    );
    expect(screen.getByText("Error Link")).toHaveClass("text-error-600");

    rerender(
      <Link to="/test" color="success">
        Success Link
      </Link>
    );
    expect(screen.getByText("Success Link")).toHaveClass("text-success-600");
  });

  it("renders with an icon", () => {
    render(
      <Link
        to="/test"
        icon={<span data-testid="test-icon">icon</span>}
      >
        Icon Link
      </Link>
    );
    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
    expect(screen.getByText("Icon Link")).toBeInTheDocument();
  });

  it("renders as disabled", () => {
    render(
      <Link to="/test" disabled>
        Disabled Link
      </Link>
    );
    const link = screen.getByText("Disabled Link");
    expect(link).toHaveClass("pointer-events-none", "opacity-50");
    expect(link.closest("a")).toHaveAttribute("href", "");
  });

  it("renders as external link with icon", () => {
    render(
      <Link to="https://example.com" external>
        External Link
      </Link>
    );
    const link = screen.getByText("External Link");
    expect(link.closest("a")).toHaveAttribute("target", "_blank");
    expect(link.closest("a")).toHaveAttribute("rel", "noopener noreferrer");
    expect(link.closest("a")?.querySelector("svg")).toBeInTheDocument();
  });
}); 