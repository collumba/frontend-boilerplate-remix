import { ToastContainer } from "@app/components/toast-container";
import { ToastContext } from "@app/contexts/toast-context";
import { ToastMessage } from "@app/modules/toast/session.server";
import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

// Mock useToast hook context
const mockRemoveToast = vi.fn();

const createMockToastContext = (toasts: ToastMessage[] = []) => ({
  toasts,
  actions: {
    addToast: vi.fn(),
    removeToast: mockRemoveToast,
    clearToasts: vi.fn(),
  },
});

describe("ToastContainer Component", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mockRemoveToast.mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test("should render nothing when there are no toasts", () => {
    render(
      <ToastContext.Provider value={createMockToastContext()}>
        <ToastContainer />
      </ToastContext.Provider>
    );

    expect(
      screen.queryByText(/success|error|warning|info/i)
    ).not.toBeInTheDocument();
  });

  test("should render toasts correctly", () => {
    const mockToasts: ToastMessage[] = [
      {
        id: "1",
        type: "success",
        title: "Success Toast",
        description: "This is a success message",
        createdAt: Date.now(),
      },
      {
        id: "2",
        type: "error",
        title: "Error Toast",
        description: "This is an error message",
        createdAt: Date.now(),
      },
    ];

    render(
      <ToastContext.Provider value={createMockToastContext(mockToasts)}>
        <ToastContainer />
      </ToastContext.Provider>
    );

    expect(screen.getByText("Success Toast")).toBeInTheDocument();
    expect(screen.getByText("This is a success message")).toBeInTheDocument();
    expect(screen.getByText("Error Toast")).toBeInTheDocument();
    expect(screen.getByText("This is an error message")).toBeInTheDocument();
  });

  test("should render toasts without description", () => {
    const mockToasts: ToastMessage[] = [
      {
        id: "1",
        type: "warning",
        title: "Warning Toast",
        createdAt: Date.now(),
      },
    ];

    render(
      <ToastContext.Provider value={createMockToastContext(mockToasts)}>
        <ToastContainer />
      </ToastContext.Provider>
    );

    expect(screen.getByText("Warning Toast")).toBeInTheDocument();
  });

  test("should auto-remove toasts after timeout", () => {
    const mockToasts: ToastMessage[] = [
      {
        id: "1",
        type: "info",
        title: "Info Toast",
        createdAt: Date.now(),
      },
    ];

    render(
      <ToastContext.Provider value={createMockToastContext(mockToasts)}>
        <ToastContainer />
      </ToastContext.Provider>
    );

    // Fast-forward time by the toast timeout (5000ms)
    act(() => {
      vi.advanceTimersByTime(5000);
    });

    // Check if removeToast was called for the toast
    expect(mockRemoveToast).toHaveBeenCalledWith("1");
  });
});
