import { ToastProvider } from "@/app/providers/toast-context";
import ToastExamplePage from "@/routes/app._layout.resources.toasts";
import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";

// Mock the necessary modules
vi.mock("@/modules/toast/toast.server", () => ({
  jsonWithToastNotification: vi
    .fn()
    .mockResolvedValue(
      new Response(JSON.stringify({ message: "Loader Response" }))
    ),
  redirectWithToastNotification: vi.fn().mockResolvedValue(
    new Response(null, {
      status: 302,
      headers: new Headers({ Location: "/app/resources/toasts" }),
    })
  ),
}));

// Mock react-i18next
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

// Mock remix hooks
vi.mock("@remix-run/react", () => ({
  Form: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => <form {...props}>{children}</form>,
  useNavigation: () => ({ state: "idle" }),
}));

// Mock UI components
vi.mock("@/components/ui/button", () => ({
  Button: ({ children, onClick, ...props }: { children: React.ReactNode; onClick: () => void; [key: string]: unknown }) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  ),
}));

vi.mock("@/components/ui/typography", () => ({
  Typography: ({ variant, children, ...props }: { variant: string; children: React.ReactNode; [key: string]: unknown }) => {
    if (variant === "h1") return <h1 {...props}>{children}</h1>;
    if (variant === "h2") return <h2 {...props}>{children}</h2>;
    return <p {...props}>{children}</p>;
  },
}));

// Mock toast context
const mockSuccess = vi.fn();
vi.mock("@/app/providers/toast-context", () => ({
  useToast: () => ({
    toasts: [],
    actions: {
      addToast: vi.fn(),
      removeToast: vi.fn(),
      clearToasts: vi.fn(),
    },
  }),
  useToastI18n: () => ({
    success: mockSuccess,
    error: vi.fn(),
    warning: vi.fn(),
    info: vi.fn(),
  }),
  ToastProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Tests
test("renders the toast examples page correctly", () => {
  render(
    <ToastProvider>
      <ToastExamplePage />
    </ToastProvider>
  );

  // We only check basic elements to avoid complexity
  expect(screen.getByText("Toast Examples")).toBeInTheDocument();
  expect(screen.getByText("Client-side Toasts")).toBeInTheDocument();

  // We check at least one button
  expect(screen.getByRole("button", { name: /Success$/i })).toBeInTheDocument();
});

test("client-side toast buttons trigger toasts", () => {
  render(<ToastExamplePage />);

  // Click on a client-side toast button
  const successButton = screen.getByRole("button", { name: /Success$/i });
  fireEvent.click(successButton);

  // Verify if the mockSuccess function was called
  expect(mockSuccess).toHaveBeenCalled();
});
