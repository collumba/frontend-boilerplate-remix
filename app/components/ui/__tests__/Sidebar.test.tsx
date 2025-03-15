import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Sidebar } from "../Sidebar";

describe("Sidebar", () => {
  it("renders children correctly", () => {
    render(
      <Sidebar>
        <div>Content</div>
      </Sidebar>,
    );

    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("renders navigation items", () => {
    const items = [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Settings", href: "/settings" },
    ];

    render(<Sidebar items={items} />);

    const sidebarItems = screen.getAllByTestId("sidebar-item");
    expect(sidebarItems).toHaveLength(2);
    expect(sidebarItems[0]).toHaveTextContent("Dashboard");
    expect(sidebarItems[1]).toHaveTextContent("Settings");
  });

  it("renders header content when provided", () => {
    render(
      <Sidebar headerContent={<div>Header Content</div>}>
        <div>Content</div>
      </Sidebar>,
    );

    const headerContent = screen.getByTestId("sidebar-header");
    expect(headerContent).toBeInTheDocument();
    expect(headerContent).toHaveTextContent("Header Content");
  });

  it("renders footer content when provided", () => {
    render(
      <Sidebar footerContent={<div>Footer Content</div>}>
        <div>Content</div>
      </Sidebar>,
    );

    const footerContent = screen.getByTestId("sidebar-footer");
    expect(footerContent).toBeInTheDocument();
    expect(footerContent).toHaveTextContent("Footer Content");
  });

  it("combines custom className with default classes", () => {
    const { container } = render(
      <Sidebar className="custom-class">
        <div>Content</div>
      </Sidebar>,
    );

    expect(container.firstChild).toHaveClass(
      "flex",
      "h-screen",
      "flex-col",
      "border-r",
      "bg-white",
      "custom-class",
    );
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(
      <Sidebar ref={ref}>
        <div>Content</div>
      </Sidebar>,
    );

    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});
