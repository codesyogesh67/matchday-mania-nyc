// Smart match status logic — all kickoff times are in ET (Eastern Time).
// The 2026 World Cup runs June–July, so ET is on EDT (UTC-4) the entire tournament.
// We compute kickoff as a UTC ms timestamp by shifting ET wall time by +4h.

export type MatchStatus = "upcoming" | "live" | "ft";

export type StatusInfo = {
  status: MatchStatus;
  kickoffMs: number;
  minutesPlayed: number; // 0 if not started or finished
  minutesUntilKickoff: number; // negative if started
};

const ET_TO_UTC_HOURS = 4; // EDT

// Parses "10:00 PM ET", "3:00 PM ET", "12:00 AM ET", etc. → 24h
export function parseEtTime(time: string): { hour: number; minute: number } | null {
  const m = time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!m) return null;
  let h = parseInt(m[1], 10);
  const min = parseInt(m[2], 10);
  const ampm = m[3].toUpperCase();
  if (ampm === "PM" && h !== 12) h += 12;
  if (ampm === "AM" && h === 12) h = 0;
  return { hour: h, minute: min };
}

// iso = "2026-06-11", time = "10:00 PM ET"
export function kickoffUtcMs(iso: string, time: string): number | null {
  const d = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  const t = parseEtTime(time);
  if (!d || !t) return null;
  const y = +d[1], mo = +d[2], day = +d[3];
  return Date.UTC(y, mo - 1, day, t.hour + ET_TO_UTC_HOURS, t.minute);
}

export function getMatchStatus(iso: string, time: string, now: number = Date.now()): StatusInfo {
  const kickoff = kickoffUtcMs(iso, time);
  if (kickoff == null) {
    return { status: "upcoming", kickoffMs: 0, minutesPlayed: 0, minutesUntilKickoff: Infinity };
  }
  const diffMin = (now - kickoff) / 60000;
  let status: MatchStatus = "upcoming";
  if (diffMin >= 0 && diffMin <= 110) status = "live";
  else if (diffMin > 110) status = "ft";
  return {
    status,
    kickoffMs: kickoff,
    minutesPlayed: status === "live" ? Math.max(1, Math.min(90, Math.floor(diffMin))) : 0,
    minutesUntilKickoff: Math.round(-diffMin),
  };
}

// Returns the current ET calendar date as YYYY-MM-DD
export function todayEtIso(now: number = Date.now()): string {
  const d = new Date(now - ET_TO_UTC_HOURS * 3600 * 1000);
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
