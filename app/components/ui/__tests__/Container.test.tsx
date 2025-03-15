import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Container } from "../Container";

describe("Container", () => {
  it("renders children correctly", () => {
    render(
      <Container>
        <div>Content</div>
      </Container>,
    );

    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("applies correct size classes", () => {
    const sizes = ["sm", "md", "lg", "xl", "2xl", "full"] as const;

    sizes.forEach((size) => {
      const { container } = render(
        <Container size={size}>
          <div>Content</div>
        </Container>,
      );

      if (size === "full") {
        expect(container.firstChild).toHaveClass("max-w-none");
      } else {
        expect(container.firstChild).toHaveClass(`max-w-screen-${size}`);
      }
    });
  });

  it("applies padding classes when padding is true", () => {
    const { container } = render(
      <Container padding>
        <div>Content</div>
      </Container>,
    );

    expect(container.firstChild).toHaveClass("px-4", "sm:px-6", "lg:px-8");
  });

  it("does not apply padding classes when padding is false", () => {
    const { container } = render(
      <Container padding={false}>
        <div>Content</div>
      </Container>,
    );

    expect(container.firstChild).not.toHaveClass("px-4", "sm:px-6", "lg:px-8");
  });

  it("combines custom className with default classes", () => {
    const { container } = render(
      <Container className="custom-class">
        <div>Content</div>
      </Container>,
    );

    expect(container.firstChild).toHaveClass(
      "mx-auto",
      "w-full",
      "custom-class",
    );
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(
      <Container ref={ref}>
        <div>Content</div>
      </Container>,
    );

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
