import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { BARS, type Vibe, type Borough } from "@/data/bars";
import { TEAMS } from "@/data/teams";

export const Route = createFileRoute("/bars")({
  head: () => ({
    meta: [
      { title: "NYC Bars — MatchDay NYC" },
      { name: "description", content: "Find the best NYC bars to watch World Cup 2026 matches." },
    ],
  }),
  component: BarsPage,
});

const vibeIcon: Record<Vibe, string> = {
  Rowdy: "🔥", Chill: "😎", International: "🌍", "Classic Pub": "🍺", Family: "👨‍👩‍👧",
};

function BarsPage() {
  const [borough, setBorough] = useState<Borough | "All">("All");
  const [vibe, setVibe] = useState<Vibe | "All">("All");
  const [price, setPrice] = useState<"All" | "$" | "$$" | "$$$">("All");
  const [team, setTeam] = useState<string>("All");
  const [sort, setSort] = useState<"rating" | "distance">("rating");

  const bars = useMemo(() => {
    let b = [...BARS];
    if (borough !== "All") b = b.filter(x => x.borough === borough);
    if (vibe !== "All") b = b.filter(x => x.vibe === vibe);
    if (price !== "All") b = b.filter(x => x.price === price);
    if (team !== "All") b = b.filter(x => x.supports.includes(team));
    if (sort === "rating") b.sort((a, c) => c.rating - a.rating);
    if (sort === "distance") b.sort((a, c) => parseFloat(a.distance) - parseFloat(c.distance));
    return b;
  }, [borough, vibe, price, team, sort]);

  return (
    <div>
      <NavBar />
      <main className="mx-auto max-w-7xl px-4 py-10">
        <header className="mb-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--electric)]">The Watering Holes</p>
          <h1 className="font-display text-5xl md:text-7xl mt-1">NYC BARS</h1>
          <p className="text-muted-foreground mt-2">Find your tribe. Pick your bar. Live every match like you're pitchside.</p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          <Filter label="📍 Borough" value={borough} onChange={(v) => setBorough(v as Borough | "All")}
            options={["All","Manhattan","Brooklyn","Queens","Bronx","Hoboken","Jersey City"]} />
          <Filter label="🍺 Vibe" value={vibe} onChange={(v) => setVibe(v as Vibe | "All")}
            options={["All","Rowdy","Chill","International","Classic Pub","Family"]} />
          <Filter label="💰 Price" value={price} onChange={(v) => setPrice(v as "All"|"$"|"$$"|"$$$")} options={["All","$","$$","$$$"]} />
          <Filter label="🌍 Supports Team" value={team} onChange={setTeam}
            options={["All", ...TEAMS.map(t => t.id)]}
            labels={["All", ...TEAMS.map(t => `${t.flag} ${t.name}`)]} />
          <Filter label="Sort" value={sort} onChange={(v) => setSort(v as "rating"|"distance")} options={["rating","distance"]}
            labels={["⭐ Best Rated","📍 Closest"]} />
        </div>

        <p className="text-xs text-muted-foreground mb-4">{bars.length} bars</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {bars.map(bar => (
            <div key={bar.id} className="card-glow rounded-lg border border-border bg-card p-5">
              <h3 className="font-display text-2xl tracking-wide">{bar.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{bar.neighborhood} · {bar.borough} · {bar.distance}</p>
              <div className="flex flex-wrap items-center gap-2 mt-3 text-xs">
                <span className="rounded-full bg-secondary px-2 py-0.5">{vibeIcon[bar.vibe]} {bar.vibe}</span>
                <span className="rounded-full bg-secondary px-2 py-0.5">{bar.price}</span>
                <span className="text-[var(--gold)]">{"★".repeat(Math.round(bar.rating))}<span className="text-muted-foreground">{"★".repeat(5 - Math.round(bar.rating))}</span></span>
                <span className="text-muted-foreground">{bar.rating.toFixed(1)}</span>
              </div>
              <div className="flex flex-wrap gap-1 mt-3">
                {bar.supports.map(s => {
                  const t = TEAMS.find(x => x.id === s);
                  return <span key={s} className="text-lg" title={t?.name}>{t?.flag ?? "🏳"}</span>;
                })}
              </div>
              <p className="mt-3 text-sm text-foreground/80">🎉 {bar.specialsTemplate}</p>
              <button className="mt-4 w-full rounded-md bg-[var(--electric)] text-primary-foreground font-bold uppercase text-xs tracking-widest py-2.5 hover:animate-pulse-glow">
                RSVP / Going
              </button>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Filter({ label, value, onChange, options, labels }: { label: string; value: string; onChange: (v: string) => void; options: string[]; labels?: string[] }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}
        className="bg-input border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--electric)]">
        {options.map((o, i) => <option key={o} value={o}>{labels ? labels[i] : o}</option>)}
      </select>
    </label>
  );
}
