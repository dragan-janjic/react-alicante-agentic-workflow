import { describe, expect, it } from "vitest";

import { formatLevel } from "./format-level";

describe("formatLevel", () => {
  it("capitalizes beginner", () => {
    expect(formatLevel("beginner")).toBe("Beginner");
  });

  it("capitalizes intermediate", () => {
    expect(formatLevel("intermediate")).toBe("Intermediate");
  });

  it("capitalizes advanced", () => {
    expect(formatLevel("advanced")).toBe("Advanced");
  });
});
