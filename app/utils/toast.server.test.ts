import { beforeEach, describe, expect, test, vi } from "vitest";

// Mock of the env module to avoid process.exit
vi.mock("env", () => ({
  env: {
    DOMAIN: "http://localhost:3000",
    NODE_ENV: "test",
  },
}));

// Mock the session module ANTES de importar o módulo toast.server
// Define the mocks inline to avoid hoisting issues
vi.mock("@app/modules/toast/session.server", () => {
  // Define the mocks inline
  const mockGet = vi.fn().mockReturnValue([]);
  const mockSet = vi.fn();
  const mockSession = { get: mockGet, set: mockSet };

  return {
    getToastSession: vi.fn().mockResolvedValue(mockSession),
    commitToastSession: vi.fn().mockResolvedValue("mock-cookie-value"),
    ToastMessage: {},
    // Export the mock functions for access in the tests
    __mocks: {
      session: mockSession,
      mockGet,
      mockSet,
    },
  };
});

// Import the sessionModule module AFTER mocking
import * as sessionModule from "@app/modules/toast/session.server";

// Now we can access the mock session object through the imported module
const mockSession = (sessionModule as any).__mocks.session;

// Import the toast.server module AFTER mocking the dependencies
import {
  jsonWithToastNotification,
  redirectWithToastNotification,
} from "./toast.server";

// Mock crypto.randomUUID
const mockUUID = "test-uuid-123";
vi.stubGlobal("crypto", {
  randomUUID: () => mockUUID,
});

describe("Toast Server Utilities", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset the get behavior for each test
    mockSession.get.mockReturnValue([]);
  });

  describe("jsonWithToastNotification", () => {
    test("should add a toast message to the session", async () => {
      const data = { testKey: "testValue" };
      const toastOptions = {
        type: "success" as const,
        title: "Test Title",
        description: "Test Description",
      };

      const result = await jsonWithToastNotification(data, toastOptions);

      // Verify mock session.set was called with correct toast data
      expect(mockSession.set).toHaveBeenCalledWith("toastMessages", [
        expect.objectContaining({
          id: mockUUID,
          type: "success",
          title: "Test Title",
          description: "Test Description",
          createdAt: expect.any(Number),
        }),
      ]);

      // Verify commitToastSession was called
      expect(sessionModule.commitToastSession).toHaveBeenCalledWith(
        mockSession
      );

      // Verify correct response was returned
      expect(result.status).toBe(200);
      expect(result.headers.get("Content-Type")).toBe(
        "application/json; charset=utf-8"
      );
      expect(result.headers.get("Set-Cookie")).toBe("mock-cookie-value");
    });

    test("should merge with existing headers", async () => {
      const data = { testKey: "testValue" };
      const toastOptions = {
        type: "error" as const,
        title: "Error Title",
      };
      const init = {
        headers: {
          "X-Custom-Header": "custom-value",
        },
        status: 201,
      };

      const result = await jsonWithToastNotification(data, toastOptions, init);

      // Verify correct response was returned with merged headers
      expect(result.status).toBe(201);
      expect(result.headers.get("X-Custom-Header")).toBe("custom-value");
      expect(result.headers.get("Set-Cookie")).toBe("mock-cookie-value");
    });
  });

  describe("redirectWithToastNotification", () => {
    test("should redirect with toast message", async () => {
      const url = "/target-url";
      const toastOptions = {
        type: "info" as const,
        title: "Info Title",
        description: "Info Description",
      };

      const result = await redirectWithToastNotification(url, toastOptions);

      // Verify mock session.set was called with correct toast data
      expect(mockSession.set).toHaveBeenCalledWith("toastMessages", [
        expect.objectContaining({
          id: mockUUID,
          type: "info",
          title: "Info Title",
          description: "Info Description",
          createdAt: expect.any(Number),
        }),
      ]);

      // Verify commitToastSession was called
      expect(sessionModule.commitToastSession).toHaveBeenCalledWith(
        mockSession
      );

      // Verify redirect was returned with correct status and headers
      expect(result.status).toBe(302);
      expect(result.headers.get("Location")).toBe("/target-url");
      expect(result.headers.get("Set-Cookie")).toBe("mock-cookie-value");
    });

    test("should merge with existing headers and use custom status", async () => {
      const url = "/target-url";
      const toastOptions = {
        type: "warning" as const,
        title: "Warning Title",
      };
      const init = {
        headers: {
          "X-Custom-Header": "custom-value",
        },
        status: 301,
      };

      const result = await redirectWithToastNotification(
        url,
        toastOptions,
        init
      );

      // Verify correct response was returned with merged headers and custom status
      expect(result.status).toBe(301);
      expect(result.headers.get("X-Custom-Header")).toBe("custom-value");
      expect(result.headers.get("Set-Cookie")).toBe("mock-cookie-value");
      expect(result.headers.get("Location")).toBe("/target-url");
    });
  });
});
