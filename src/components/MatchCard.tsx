import { motion } from "framer-motion";
import { getTeamForMatch, getVenue, type Match } from "@/data/matches";

export function MatchCard({ match, onBars }: { match: Match; onBars: () => void }) {
  const home = getTeamForMatch(match.homeId);
  const away = getTeamForMatch(match.awayId);
  const venue = getVenue(match.venue);
  const d = new Date(match.date);
  const dateStr = d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", timeZone: "America/New_York" });
  const timeStr = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: "America/New_York" });

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
      className="card-glow rounded-lg border border-border bg-card overflow-hidden"
    >
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-secondary/40">
        <span className="text-[10px] uppercase tracking-widest text-[var(--electric)] font-bold">{match.stage}</span>
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{dateStr} · {timeStr} ET</span>
      </div>
      <div className="p-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <div className="text-right">
          <div className="text-3xl md:text-4xl">{home.flag}</div>
          <p className="font-display tracking-wide mt-1 text-base md:text-lg">{home.name}</p>
        </div>
        <div className="font-display text-2xl text-muted-foreground">VS</div>
        <div className="text-left">
          <div className="text-3xl md:text-4xl">{away.flag}</div>
          <p className="font-display tracking-wide mt-1 text-base md:text-lg">{away.name}</p>
        </div>
      </div>
      <div className="px-4 pb-3 text-xs text-muted-foreground text-center">
        📍 {venue.name} · {venue.city}
      </div>
      <button
        onClick={onBars}
        className="w-full border-t border-border bg-secondary/30 hover:bg-[var(--electric)] hover:text-primary-foreground transition py-2.5 text-xs font-bold uppercase tracking-widest"
      >
        🍺 Bars Watching This
      </button>
    </motion.article>
  );
}
