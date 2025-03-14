import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Card, CardContent, CardFooter, CardHeader } from "../Card";

describe("Card", () => {
  it("renders correctly with default props", () => {
    render(<Card>Card content</Card>);
    const card = screen.getByText("Card content");
    expect(card.parentElement).toHaveClass("border border-gray-200", "p-4");
  });

  it("applies different variants correctly", () => {
    const { rerender } = render(<Card variant="bordered">Card</Card>);
    expect(screen.getByText("Card").parentElement).toHaveClass(
      "border-2 border-gray-300",
    );

    rerender(<Card variant="elevated">Card</Card>);
    expect(screen.getByText("Card").parentElement).toHaveClass("shadow-lg");
  });

  it("applies different padding sizes correctly", () => {
    const { rerender } = render(<Card padding="sm">Card</Card>);
    expect(screen.getByText("Card").parentElement).toHaveClass("p-3");

    rerender(<Card padding="lg">Card</Card>);
    expect(screen.getByText("Card").parentElement).toHaveClass("p-6");

    rerender(<Card padding="none">Card</Card>);
    expect(screen.getByText("Card").parentElement).toHaveClass("p-0");
  });

  it("applies hoverable styles when isHoverable is true", () => {
    render(<Card isHoverable>Card</Card>);
    expect(screen.getByText("Card").parentElement).toHaveClass(
      "hover:shadow-md",
    );
  });

  it("applies clickable styles when isClickable is true", () => {
    render(<Card isClickable>Card</Card>);
    expect(screen.getByText("Card").parentElement).toHaveClass(
      "cursor-pointer",
    );
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();
    render(<Card ref={ref}>Card</Card>);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });
});

describe("CardHeader", () => {
  it("renders title and subtitle correctly", () => {
    render(<CardHeader title="Card Title" subtitle="Card Subtitle" />);

    expect(screen.getByText("Card Title")).toHaveClass("text-lg font-medium");
    expect(screen.getByText("Card Subtitle")).toHaveClass(
      "text-sm text-gray-500",
    );
  });

  it("renders action element when provided", () => {
    const action = <button>Action</button>;
    render(<CardHeader title="Title" action={action} />);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});

describe("CardContent", () => {
  it("renders content with correct styles", () => {
    render(<CardContent>Content</CardContent>);
    expect(screen.getByText("Content")).toHaveClass("text-sm text-gray-500");
  });
});

describe("CardFooter", () => {
  it("renders footer with correct styles", () => {
    render(<CardFooter>Footer content</CardFooter>);
    const footer = screen.getByText("Footer content");
    expect(footer.parentElement).toHaveClass("border-t", "pt-4", "mt-4");
  });
});

describe("Card composition", () => {
  it("renders all parts together correctly", () => {
    render(
      <Card>
        <CardHeader title="Title" subtitle="Subtitle" />
        <CardContent>Content</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>,
    );

    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Subtitle")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });
});
