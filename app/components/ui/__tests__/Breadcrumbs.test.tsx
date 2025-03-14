import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Breadcrumbs } from "../Breadcrumbs";

describe("Breadcrumbs", () => {
  const defaultItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Categories" },
  ];

  it("renders correctly with default props", () => {
    render(<Breadcrumbs items={defaultItems} />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("Categories")).toBeInTheDocument();
    expect(screen.getAllByText("/")).toHaveLength(2);
  });

  it("renders custom separator", () => {
    render(<Breadcrumbs items={defaultItems} separator=">" />);
    expect(screen.getAllByText(">")).toHaveLength(2);
  });

  it("truncates items when maxItems is set", () => {
    const items = [
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" },
      { label: "Electronics", href: "/products/electronics" },
      { label: "Computers", href: "/products/electronics/computers" },
      { label: "Laptops" },
    ];

    render(<Breadcrumbs items={items} maxItems={3} />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("...")).toBeInTheDocument();
    expect(screen.getByText("Laptops")).toBeInTheDocument();
    expect(screen.queryByText("Electronics")).not.toBeInTheDocument();
  });

  it("applies custom class names", () => {
    render(
      <Breadcrumbs
        items={defaultItems}
        itemClassName="custom-item"
        activeItemClassName="custom-active"
        separatorClassName="custom-separator"
      />,
    );

    expect(screen.getByText("Home").parentElement).toHaveClass("custom-item");
    expect(screen.getByText("Categories")).toHaveClass("custom-active");
    expect(screen.getAllByText("/")[0]).toHaveClass("custom-separator");
  });

  it("renders items with icons", () => {
    const itemsWithIcons = [
      {
        label: "Home",
        href: "/",
        icon: <span data-testid="home-icon">🏠</span>,
      },
      {
        label: "Settings",
        icon: <span data-testid="settings-icon">⚙️</span>,
      },
    ];

    render(<Breadcrumbs items={itemsWithIcons} />);

    expect(screen.getByTestId("home-icon")).toBeInTheDocument();
    expect(screen.getByTestId("settings-icon")).toBeInTheDocument();
  });

  it("renders links for items with href", () => {
    render(<Breadcrumbs items={defaultItems} />);

    const homeLink = screen.getByText("Home").closest("a");
    const productsLink = screen.getByText("Products").closest("a");
    const categories = screen.getByText("Categories");

    expect(homeLink).toHaveAttribute("href", "/");
    expect(productsLink).toHaveAttribute("href", "/products");
    expect(categories.tagName).toBe("SPAN");
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();
    render(<Breadcrumbs ref={ref} items={defaultItems} />);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement));
  });
});
