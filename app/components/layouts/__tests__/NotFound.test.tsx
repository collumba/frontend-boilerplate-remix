import { render, screen } from "@testing-library/react";
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import { NotFoundLayout } from "../NotFound";

// Mock i18n
i18next.init({
  lng: "en",
  resources: {
    en: {
      translation: {
        "notFound.title": "Page not found",
        "notFound.description": "Sorry, we couldn't find the page you're looking for.",
        "notFound.action": "Go back home"
      }
    }
  }
});

const renderNotFound = () => {
  return render(
    <I18nextProvider i18n={i18next}>
      <MemoryRouter>
        <NotFoundLayout />
      </MemoryRouter>
    </I18nextProvider>
  );
};

describe("NotFoundLayout", () => {
  beforeEach(() => {
    // Reset i18next instance before each test
    i18next.changeLanguage("en");
  });

  it("should render the component correctly", () => {
    renderNotFound();
    
    // Check if title and description are present
    expect(screen.getByText("Page not found")).toBeInTheDocument();
    expect(screen.getByText("Sorry, we couldn't find the page you're looking for.")).toBeInTheDocument();
  });

  it("should have a link to home page", () => {
    renderNotFound();
    
    const link = screen.getByRole("link", { name: "Go back home" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });

  it("should render the expand icon", () => {
    renderNotFound();
    
    const icon = screen.getByRole("icon");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("h-10", "w-10", "text-gray-400");
  });
}); 