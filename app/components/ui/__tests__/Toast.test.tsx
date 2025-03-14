import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Toast, ToastProvider, useToast } from "../Toast";

const TestComponent = () => {
  const { show, close } = useToast();

  return (
    <div>
      <button
        onClick={() =>
          show({ title: "Test Toast", description: "Test Description" })
        }
      >
        Show Toast
      </button>
      <button onClick={close}>Close Toast</button>
    </div>
  );
};

describe("Toast Component", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("renders toast when show is called", async () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>,
    );

    const showButton = screen.getByText("Show Toast");
    await userEvent.click(showButton);

    expect(screen.getByText("Test Toast")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("closes toast when close is called", async () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>,
    );

    const showButton = screen.getByText("Show Toast");
    await userEvent.click(showButton);

    const closeButton = screen.getByText("Close Toast");
    await userEvent.click(closeButton);

    expect(screen.queryByText("Test Toast")).not.toBeInTheDocument();
  });

  it("auto-closes after duration", async () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>,
    );

    const showButton = screen.getByText("Show Toast");
    await userEvent.click(showButton);

    expect(screen.getByText("Test Toast")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(5000); // Default duration
    });

    expect(screen.queryByText("Test Toast")).not.toBeInTheDocument();
  });

  it("renders with different variants", async () => {
    const { rerender } = render(
      <Toast
        isOpen={true}
        title="Test Toast"
        description="Test Description"
        variant="success"
        onClose={() => {}}
      />,
    );

    expect(screen.getByText("Test Toast")).toHaveClass("bg-green-100");

    rerender(
      <Toast
        isOpen={true}
        title="Test Toast"
        description="Test Description"
        variant="error"
        onClose={() => {}}
      />,
    );

    expect(screen.getByText("Test Toast")).toHaveClass("bg-red-100");
  });

  it("renders progress bar when showProgress is true", () => {
    render(
      <Toast
        isOpen={true}
        title="Test Toast"
        description="Test Description"
        showProgress={true}
        onClose={() => {}}
      />,
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});
