import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Input } from "../Input";

describe("Input", () => {
  it("renders correctly with default props", () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText("Enter text");
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass("ring-gray-300");
  });

  it("renders with a label", () => {
    render(<Input label="Username" id="username" />);
    const label = screen.getByText("Username");
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute("for", "username");
  });

  it("shows error state correctly", () => {
    render(<Input error="This field is required" id="test" />);
    const input = screen.getByRole("textbox");
    const errorMessage = screen.getByText("This field is required");

    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveClass("ring-error-300");
    expect(errorMessage).toHaveClass("text-error-600");
  });

  it("shows helper text when provided", () => {
    render(<Input helperText="Must be at least 8 characters" />);
    const helperText = screen.getByText("Must be at least 8 characters");
    expect(helperText).toBeInTheDocument();
    expect(helperText).toHaveClass("text-gray-500");
  });

  it("handles disabled state correctly", () => {
    render(<Input disabled placeholder="Disabled input" />);
    const input = screen.getByPlaceholderText("Disabled input");

    expect(input).toBeDisabled();
    expect(input).toHaveClass("bg-gray-50");
  });

  it("handles different input types", () => {
    const { rerender } = render(<Input type="password" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("type", "password");

    rerender(<Input type="number" />);
    expect(screen.getByRole("spinbutton")).toHaveAttribute("type", "number");
  });

  it("handles user input correctly", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<Input onChange={handleChange} />);
    const input = screen.getByRole("textbox");

    await user.type(input, "test");
    expect(handleChange).toHaveBeenCalledTimes(4);
    expect(input).toHaveValue("test");
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();
    render(<Input ref={ref} />);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement));
  });
});
