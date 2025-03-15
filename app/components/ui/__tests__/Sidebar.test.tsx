import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Sidebar } from "../Sidebar";

describe("Sidebar", () => {
  it("renders children correctly", () => {
    render(
      <Sidebar>
        <div>Sidebar Content</div>
      </Sidebar>,
    );

    expect(screen.getByText("Sidebar Content")).toBeInTheDocument();
  });

  it("renders navigation items", () => {
    const navigation = [
      { label: "Dashboard", href: "/dashboard", icon: "home" },
      { label: "Settings", href: "/settings", icon: "settings" },
    ];

    render(
      <Sidebar navigation={navigation}>
        <div>Content</div>
      </Sidebar>,
    );

    expect(screen.getByText("Dashboard")).toHaveAttribute("href", "/dashboard");
    expect(screen.getByText("Settings")).toHaveAttribute("href", "/settings");
  });

  it("renders footer content when provided", () => {
    render(
      <Sidebar footer={<div>Footer Content</div>}>
        <div>Content</div>
      </Sidebar>,
    );

    expect(screen.getByText("Footer Content")).toBeInTheDocument();
  });

  it("renders header content when provided", () => {
    render(
      <Sidebar header={<div>Header Content</div>}>
        <div>Content</div>
      </Sidebar>,
    );

    expect(screen.getByText("Header Content")).toBeInTheDocument();
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
