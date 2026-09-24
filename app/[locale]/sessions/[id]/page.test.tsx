import { describe, expect, it, vi } from "vitest";

import { render, screen } from "@/tests/utils/render";
import { fetchSessionById } from "@/services/sessions";
import type { Session } from "@/types/session";

import SessionDetailPage from "./page";

vi.mock("@/services/sessions", () => ({
  fetchSessionById: vi.fn(),
  fetchSessions: vi.fn(),
}));

vi.mock("next/navigation", async (importOriginal) => {
  const actual = await importOriginal<typeof import("next/navigation")>();
  return {
    ...actual,
    notFound: vi.fn(() => {
      throw new Error("NEXT_NOT_FOUND");
    }),
  };
});

const session: Session = {
  id: "opening-keynote",
  title: "Opening Keynote",
  speaker: "Marta Fernandez",
  track: "React",
  level: "beginner",
  room: "Main Hall",
  startTime: "09:00",
  durationMinutes: 45,
  description: "Where React is headed.",
};

describe("SessionDetailPage", () => {
  it("shows the track and the level as separate badges", async () => {
    vi.mocked(fetchSessionById).mockResolvedValue(session);

    const ui = await SessionDetailPage({
      params: Promise.resolve({ id: "opening-keynote" }),
    });
    render(ui);

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Beginner")).toBeInTheDocument();
  });

  it("calls notFound when no session matches the id", async () => {
    vi.mocked(fetchSessionById).mockResolvedValue(null);

    await expect(
      SessionDetailPage({ params: Promise.resolve({ id: "missing" }) }),
    ).rejects.toThrow();
  });
});
