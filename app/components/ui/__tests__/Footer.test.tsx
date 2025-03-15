import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Footer } from "../Footer";

describe("Footer", () => {
  it("renders children correctly", () => {
    render(
      <Footer>
        <div>Footer Content</div>
      </Footer>,
    );

    expect(screen.getByText("Footer Content")).toBeInTheDocument();
  });

  it("renders copyright text when provided", () => {
    const currentYear = new Date().getFullYear();
    render(
      <Footer copyright="Company Name">
        <div>Content</div>
      </Footer>,
    );

    expect(
      screen.getByText(`© ${currentYear} Company Name`),
    ).toBeInTheDocument();
  });

  it("renders navigation items", () => {
    const navigation = [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ];

    render(
      <Footer navigation={navigation}>
        <div>Content</div>
      </Footer>,
    );

    expect(screen.getByText("Privacy")).toHaveAttribute("href", "/privacy");
    expect(screen.getByText("Terms")).toHaveAttribute("href", "/terms");
  });

  it("renders social links", () => {
    const socials = [
      { icon: "twitter", href: "https://twitter.com" },
      { icon: "github", href: "https://github.com" },
    ];

    render(
      <Footer socials={socials}>
        <div>Content</div>
      </Footer>,
    );

    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", "https://twitter.com");
    expect(links[1]).toHaveAttribute("href", "https://github.com");
  });

  it("combines custom className with default classes", () => {
    const { container } = render(
      <Footer className="custom-class">
        <div>Content</div>
      </Footer>,
    );

    expect(container.firstChild).toHaveClass(
      "border-t",
      "bg-white",
      "custom-class",
    );
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(
      <Footer ref={ref}>
        <div>Content</div>
      </Footer>,
    );

    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});
