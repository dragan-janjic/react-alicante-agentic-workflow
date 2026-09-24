import { describe, expect, it } from "vitest";

import { render, screen } from "@/tests/utils/render";
import type { SpeakerSessions } from "@/utils/speakers";

import { SpeakerCard } from "./speaker-card";

const speaker: SpeakerSessions = {
  speaker: "Marta Fernandez",
  sessions: [
    { id: "opening-keynote", title: "Opening Keynote", startTime: "09:00" },
  ],
};

describe("SpeakerCard", () => {
  it("shows the speaker's name", () => {
    render(<SpeakerCard speaker={speaker} />);

    expect(
      screen.getByRole("heading", { name: "Marta Fernandez" }),
    ).toBeInTheDocument();
  });

  it("shows each session's start time and title", () => {
    render(<SpeakerCard speaker={speaker} />);

    expect(screen.getByText("09:00 · Opening Keynote")).toBeInTheDocument();
  });

  it("links each session to its session page", () => {
    render(<SpeakerCard speaker={speaker} />);

    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/en/sessions/opening-keynote",
    );
  });

  it("links every session when a speaker has more than one", () => {
    render(
      <SpeakerCard
        speaker={{
          speaker: "Evangelia Mitsopoulou",
          sessions: [
            { id: "s1", title: "Session One", startTime: "09:00" },
            { id: "s2", title: "Session Two", startTime: "11:00" },
          ],
        }}
      />,
    );

    expect(screen.getAllByRole("link")).toHaveLength(2);
  });
});
