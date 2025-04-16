
import {
  jsonWithToastNotification,
  redirectWithToastNotification,
} from "@/modules/toast/toast.server";
import { expect, test, vi } from "vitest";

// Mock modules
vi.mock("env", () => ({
  env: {
    DOMAIN: "http://localhost:3000",
    NODE_ENV: "test",
  },
}));

vi.mock("@/modules/toast/session.server", () => {
  return {
    getToastSession: vi.fn().mockResolvedValue({
      get: vi.fn().mockReturnValue([]),
      set: vi.fn(),
    }),
    commitToastSession: vi.fn().mockResolvedValue("mock-cookie-value"),
    ToastMessage: {},
  };
});

vi.mock("crypto", () => ({
  randomUUID: () => "test-id-123",
}));

// Test
test("jsonWithToastNotification works", async () => {
  // Get mock session object after calling the function
  const result = await jsonWithToastNotification(
    { data: "test" },
    { type: "success", title: "Test" }
  );

  // Check basic response properties
  expect(result.status).toBe(200);
  expect(result.headers.get("Set-Cookie")).toBe("mock-cookie-value");
});

test("redirectWithToastNotification works", async () => {
  const result = await redirectWithToastNotification("/test-path", {
    type: "error",
    title: "Error",
  });

  // Check basic response properties
  expect(result.status).toBe(302);
  expect(result.headers.get("Location")).toBe("/test-path");
  expect(result.headers.get("Set-Cookie")).toBe("mock-cookie-value");
});
