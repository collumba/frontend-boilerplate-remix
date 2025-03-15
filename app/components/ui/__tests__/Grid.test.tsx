import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Grid } from "../Grid";

describe("Grid", () => {
  it("renders with default props", () => {
    render(
      <Grid>
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid>,
    );

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("applies correct column classes", () => {
    const { container } = render(
      <Grid cols={3}>
        <div>Item</div>
      </Grid>,
    );

    expect(container.firstChild).toHaveClass("grid-cols-3");
  });

  it("applies correct gap classes", () => {
    const { container } = render(
      <Grid gap={8}>
        <div>Item</div>
      </Grid>,
    );

    expect(container.firstChild).toHaveClass("gap-8");
  });

  it("applies responsive column classes", () => {
    const { container } = render(
      <Grid colsSm={2} colsMd={4} colsLg={6}>
        <div>Item</div>
      </Grid>,
    );

    expect(container.firstChild).toHaveClass(
      "sm:grid-cols-2",
      "md:grid-cols-4",
      "lg:grid-cols-6",
    );
  });

  it("combines custom className with default classes", () => {
    const { container } = render(
      <Grid className="custom-class">
        <div>Item</div>
      </Grid>,
    );

    expect(container.firstChild).toHaveClass("grid", "custom-class");
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(
      <Grid ref={ref}>
        <div>Item</div>
      </Grid>,
    );

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
