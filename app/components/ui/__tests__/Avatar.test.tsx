import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Avatar } from "../Avatar";

describe("Avatar", () => {
  it("renders correctly with image src", () => {
    render(<Avatar src="/test-image.jpg" alt="Test User" />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "/test-image.jpg");
    expect(img).toHaveAttribute("alt", "Test User");
  });

  it("renders fallback with initials when no src provided", () => {
    render(<Avatar alt="John Doe" />);
    const fallback = screen.getByText("JD");
    expect(fallback).toBeInTheDocument();
  });

  it("renders custom fallback text when provided", () => {
    render(<Avatar fallback="AB" />);
    const fallback = screen.getByText("AB");
    expect(fallback).toBeInTheDocument();
  });

  it("applies different sizes correctly", () => {
    const { rerender } = render(<Avatar size="sm" alt="Test" />);
    expect(screen.getByLabelText("Test")).toHaveClass("h-8", "w-8");

    rerender(<Avatar size="lg" alt="Test" />);
    expect(screen.getByLabelText("Test")).toHaveClass("h-12", "w-12");
  });

  it("applies different variants correctly", () => {
    const { rerender } = render(<Avatar variant="circle" alt="Test" />);
    expect(screen.getByLabelText("Test")).toHaveClass("rounded-full");

    rerender(<Avatar variant="square" alt="Test" />);
    expect(screen.getByLabelText("Test")).toHaveClass("rounded-md");
  });

  it("renders status indicator when status is provided", () => {
    const { rerender } = render(<Avatar status="online" alt="Test" />);
    expect(screen.getByLabelText("Test").nextSibling).toHaveClass(
      "bg-success-500",
    );

    rerender(<Avatar status="busy" alt="Test" />);
    expect(screen.getByLabelText("Test").nextSibling).toHaveClass(
      "bg-error-500",
    );
  });

  it("generates correct initials from single word", () => {
    render(<Avatar alt="John" />);
    const fallback = screen.getByText("JO");
    expect(fallback).toBeInTheDocument();
  });

  it("generates correct initials from multiple words", () => {
    render(<Avatar alt="John Middle Doe" />);
    const fallback = screen.getByText("JD");
    expect(fallback).toBeInTheDocument();
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();
    render(<Avatar ref={ref} alt="Test" />);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });

  it("combines custom className with default styles", () => {
    render(<Avatar className="custom-class" alt="Test" />);
    const avatar = screen.getByLabelText("Test").parentElement;
    expect(avatar).toHaveClass("custom-class");
    expect(avatar).toHaveClass("relative", "inline-block"); // Default styles
  });
});
