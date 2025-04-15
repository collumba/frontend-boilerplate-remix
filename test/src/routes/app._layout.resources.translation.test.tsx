// Mock of env to avoid validations
vi.mock("env", () => {
  return {
    env: {
      NODE_ENV: "test",
      API_URL: "http://localhost:3000",
      LOCALE_RESOURCES: "http://localhost:3000/locales",
    },
  };
});

// Mock for i18n on the server side
vi.mock("@/modules/i18n/i18n.server", () => ({
  default: {
    getFixedT: vi.fn().mockResolvedValue((key: string, options?: any) => {
      if (key === "component.toast.success.title") return "Success!";
      if (key === "component.toast.success.description" && options?.app) {
        return `Operation completed successfully in ${options.app}.`;
      }
      return key;
    }),
  },
}));

// Mock for jsonWithToastNotification
vi.mock("@/modules/toast/toast.server", () => ({
  jsonWithToastNotification: vi.fn().mockImplementation((data, toast) => {
    // Return a structure that mimics the jsonWithToastNotification response
    // without actually calling the real implementation that uses env.DOMAIN
    return {
      data,
      toast,
      headers: new Headers({
        "Set-Cookie": "toast-session=mocked-session-id",
      }),
    };
  }),
}));

// Mock for supportedLngsConfig
vi.mock("@/config/i18n", () => ({
  supportedLngsConfig: [
    { language: "en", flag: "US" },
    { language: "pt-BR", flag: "BR" },
    { language: "es", flag: "ES" },
  ],
}));

// Mock for toast context
const mockAddToast = vi.fn();
vi.mock("@/contexts/toast-context", () => ({
  useToast: () => ({
    actions: {
      addToast: mockAddToast,
    },
  }),
  useToastI18n: () => ({
    success: vi.fn(),
    error: vi.fn(),
    warning: vi.fn(),
    info: vi.fn(),
  }),
}));

import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";

// Mock for useTranslation
const mockChangeLanguage = vi.fn();
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      // Simulate some basic translations
      if (key === "i18n Examples") return "i18n Examples";
      if (key === "Current Language") return "Current Language";
      if (key.startsWith("locale.languages.")) {
        const lang = key.split(".")[2];
        if (lang === "en") return "English";
        if (lang === "pt-BR") return "Portuguese (Brazil)";
        if (lang === "es") return "Spanish";
      }
      return key;
    },
    i18n: {
      language: "en",
      changeLanguage: mockChangeLanguage,
    },
  }),
}));

// Import after the mocks
import TranslationExamplePage from "@/routes/app._layout.resources.translation";

describe("Translation Example Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders translation page correctly", () => {
    render(<TranslationExamplePage />);

    // Verify basic page elements
    expect(screen.getByText("i18n Examples")).toBeInTheDocument();
    expect(screen.getByText("Current Language")).toBeInTheDocument();

    // Verify that there are elements with the text "English"
    expect(screen.getAllByText("English").length).toBeGreaterThan(0);

    // The page must have a section about nomenclature
    expect(screen.getByText("Nomenclature Best Practices")).toBeInTheDocument();

    // The page must have a section about implementation
    expect(screen.getByText("Implementation Details")).toBeInTheDocument();
  });

  test("loader returns success toast with translations", async () => {
    // Import the loader directly from the module
    const { loader } = await import(
      "@/routes/app._layout.resources.translation"
    );

    // Create a request mock
    const request = new Request(
      "http://localhost:3000/app/resources/translation"
    );

    // Call the loader
    const result = await loader({ request, params: {}, context: {} });

    // Verify basic response structure
    expect(result).toHaveProperty("data");
    expect(result).toHaveProperty("toast");
  });
});
