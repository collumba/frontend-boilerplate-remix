import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Header } from "../Header";

describe("Header", () => {
  it("renders children correctly", () => {
    render(
      <Header>
        <div>Header Content</div>
      </Header>,
    );

    expect(screen.getByText("Header Content")).toBeInTheDocument();
  });

  it("renders logo when provided", () => {
    render(
      <Header logo={<div>Logo</div>}>
        <div>Content</div>
      </Header>,
    );

    expect(screen.getByText("Logo")).toBeInTheDocument();
  });

  it("renders navigation items", () => {
    const navigation = [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
    ];

    render(
      <Header navigation={navigation}>
        <div>Content</div>
      </Header>,
    );

    expect(screen.getByText("Home")).toHaveAttribute("href", "/");
    expect(screen.getByText("About")).toHaveAttribute("href", "/about");
  });

  it("renders actions when provided", () => {
    render(
      <Header actions={<button>Sign In</button>}>
        <div>Content</div>
      </Header>,
    );

    expect(screen.getByText("Sign In")).toBeInTheDocument();
  });

  it("combines custom className with default classes", () => {
    const { container } = render(
      <Header className="custom-class">
        <div>Content</div>
      </Header>,
    );

    expect(container.firstChild).toHaveClass(
      "border-b",
      "bg-white",
      "custom-class",
    );
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(
      <Header ref={ref}>
        <div>Content</div>
      </Header>,
    );

    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});
