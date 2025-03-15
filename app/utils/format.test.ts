import { describe, expect, it } from "vitest";

describe("format", () => {
  it("should format date correctly", () => {
    const date = new Date(2024, 2, 14); // Month is 0-based, so 2 = March
    const formattedDate = date.toLocaleDateString("pt-BR");
    expect(formattedDate).toBe("14/03/2024");
  });

  it("should handle invalid dates", () => {
    const date = new Date("invalid");
    const formattedDate = date.toLocaleDateString("pt-BR");
    expect(formattedDate).toBe("Invalid Date");
  });
});
