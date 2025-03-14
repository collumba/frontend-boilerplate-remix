import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Switch } from "../Switch";

describe("Switch", () => {
  it("renders correctly with default props", () => {
    render(<Switch />);
    const switchInput = screen.getByRole("checkbox");
    expect(switchInput).toBeInTheDocument();
    expect(switchInput.nextElementSibling).toHaveClass("h-6 w-11"); // Default size md
  });

  it("renders with a label", () => {
    render(<Switch label="Dark mode" id="dark-mode" />);
    const label = screen.getByText("Dark mode");
    const switchInput = screen.getByRole("checkbox");

    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute("for", "dark-mode");
    expect(switchInput).toHaveAttribute("id", "dark-mode");
  });

  it("shows error state correctly", () => {
    render(<Switch error="This field is required" id="test" />);
    const switchInput = screen.getByRole("checkbox");
    const errorMessage = screen.getByText("This field is required");

    expect(switchInput).toHaveAttribute("aria-invalid", "true");
    expect(switchInput.nextElementSibling).toHaveClass("bg-error-100");
    expect(errorMessage).toHaveClass("text-error-600");
  });

  it("shows helper text when provided", () => {
    render(<Switch helperText="Toggle dark mode" />);
    const helperText = screen.getByText("Toggle dark mode");
    expect(helperText).toBeInTheDocument();
    expect(helperText).toHaveClass("text-gray-500");
  });

  it("handles disabled state correctly", () => {
    render(<Switch disabled />);
    const switchInput = screen.getByRole("checkbox");
    expect(switchInput).toBeDisabled();
    expect(switchInput.nextElementSibling).toHaveClass("bg-gray-100");
  });

  it("applies different sizes correctly", () => {
    const { rerender } = render(<Switch size="sm" />);
    expect(screen.getByRole("checkbox").nextElementSibling).toHaveClass(
      "h-5 w-9",
    );

    rerender(<Switch size="lg" />);
    expect(screen.getByRole("checkbox").nextElementSibling).toHaveClass(
      "h-7 w-14",
    );
  });

  it("handles change events correctly", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<Switch onChange={handleChange} />);
    const switchInput = screen.getByRole("checkbox");

    await user.click(switchInput);
    expect(handleChange).toHaveBeenCalled();
    expect(switchInput).toBeChecked();

    await user.click(switchInput);
    expect(switchInput).not.toBeChecked();
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();
    render(<Switch ref={ref} />);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement));
  });

  it("combines error and helper text with correct IDs", () => {
    render(<Switch id="test" error="Error message" helperText="Helper text" />);

    const switchInput = screen.getByRole("checkbox");
    const errorMessage = screen.getByText("Error message");

    expect(switchInput).toHaveAttribute("aria-describedby", "test-error");
    expect(errorMessage).toHaveAttribute("id", "test-error");
  });
});
