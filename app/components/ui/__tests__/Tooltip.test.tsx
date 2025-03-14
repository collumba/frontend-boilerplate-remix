import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Tooltip } from "../Tooltip";

describe("Tooltip", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it("renders trigger element without tooltip initially", () => {
    render(
      <Tooltip content="Tooltip content">
        <button>Hover me</button>
      </Tooltip>,
    );

    expect(screen.getByText("Hover me")).toBeInTheDocument();
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("shows tooltip on hover", async () => {
    render(
      <Tooltip content="Tooltip content">
        <button>Hover me</button>
      </Tooltip>,
    );

    fireEvent.mouseEnter(screen.getByText("Hover me"));
    act(() => {
      vi.runAllTimers();
    });

    expect(screen.getByRole("tooltip")).toBeInTheDocument();
    expect(screen.getByText("Tooltip content")).toBeInTheDocument();
  });

  it("hides tooltip on mouse leave", async () => {
    render(
      <Tooltip content="Tooltip content">
        <button>Hover me</button>
      </Tooltip>,
    );

    const trigger = screen.getByText("Hover me");
    fireEvent.mouseEnter(trigger);
    act(() => {
      vi.runAllTimers();
    });

    fireEvent.mouseLeave(trigger);
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("respects delay prop", () => {
    render(
      <Tooltip content="Tooltip content" delay={1000}>
        <button>Hover me</button>
      </Tooltip>,
    );

    fireEvent.mouseEnter(screen.getByText("Hover me"));
    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(screen.getByRole("tooltip")).toBeInTheDocument();
  });

  it("does not show tooltip when disabled", () => {
    render(
      <Tooltip content="Tooltip content" disabled>
        <button>Hover me</button>
      </Tooltip>,
    );

    fireEvent.mouseEnter(screen.getByText("Hover me"));
    act(() => {
      vi.runAllTimers();
    });

    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("shows tooltip on focus and hides on blur", () => {
    render(
      <Tooltip content="Tooltip content">
        <button>Focus me</button>
      </Tooltip>,
    );

    const trigger = screen.getByText("Focus me");
    fireEvent.focus(trigger);
    act(() => {
      vi.runAllTimers();
    });

    expect(screen.getByRole("tooltip")).toBeInTheDocument();

    fireEvent.blur(trigger);
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("applies custom className to tooltip", () => {
    render(
      <Tooltip content="Tooltip content" className="custom-class">
        <button>Hover me</button>
      </Tooltip>,
    );

    fireEvent.mouseEnter(screen.getByText("Hover me"));
    act(() => {
      vi.runAllTimers();
    });

    expect(screen.getByRole("tooltip")).toHaveClass("custom-class");
  });

  it("renders arrow when arrow prop is true", () => {
    render(
      <Tooltip content="Tooltip content" arrow>
        <button>Hover me</button>
      </Tooltip>,
    );

    fireEvent.mouseEnter(screen.getByText("Hover me"));
    act(() => {
      vi.runAllTimers();
    });

    expect(
      screen.getByRole("tooltip").querySelector(".border-4"),
    ).toBeInTheDocument();
  });

  it("does not render arrow when arrow prop is false", () => {
    render(
      <Tooltip content="Tooltip content" arrow={false}>
        <button>Hover me</button>
      </Tooltip>,
    );

    fireEvent.mouseEnter(screen.getByText("Hover me"));
    act(() => {
      vi.runAllTimers();
    });

    expect(
      screen.getByRole("tooltip").querySelector(".border-4"),
    ).not.toBeInTheDocument();
  });
});
