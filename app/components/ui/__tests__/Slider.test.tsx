import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Slider } from "../Slider";

describe("Slider", () => {
  const mockGetBoundingClientRect = () => ({
    width: 100,
    height: 10,
    top: 0,
    left: 0,
    bottom: 0,
    right: 100,
    x: 0,
    y: 0,
    toJSON: () => {},
  });

  beforeEach(() => {
    Element.prototype.getBoundingClientRect = vi
      .fn()
      .mockImplementation(mockGetBoundingClientRect);
  });

  it("renders correctly with default props", () => {
    render(<Slider />);
    const slider = screen.getByRole("slider");
    expect(slider).toBeInTheDocument();
    expect(slider).toHaveStyle({ width: "0%" });
  });

  it("renders with custom min, max, and value", () => {
    render(<Slider min={0} max={200} value={100} />);
    const slider = screen.getByRole("slider");
    expect(slider).toHaveStyle({ width: "50%" });
  });

  it("applies different sizes correctly", () => {
    const { rerender } = render(<Slider size="sm" />);
    expect(screen.getByRole("slider").parentElement).toHaveClass("h-1");

    rerender(<Slider size="lg" />);
    expect(screen.getByRole("slider").parentElement).toHaveClass("h-3");
  });

  it("handles mouse interactions correctly", () => {
    const onChange = vi.fn();
    render(<Slider onChange={onChange} />);

    const track = screen.getByRole("slider").parentElement;
    fireEvent.mouseDown(track, { clientX: 50 });

    expect(onChange).toHaveBeenCalledWith(50);
  });

  it("shows tooltip when enabled", () => {
    render(<Slider showTooltip value={50} />);
    expect(screen.getByText("50")).toBeInTheDocument();
  });

  it("formats tooltip value correctly", () => {
    render(
      <Slider showTooltip value={50} formatTooltip={(value) => `${value}%`} />,
    );
    expect(screen.getByText("50%")).toBeInTheDocument();
  });

  it("handles disabled state correctly", () => {
    const onChange = vi.fn();
    render(<Slider disabled onChange={onChange} />);

    const track = screen.getByRole("slider").parentElement;
    fireEvent.mouseDown(track, { clientX: 50 });

    expect(onChange).not.toHaveBeenCalled();
    expect(track.parentElement).toHaveClass("opacity-50", "cursor-not-allowed");
  });

  it("updates value when controlled", () => {
    const { rerender } = render(<Slider value={25} />);
    expect(screen.getByRole("slider")).toHaveStyle({ width: "25%" });

    rerender(<Slider value={75} />);
    expect(screen.getByRole("slider")).toHaveStyle({ width: "75%" });
  });

  it("clamps value between min and max", () => {
    const onChange = vi.fn();
    render(<Slider min={0} max={100} onChange={onChange} />);

    const track = screen.getByRole("slider").parentElement;
    fireEvent.mouseDown(track, { clientX: 150 });

    expect(onChange).toHaveBeenCalledWith(100);
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();
    render(<Slider ref={ref} />);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });
});
