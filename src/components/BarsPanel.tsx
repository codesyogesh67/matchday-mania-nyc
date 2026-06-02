import { motion, AnimatePresence } from "framer-motion";
import { BARS, type Vibe, type Borough } from "@/data/bars";
import { getTeamForMatch, type Match } from "@/data/matches";
import { useMemo, useState } from "react";

const vibeIcon: Record<Vibe, string> = {
  Rowdy: "🔥",
  Chill: "😎",
  International: "🌍",
  "Classic Pub": "🍺",
  Family: "👨‍👩‍👧",
};

export function BarsPanel({ match, onClose }: { match: Match; onClose: () => void }) {
  const [sortRated, setSortRated] = useState(false);
  const [borough, setBorough] = useState<Borough | "All">("All");
  const [vibe, setVibe] = useState<Vibe | "All">("All");
  const [price, setPrice] = useState<"All" | "$" | "$$" | "$$$">("All");
  const [supporter, setSupporter] = useState(false);

  const home = getTeamForMatch(match.homeId);
  const away = getTeamForMatch(match.awayId);

  const bars = useMemo(() => {
    let b = [...BARS];
    if (borough !== "All") b = b.filter(x => x.borough === borough);
    if (vibe !== "All") b = b.filter(x => x.vibe === vibe);
    if (price !== "All") b = b.filter(x => x.price === price);
    if (supporter) b = b.filter(x => x.supports.includes(match.homeId) || x.supports.includes(match.awayId));
    if (sortRated) b.sort((a, c) => c.rating - a.rating);
    return b;
  }, [borough, vibe, price, supporter, sortRated, match.homeId, match.awayId]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.aside
          onClick={(e) => e.stopPropagation()}
          className="absolute right-0 top-0 h-full w-full max-w-xl overflow-y-auto border-l border-border bg-background shadow-2xl grunge-overlay"
          initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
          transition={{ type: "tween", duration: 0.3 }}
        >
          <div className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur p-4 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Bars Watching</p>
              <p className="font-display text-2xl">
                {home.flag} {home.name} <span className="text-[var(--electric)]">vs</span> {away.name} {away.flag}
              </p>
            </div>
            <button onClick={onClose} className="text-2xl text-muted-foreground hover:text-foreground px-2">×</button>
          </div>

          <div className="p-4 space-y-3">
            <div className="flex flex-wrap gap-2">
              <Chip active={sortRated} onClick={() => setSortRated(!sortRated)}>⭐ Best Rated</Chip>
              <Chip active={supporter} onClick={() => setSupporter(!supporter)}>🌍 Supporter Bar</Chip>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <Select value={borough} onChange={(v) => setBorough(v as Borough | "All")}
                options={["All","Manhattan","Brooklyn","Queens","Bronx","Hoboken","Jersey City"]} label="📍 Borough" />
              <Select value={vibe} onChange={(v) => setVibe(v as Vibe | "All")}
                options={["All","Rowdy","Chill","International","Classic Pub","Family"]} label="🍺 Vibe" />
              <Select value={price} onChange={(v) => setPrice(v as "All"|"$"|"$$"|"$$$")}
                options={["All","$","$$","$$$"]} label="💰 Price" />
            </div>
          </div>

          <div className="px-4 pb-8 space-y-3">
            {bars.length === 0 && (
              <p className="text-center text-muted-foreground py-12">No bars match those filters. Loosen up, fan.</p>
            )}
            {bars.map((bar) => (
              <motion.div
                key={bar.id}
                layout
                className="card-glow rounded-lg border border-border bg-card p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="font-display text-xl tracking-wide">{bar.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{bar.neighborhood} · {bar.borough} · {bar.distance}</p>
                    <div className="flex flex-wrap items-center gap-2 mt-2 text-xs">
                      <span className="rounded-full bg-secondary px-2 py-0.5">{vibeIcon[bar.vibe]} {bar.vibe}</span>
                      <span className="rounded-full bg-secondary px-2 py-0.5">{bar.price}</span>
                      <span className="text-[var(--gold)]">{"★".repeat(Math.round(bar.rating))}<span className="text-muted-foreground">{"★".repeat(5 - Math.round(bar.rating))}</span></span>
                      <span className="text-muted-foreground">{bar.rating.toFixed(1)}</span>
                    </div>
                    <p className="mt-3 text-sm text-foreground/80">🎉 {bar.specialsTemplate}</p>
                  </div>
                  <button className="rounded-md bg-[var(--electric)] text-primary-foreground font-bold uppercase text-xs tracking-wider px-3 py-2 hover:animate-pulse-glow whitespace-nowrap">
                    RSVP
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.aside>
      </motion.div>
    </AnimatePresence>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wider border transition ${
        active ? "bg-[var(--electric)] text-primary-foreground border-[var(--electric)]" : "border-border text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function Select({ value, onChange, options, label }: { value: string; onChange: (v: string) => void; options: string[]; label: string }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}
        className="bg-input border border-border rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--electric)]">
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}
