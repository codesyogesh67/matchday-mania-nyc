import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { MatchCard } from "@/components/MatchCard";
import { BarsPanel } from "@/components/BarsPanel";
import { MATCHES, getTeamForMatch, type Match } from "@/data/matches";
import { GROUPS, TEAMS } from "@/data/teams";
import { VENUES } from "@/data/venues";

export const Route = createFileRoute("/schedule")({
  head: () => ({
    meta: [
      { title: "Full Schedule — MatchDay NYC" },
      { name: "description", content: "All 104 World Cup 2026 matches with ET kickoff times and venues." },
    ],
  }),
  component: SchedulePage,
});

function SchedulePage() {
  const [group, setGroup] = useState<string>("All");
  const [team, setTeam] = useState<string>("All");
  const [city, setCity] = useState<string>("All");
  const [date, setDate] = useState<string>("All");
  const [open, setOpen] = useState<Match | null>(null);

  const dates = useMemo(() => {
    const s = new Set<string>();
    MATCHES.forEach(m => {
      const d = new Date(m.date).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "America/New_York" });
      s.add(d);
    });
    return Array.from(s);
  }, []);

  const cities = useMemo(() => Array.from(new Set(Object.values(VENUES).map(v => v.city))), []);

  const filtered = useMemo(() => {
    return MATCHES.filter(m => {
      if (group !== "All" && m.group !== group && !m.stage.includes(group)) {
        if (group !== "Knockout" || ["Group A","Group B","Group C","Group D","Group E","Group F","Group G","Group H","Group I","Group J","Group K","Group L"].includes(m.stage)) {
          if (group !== "Knockout") return false;
        }
      }
      if (group === "Knockout" && m.stage.startsWith("Group")) return false;
      if (team !== "All" && m.homeId !== team && m.awayId !== team) return false;
      if (city !== "All" && VENUES[m.venue].city !== city) return false;
      if (date !== "All") {
        const d = new Date(m.date).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "America/New_York" });
        if (d !== date) return false;
      }
      return true;
    });
  }, [group, team, city, date]);

  return (
    <div>
      <NavBar />
      <main className="mx-auto max-w-7xl px-4 py-10">
        <header className="mb-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--electric)]">The Fixtures</p>
          <h1 className="font-display text-5xl md:text-7xl mt-1">FULL SCHEDULE</h1>
          <p className="text-muted-foreground mt-2">104 matches. ET kickoff times. All real venues across USA · Canada · Mexico.</p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <Filter label="Group / Stage" value={group} onChange={setGroup} options={["All", ...GROUPS.map(g => g), "Knockout"]} />
          <Filter label="Team" value={team} onChange={setTeam}
            options={["All", ...TEAMS.map(t => t.id)]}
            labels={["All", ...TEAMS.map(t => `${t.flag} ${t.name}`)]} />
          <Filter label="City" value={city} onChange={setCity} options={["All", ...cities]} />
          <Filter label="Date" value={date} onChange={setDate} options={["All", ...dates]} />
        </div>

        <p className="text-xs text-muted-foreground mb-4">{filtered.length} matches</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(m => (
            <MatchCard key={m.id} match={m} onBars={() => setOpen(m)} />
          ))}
          {filtered.length === 0 && <p className="text-center col-span-full py-12 text-muted-foreground">No matches — try clearing filters.</p>}
        </div>
      </main>
      {open && <BarsPanel match={open} onClose={() => setOpen(null)} />}
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
