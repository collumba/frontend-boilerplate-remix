import { describe, expect, it } from "vitest";

describe("format", () => {
  it("should format date correctly", () => {
    const date = new Date("2024-03-14");
    const formattedDate = date.toLocaleDateString("pt-BR");
    expect(formattedDate).toBe("14/03/2024");
  });

  it("should handle invalid dates", () => {
    const invalidDate = new Date("invalid");
    expect(isNaN(invalidDate.getTime())).toBe(true);
  });
});
