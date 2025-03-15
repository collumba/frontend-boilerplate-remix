import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Select } from "../Select";

const mockOptions = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3", disabled: true },
];

describe("Select", () => {
  it("renders correctly with default props", () => {
    render(<Select options={mockOptions} />);
    const select = screen.getByRole("combobox");
    const options = screen.getAllByRole("option");

    expect(select).toBeInTheDocument();
    expect(options).toHaveLength(3);
    expect(options[0]).toHaveTextContent("Option 1");
  });

  it("renders with a label", () => {
    render(
      <Select
        options={mockOptions}
        label="Select an option"
        id="test-select"
      />,
    );
    const label = screen.getByText("Select an option");

    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute("for", "test-select");
  });

  it("shows error state correctly", () => {
    render(
      <Select
        options={mockOptions}
        error="Please select an option"
        id="test"
      />,
    );
    const select = screen.getByRole("combobox");
    const errorMessage = screen.getByText("Please select an option");

    expect(select).toHaveAttribute("aria-invalid", "true");
    expect(select).toHaveClass("ring-error-300");
    expect(errorMessage).toHaveClass("text-error-600");
  });

  it("shows helper text when provided", () => {
    render(<Select options={mockOptions} helperText="Choose wisely" />);
    const helperText = screen.getByText("Choose wisely");

    expect(helperText).toBeInTheDocument();
    expect(helperText).toHaveClass("text-gray-500");
  });

  it("handles disabled state correctly", () => {
    render(<Select options={mockOptions} disabled />);
    const select = screen.getByRole("combobox");

    expect(select).toBeDisabled();
    expect(select).toHaveClass("bg-gray-50");
  });
  it("renders placeholder when provided", () => {
    render(<Select options={[{ value: "", label: "Select an option" }, ...mockOptions]} />);
    const placeholder = screen.getByText("Select an option");

    expect(placeholder).toBeInTheDocument();
    expect(placeholder.parentElement).toHaveAttribute("value", "");
    expect(placeholder.parentElement).toBeDisabled();
  });

  it("handles disabled options correctly", () => {
    render(<Select options={mockOptions} />);
    const disabledOption = screen.getByText("Option 3");

    expect(disabledOption.parentElement).toBeDisabled();
  });

  it("handles change events correctly", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<Select options={mockOptions} onChange={handleChange} />);
    const select = screen.getByRole("combobox");

    await user.selectOptions(select, "option2");
    expect(handleChange).toHaveBeenCalled();
    expect(select).toHaveValue("option2");
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();
    render(<Select ref={ref} options={mockOptions} />);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLSelectElement));
  });
});
