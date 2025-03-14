import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Badge } from "../Badge";

describe("Badge", () => {
  it("renders correctly with default props", () => {
    render(<Badge>Default Badge</Badge>);
    const badge = screen.getByText("Default Badge");
    expect(badge).toHaveClass("bg-primary-100", "text-primary-800");
  });

  it("applies different variants correctly", () => {
    const { rerender } = render(<Badge variant="success">Success</Badge>);
    expect(screen.getByText("Success")).toHaveClass(
      "bg-success-100",
      "text-success-800",
    );

    rerender(<Badge variant="error">Error</Badge>);
    expect(screen.getByText("Error")).toHaveClass(
      "bg-error-100",
      "text-error-800",
    );
  });

  it("applies different sizes correctly", () => {
    const { rerender } = render(<Badge size="sm">Small</Badge>);
    expect(screen.getByText("Small")).toHaveClass("px-2", "py-0.5", "text-xs");

    rerender(<Badge size="lg">Large</Badge>);
    expect(screen.getByText("Large")).toHaveClass("px-3", "py-1", "text-base");
  });

  it("applies outline style when isOutline is true", () => {
    render(<Badge isOutline>Outline Badge</Badge>);
    expect(screen.getByText("Outline Badge")).toHaveClass(
      "border",
      "border-primary-200",
      "text-primary-800",
    );
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();
    render(<Badge ref={ref}>Badge</Badge>);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLSpanElement));
  });

  it("combines custom className with default styles", () => {
    render(<Badge className="custom-class">Custom Badge</Badge>);
    const badge = screen.getByText("Custom Badge");
    expect(badge).toHaveClass("custom-class");
    expect(badge).toHaveClass("bg-primary-100"); // Default style should still be applied
  });
});
