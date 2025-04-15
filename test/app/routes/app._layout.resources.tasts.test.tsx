import { ToastProvider } from "@app/contexts/toast-context";
import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import ToastExamplePage from "./app._layout.resources.toasts";

// Mock dos módulos necessários
vi.mock("@app/utils/toast.server", () => ({
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
  Form: ({ children, ...props }: any) => <form {...props}>{children}</form>,
  useNavigation: () => ({ state: "idle" }),
}));

// Mock dos componentes UI
vi.mock("@app/components/ui/button", () => ({
  Button: ({ children, onClick, ...props }: any) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  ),
}));

vi.mock("@app/components/ui/typography", () => ({
  Typography: ({ variant, children, ...props }: any) => {
    if (variant === "h1") return <h1 {...props}>{children}</h1>;
    if (variant === "h2") return <h2 {...props}>{children}</h2>;
    return <p {...props}>{children}</p>;
  },
}));

// Mock do contexto de toast
const mockSuccess = vi.fn();
vi.mock("@app/contexts/toast-context", () => ({
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
  ToastProvider: ({ children }: any) => <div>{children}</div>,
}));

// Testes
test("renders the toast examples page correctly", () => {
  render(
    <ToastProvider>
      <ToastExamplePage />
    </ToastProvider>
  );

  // Verificamos apenas elementos básicos para evitar complexidade
  expect(screen.getByText("Toast Examples")).toBeInTheDocument();
  expect(screen.getByText("Client-side Toasts")).toBeInTheDocument();

  // Verificamos pelo menos um botão
  expect(screen.getByRole("button", { name: /Success$/i })).toBeInTheDocument();
});

test("client-side toast buttons trigger toasts", () => {
  render(<ToastExamplePage />);

  // Click em um botão de client-side toast
  const successButton = screen.getByRole("button", { name: /Success$/i });
  fireEvent.click(successButton);

  // Verifica se a função mockSuccess foi chamada
  expect(mockSuccess).toHaveBeenCalled();
});
