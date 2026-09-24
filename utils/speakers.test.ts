import { describe, expect, it } from "vitest";

import type { Session } from "@/types/session";

import { groupSessionsBySpeaker } from "./speakers";

function session(overrides: Partial<Session> = {}): Session {
  return {
    id: "a-session",
    title: "A session",
    speaker: "A speaker",
    track: "React",
    level: "beginner",
    room: "Main Hall",
    startTime: "09:00",
    durationMinutes: 45,
    description: "",
    ...overrides,
  };
}

describe("groupSessionsBySpeaker", () => {
  it("groups sessions under their speaker", () => {
    const groups = groupSessionsBySpeaker([
      session({ id: "s1", title: "Session One", speaker: "Marta Fernandez" }),
      session({ id: "s2", title: "Session Two", speaker: "Marta Fernandez" }),
      session({ id: "s3", title: "Session Three", speaker: "Iker Otxoa" }),
    ]);

    expect(groups).toEqual([
      {
        speaker: "Iker Otxoa",
        sessions: [{ id: "s3", title: "Session Three", startTime: "09:00" }],
      },
      {
        speaker: "Marta Fernandez",
        sessions: [
          { id: "s1", title: "Session One", startTime: "09:00" },
          { id: "s2", title: "Session Two", startTime: "09:00" },
        ],
      },
    ]);
  });

  it("sorts speakers by name", () => {
    const groups = groupSessionsBySpeaker([
      session({ speaker: "Sofia Almeida" }),
      session({ speaker: "Diego Castellanos" }),
    ]);

    expect(groups.map((group) => group.speaker)).toEqual([
      "Diego Castellanos",
      "Sofia Almeida",
    ]);
  });

  it("sorts a speaker's own sessions by start time", () => {
    const groups = groupSessionsBySpeaker([
      session({ id: "late", speaker: "Naia Etxeberria", startTime: "14:00" }),
      session({
        id: "early",
        speaker: "Naia Etxeberria",
        startTime: "09:00",
      }),
    ]);

    expect(groups[0].sessions.map((s) => s.id)).toEqual(["early", "late"]);
  });

  it("excludes the closing panel's placeholder speaker", () => {
    const groups = groupSessionsBySpeaker([
      session({ speaker: "Marta Fernandez" }),
      session({ id: "closing-panel", speaker: "Full speaker lineup" }),
    ]);

    expect(groups).toHaveLength(1);
    expect(groups[0].speaker).toBe("Marta Fernandez");
  });

  it("returns nothing for no sessions", () => {
    expect(groupSessionsBySpeaker([])).toEqual([]);
  });
});
