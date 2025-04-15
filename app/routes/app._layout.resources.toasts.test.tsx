import { ToastProvider } from "@app/contexts/toast-context";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, MockInstance, test, vi } from "vitest";
import ToastExamplePage, {
  action,
  loader,
} from "./app._layout.resources.toasts";

// Definindo tipagem para os mocks
interface MockedToastUtils {
  jsonWithToastNotification: MockInstance;
  redirectWithToastNotification: MockInstance;
}

// Mock the toast server utilities
vi.mock(
  "@app/utils/toast.server",
  (): MockedToastUtils => ({
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
  })
);

// Importando o módulo mockado com tipagem correta
const mockedToastModule = vi.mocked(
  await import("@app/utils/toast.server")
) as unknown as MockedToastUtils;

// Mock react-i18next
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      // Retorna o próprio texto quando é um ID de tradução, ou o valor padrão
      return key.includes(".") ? key : key;
    },
  }),
}));

// Mock remix hooks com implementação mais completa
vi.mock("@remix-run/react", () => ({
  Form: ({ children, ...props }: any) => <form {...props}>{children}</form>,
  useNavigation: () => ({ state: "idle" }),
  // Adicione outros hooks conforme necessário
}));

// Mock the ui components com implementação mais precisa
vi.mock("@app/components/ui/button", () => ({
  Button: ({
    children,
    onClick,
    type = "button",
    variant = "default",
    ...props
  }: any) => (
    <button onClick={onClick} type={type} data-variant={variant} {...props}>
      {children}
    </button>
  ),
}));

vi.mock("@app/components/ui/typography", () => ({
  Typography: ({ variant = "p", children, ...props }: any) => {
    // Retorna o elemento HTML apropriado baseado na variante
    const Component = variant.startsWith("h") ? variant : "p";
    return (
      <Component data-variant={variant} {...props}>
        {children}
      </Component>
    );
  },
}));

// Definindo valores de mock globais para o useToast hook
const mockAddToast = vi.fn();
const mockSuccess = vi.fn();
const mockError = vi.fn();
const mockWarning = vi.fn();
const mockInfo = vi.fn();

// Mock toast context antes de cada teste - IMPORTANTE: Não usar arrow function para vi.mock
vi.mock("@app/contexts/toast-context", () => {
  return {
    useToast: () => ({
      toasts: [],
      actions: {
        addToast: mockAddToast,
        removeToast: vi.fn(),
        clearToasts: vi.fn(),
      },
    }),
    useToastI18n: () => ({
      success: mockSuccess,
      error: mockError,
      warning: mockWarning,
      info: mockInfo,
    }),
    ToastProvider: ({ children }: any) => <div>{children}</div>,
  };
});

describe("Toast Example Page", () => {
  beforeEach(() => {
    // Reset dos mocks antes de cada teste
    vi.clearAllMocks();
  });

  test("renders the toast examples page correctly", () => {
    render(
      <ToastProvider>
        <ToastExamplePage />
      </ToastProvider>
    );

    // Check headings
    expect(screen.getByText("Toast Examples")).toBeInTheDocument();
    expect(screen.getByText("Client-side Toasts")).toBeInTheDocument();

    // Para textos que podem estar em diferentes elementos, usamos getByText com uma função
    expect(screen.getByText(/server-side toasts/i)).toBeInTheDocument();

    // Check buttons using more específico roles e queries
    expect(
      screen.getByRole("button", { name: /Success$/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Error/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Warning/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Info/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Default/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Action with Toast/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Loader with Toast/i })
    ).toBeInTheDocument();
  });

  test("loader function uses jsonWithToastNotification", async () => {
    await loader();

    // Verifica se a função foi chamada com os argumentos corretos
    expect(mockedToastModule.jsonWithToastNotification).toHaveBeenCalledWith(
      { message: "Loader Response" },
      {
        type: "success",
        title: "Server Toast",
        description: "This toast was sent through the loader",
      }
    );
  });

  test("action function uses redirectWithToastNotification", async () => {
    await action();

    // Verifica se a função foi chamada com os argumentos corretos
    expect(
      mockedToastModule.redirectWithToastNotification
    ).toHaveBeenCalledWith("/app/resources/toasts", {
      type: "success",
      title: "Server Toast",
      description: "This toast was sent through the action",
    });
  });

  test("client-side toast buttons trigger toasts", async () => {
    render(<ToastExamplePage />);

    // Click em um botão de client-side toast
    const successButton = screen.getByRole("button", { name: /Success$/i });
    fireEvent.click(successButton);

    // Verifica se a função mockSuccess foi chamada
    expect(mockSuccess).toHaveBeenCalledWith(
      "component.toast.success.description",
      { app: "Remix" }
    );
  });
});
