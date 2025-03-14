import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Alert } from "../Alert";

describe("Alert", () => {
  it("renders correctly with default props", () => {
    render(<Alert>Default Alert</Alert>);
    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass("bg-primary-50", "text-primary-800");
    expect(alert).toHaveTextContent("Default Alert");
  });

  it("renders with title", () => {
    render(<Alert title="Alert Title">Alert Content</Alert>);
    expect(screen.getByText("Alert Title")).toHaveClass("font-medium");
    expect(screen.getByText("Alert Content")).toBeInTheDocument();
  });

  it("applies different variants correctly", () => {
    const { rerender } = render(<Alert variant="success">Success Alert</Alert>);
    expect(screen.getByRole("alert")).toHaveClass(
      "bg-success-50",
      "text-success-800",
    );

    rerender(<Alert variant="error">Error Alert</Alert>);
    expect(screen.getByRole("alert")).toHaveClass(
      "bg-error-50",
      "text-error-800",
    );
  });

  it("renders with icon", () => {
    const icon = <span data-testid="test-icon">Icon</span>;
    render(<Alert icon={icon}>Alert with Icon</Alert>);
    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
    expect(screen.getByTestId("test-icon").parentElement).toHaveClass(
      "text-primary-500",
    );
  });

  it("handles close button click", async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();

    render(<Alert onClose={onClose}>Closeable Alert</Alert>);
    const closeButton = screen.getByRole("button");

    await user.click(closeButton);
    expect(onClose).toHaveBeenCalled();
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();
    render(<Alert ref={ref}>Alert</Alert>);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });

  it("combines custom className with default styles", () => {
    render(<Alert className="custom-class">Custom Alert</Alert>);
    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass("custom-class");
    expect(alert).toHaveClass("bg-primary-50"); // Default style should still be applied
  });
});
