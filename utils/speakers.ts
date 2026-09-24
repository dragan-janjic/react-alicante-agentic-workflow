import type { Session } from "@/types/session";

/**
 * Seed value for the closing panel's `speaker` column (see
 * `supabase/migrations/20260917090100_seed_sessions.sql`, session id
 * `closing-panel`) — a placeholder meaning "all speakers", not a real person.
 * Excluded from the Speakers page rather than shown as its own card.
 */
const FULL_LINEUP_PLACEHOLDER = "Full speaker lineup";

export interface SpeakerSession {
  id: Session["id"];
  title: Session["title"];
  startTime: Session["startTime"];
}

export interface SpeakerSessions {
  speaker: string;
  sessions: SpeakerSession[];
}

/**
 * Groups sessions by speaker, sorted by speaker name, with each speaker's
 * sessions sorted by start time. The closing panel's placeholder speaker
 * value is not a real person and is excluded.
 */
export function groupSessionsBySpeaker(sessions: Session[]): SpeakerSessions[] {
  const bySpeaker = new Map<string, SpeakerSession[]>();

  for (const session of sessions) {
    if (session.speaker === FULL_LINEUP_PLACEHOLDER) continue;

    const existing = bySpeaker.get(session.speaker) ?? [];
    existing.push({
      id: session.id,
      title: session.title,
      startTime: session.startTime,
    });
    bySpeaker.set(session.speaker, existing);
  }

  return Array.from(bySpeaker, ([speaker, speakerSessions]) => ({
    speaker,
    sessions: speakerSessions.sort((a, b) =>
      a.startTime.localeCompare(b.startTime),
    ),
  })).sort((a, b) => a.speaker.localeCompare(b.speaker));
}
