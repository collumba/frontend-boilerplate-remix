import {
  ToastProvider,
  useToast,
  useToastI18n,
} from "@app/app/providers/toast-context";
import { ToastContainer } from "@app/widgets/toast";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";

// Mock for react-i18next
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, options?: Record<string, any>) => {
      if (key === "component.toast.success.title") return "Success!";
      if (key === "component.toast.error.title") return "Error!";
      if (key === "component.toast.warning.title") return "Warning!";
      if (key === "component.toast.info.title") return "Information";
      if (key === "component.toast.default.title") return "Notification";
      if (key.includes("description")) {
        if (options?.app) {
          return `Operation completed successfully in ${options.app}.`;
        }
        return "Test description";
      }
      return key;
    },
  }),
}));

// Mock para useMatches com diferentes conjuntos de dados
const mockUseMatches = vi.fn().mockReturnValue([
  {
    data: {
      toasts: [],
    },
  },
]);

// Mock for useMatches
vi.mock("@remix-run/react", () => ({
  useMatches: () => mockUseMatches(),
}));

// Test component that uses toast hooks
const TestComponent = () => {
  const { actions } = useToast();
  const toast = useToastI18n();

  return (
    <div>
      <button
        onClick={() =>
          actions.addToast({
            type: "success",
            title: "Test Success",
            description: "This is a test",
          })
        }
        data-testid="add-direct"
      >
        Add Direct Toast
      </button>

      <button
        onClick={() =>
          toast.success("component.toast.success.description", {
            app: "Test App",
          })
        }
        data-testid="add-success"
      >
        Add Success Toast
      </button>

      <button
        onClick={() => toast.error("component.toast.error.description")}
        data-testid="add-error"
      >
        Add Error Toast
      </button>
    </div>
  );
};

describe("Toast Context", () => {
  beforeEach(() => {
    // Restaurar o mock para o valor padrão antes de cada teste
    mockUseMatches.mockReturnValue([{ data: { toasts: [] } }]);
  });

  test("ToastProvider renders children correctly", () => {
    render(
      <ToastProvider>
        <div data-testid="child">Child Content</div>
      </ToastProvider>
    );

    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  test("useToast hook adds toasts correctly", async () => {
    render(
      <ToastProvider>
        <TestComponent />
        <ToastContainer />
      </ToastProvider>
    );

    // Test direct toast addition
    fireEvent.click(screen.getByTestId("add-direct"));

    await waitFor(() => {
      expect(screen.getByText("Test Success")).toBeInTheDocument();
      expect(screen.getByText("This is a test")).toBeInTheDocument();
    });
  });

  test("useToastI18n hook adds translated toasts correctly", async () => {
    render(
      <ToastProvider>
        <TestComponent />
        <ToastContainer />
      </ToastProvider>
    );

    // Test i18n toast addition
    fireEvent.click(screen.getByTestId("add-success"));

    await waitFor(() => {
      expect(screen.getByText("Success!")).toBeInTheDocument();
      expect(
        screen.getByText("Operation completed successfully in Test App.")
      ).toBeInTheDocument();
    });
  });

  test("Toast can be closed manually", async () => {
    render(
      <ToastProvider>
        <TestComponent />
        <ToastContainer />
      </ToastProvider>
    );

    // Add a toast
    fireEvent.click(screen.getByTestId("add-error"));

    // Wait for toast to appear
    await waitFor(() => {
      expect(screen.getByText("Error!")).toBeInTheDocument();
    });

    // Close the toast
    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);

    // Verify toast is removed
    await waitFor(() => {
      expect(screen.queryByText("Error!")).not.toBeInTheDocument();
    });
  });
});
