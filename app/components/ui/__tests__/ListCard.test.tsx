import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ListCard } from "../ListCard";

describe("ListCard", () => {
  const items = [
    { id: 1, title: "Item 1" },
    { id: 2, title: "Item 2" },
    { id: 3, title: "Item 3" },
  ];

  const renderItem = (item: (typeof items)[0]) => (
    <div key={item.id}>{item.title}</div>
  );

  it("renders items correctly", () => {
    render(
      <ListCard items={items} renderItem={renderItem}>
        <div>Content</div>
      </ListCard>,
    );

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByText("Item 3")).toBeInTheDocument();
  });

  it("renders loading state", () => {
    render(
      <ListCard items={items} renderItem={renderItem} loading>
        <div>Content</div>
      </ListCard>,
    );

    expect(screen.getByTestId("loading-skeleton")).toBeInTheDocument();
  });

  it("renders empty state when no items", () => {
    render(
      <ListCard
        items={[]}
        renderItem={renderItem}
        emptyState={<div>No items found</div>}
      >
        <div>Content</div>
      </ListCard>,
    );

    expect(screen.getByText("No items found")).toBeInTheDocument();
  });

  it("applies grid layout with correct columns", () => {
    const { container } = render(
      <ListCard
        items={items}
        renderItem={renderItem}
        layout="grid"
        cols={4}
      >
        <div>Content</div>
      </ListCard>,
    );

    expect(container.firstChild).toHaveClass(
      "grid",
      "grid-cols-1",
      "sm:grid-cols-2",
      "md:grid-cols-3",
      "lg:grid-cols-4",
    );
  });

  it("applies list layout", () => {
    const { container } = render(
      <ListCard items={items} renderItem={renderItem} layout="list">
        <div>Content</div>
      </ListCard>,
    );

    expect(container.firstChild).toHaveClass("flex", "flex-col");
  });

  it("applies gap correctly", () => {
    const { container } = render(
      <ListCard items={items} renderItem={renderItem} gap={4}>
        <div>Content</div>
      </ListCard>,
    );

    expect(container.firstChild).toHaveClass("gap-4");
  });

  it("combines custom className with default classes", () => {
    const { container } = render(
      <ListCard items={items} renderItem={renderItem} className="custom-class">
        <div>Content</div>
      </ListCard>,
    );

    expect(container.firstChild).toHaveClass("w-full", "custom-class");
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(
      <ListCard items={items} renderItem={renderItem} ref={ref}>
        <div>Content</div>
      </ListCard>,
    );

    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});
