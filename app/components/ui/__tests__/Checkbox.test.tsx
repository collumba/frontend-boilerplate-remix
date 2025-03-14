import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Checkbox } from "../Checkbox";

describe("Checkbox", () => {
  it("renders correctly with default props", () => {
    render(<Checkbox />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveClass("border-gray-300");
  });

  it("renders with a label", () => {
    render(<Checkbox label="Accept terms" id="terms" />);
    const label = screen.getByText("Accept terms");
    const checkbox = screen.getByRole("checkbox");

    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute("for", "terms");
    expect(checkbox).toHaveAttribute("id", "terms");
  });

  it("shows error state correctly", () => {
    render(<Checkbox error="This field is required" id="test" />);
    const checkbox = screen.getByRole("checkbox");
    const errorMessage = screen.getByText("This field is required");

    expect(checkbox).toHaveAttribute("aria-invalid", "true");
    expect(checkbox).toHaveClass("border-error-300");
    expect(errorMessage).toHaveClass("text-error-600");
  });

  it("shows helper text when provided", () => {
    render(<Checkbox helperText="Optional field" />);
    const helperText = screen.getByText("Optional field");
    expect(helperText).toBeInTheDocument();
    expect(helperText).toHaveClass("text-gray-500");
  });

  it("handles disabled state correctly", () => {
    render(<Checkbox disabled />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeDisabled();
    expect(checkbox).toHaveClass("bg-gray-100");
  });

  it("handles indeterminate state correctly", () => {
    render(<Checkbox indeterminate />);
    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
    expect(checkbox.indeterminate).toBe(true);
  });

  it("handles change events correctly", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<Checkbox onChange={handleChange} />);
    const checkbox = screen.getByRole("checkbox");

    await user.click(checkbox);
    expect(handleChange).toHaveBeenCalled();
    expect(checkbox).toBeChecked();

    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();
    render(<Checkbox ref={ref} />);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement));
  });

  it("combines error and helper text with correct IDs", () => {
    render(
      <Checkbox id="test" error="Error message" helperText="Helper text" />,
    );

    const checkbox = screen.getByRole("checkbox");
    const errorMessage = screen.getByText("Error message");

    expect(checkbox).toHaveAttribute("aria-describedby", "test-error");
    expect(errorMessage).toHaveAttribute("id", "test-error");
  });
});
