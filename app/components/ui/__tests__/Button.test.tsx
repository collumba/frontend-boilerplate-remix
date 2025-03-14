import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "../Button";

describe("Button", () => {
  it("renders correctly with default props", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-primary-600");
  });

  it("applies different variants correctly", () => {
    const { rerender } = render(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-secondary-200");

    rerender(<Button variant="link">Link</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-transparent");
  });

  it("applies different sizes correctly", () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    expect(screen.getByRole("button")).toHaveClass("px-3 py-1.5 text-sm");

    rerender(<Button size="lg">Large</Button>);
    expect(screen.getByRole("button")).toHaveClass("px-6 py-3 text-lg");
  });

  it("shows loading state correctly", () => {
    render(<Button isLoading>Loading</Button>);
    expect(screen.getByRole("button")).toHaveClass("opacity-70");
    expect(screen.getByRole("button")).toBeDisabled();
    expect(screen.getByTitle("Loading")).toBeInTheDocument();
  });

  it("handles click events when not disabled or loading", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Click me</Button>);
    const button = screen.getByRole("button");

    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not handle click events when disabled", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(
      <Button disabled onClick={handleClick}>
        Click me
      </Button>,
    );
    const button = screen.getByRole("button");

    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("renders with icons correctly", () => {
    const icon = <span data-testid="test-icon">icon</span>;

    render(
      <Button leftIcon={icon} rightIcon={icon}>
        With Icons
      </Button>,
    );

    const icons = screen.getAllByTestId("test-icon");
    expect(icons).toHaveLength(2);
    expect(icons[0].parentElement).toHaveClass("mr-2");
    expect(icons[1].parentElement).toHaveClass("ml-2");
  });
});
