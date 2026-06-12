export type GameDayEvent = {
  date?: string; // optional — if omitted, always active
  route: "/knicks" | "/worldcup";
  label: string;
  active: boolean;
};

export const gameDayEvents: GameDayEvent[] = [
  {
    // No date = always active. World Cup runs all summer.
    route: "/worldcup",
    label: "⚽ FIFA World Cup 2026",
    active: true,
  },
];

// Returns today's ET date as YYYY-MM-DD
export function todayET(): string {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return fmt.format(new Date());
}

export function getActiveGameDay(): GameDayEvent | null {
  const today = todayET();
  return (
    gameDayEvents.find(e => e.active && (!e.date || e.date === today)) ?? null
  );
}
