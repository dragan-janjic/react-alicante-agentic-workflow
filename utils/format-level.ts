import type { Level } from "@/types/session";

/** `session_level` is lowercase in the schema; the UI shows it capitalized. */
export function formatLevel(level: Level): string {
  return level.charAt(0).toUpperCase() + level.slice(1);
}
