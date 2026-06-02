import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { GROUPS, TEAMS } from "@/data/teams";

export const Route = createFileRoute("/standings")({
  head: () => ({
    meta: [
      { title: "Group Standings — MatchDay NYC" },
      { name: "description", content: "Live standings for all 12 World Cup 2026 groups." },
    ],
  }),
  component: StandingsPage,
});

function StandingsPage() {
  const [active, setActive] = useState("A");
  const teams = TEAMS.filter(t => t.group === active);

  return (
    <div>
      <NavBar />
      <main className="mx-auto max-w-5xl px-4 py-10">
        <header className="mb-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--electric)]">The Tables</p>
          <h1 className="font-display text-5xl md:text-7xl mt-1">GROUP STANDINGS</h1>
          <p className="text-muted-foreground mt-2">Top 2 qualify (green). Best third-placed teams (gold) may advance to Round of 32.</p>
        </header>

        <div className="flex flex-wrap gap-2 mb-6">
          {GROUPS.map(g => (
            <button key={g} onClick={() => setActive(g)}
              className={`font-display tracking-widest text-lg px-4 py-2 rounded-md border transition ${
                active === g ? "bg-[var(--electric)] text-primary-foreground border-[var(--electric)]" : "border-border text-muted-foreground hover:text-foreground"
              }`}>
              {g}
            </button>
          ))}
        </div>

        <div className="card-glow rounded-lg border border-border bg-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/50 text-[10px] uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="text-left px-4 py-3">#</th>
                <th className="text-left px-4 py-3">Team</th>
                <th className="px-2 py-3">P</th>
                <th className="px-2 py-3">W</th>
                <th className="px-2 py-3">D</th>
                <th className="px-2 py-3">L</th>
                <th className="px-2 py-3">GF</th>
                <th className="px-2 py-3">GA</th>
                <th className="px-2 py-3">GD</th>
                <th className="px-2 py-3 text-[var(--electric)]">PTS</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((t, i) => {
                const rowClass =
                  i < 2 ? "border-l-4 border-l-[var(--electric)]" :
                  i === 2 ? "border-l-4 border-l-[var(--gold)]" :
                  "border-l-4 border-l-transparent";
                return (
                  <tr key={t.id} className={`${rowClass} border-b border-border/50 hover:bg-secondary/20`}>
                    <td className="px-4 py-3 font-display text-lg">{i + 1}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{t.flag}</span>
                        <span className="font-medium">{t.name}</span>
                      </div>
                    </td>
                    <td className="px-2 py-3 text-center tabular-nums">0</td>
                    <td className="px-2 py-3 text-center tabular-nums">0</td>
                    <td className="px-2 py-3 text-center tabular-nums">0</td>
                    <td className="px-2 py-3 text-center tabular-nums">0</td>
                    <td className="px-2 py-3 text-center tabular-nums">0</td>
                    <td className="px-2 py-3 text-center tabular-nums">0</td>
                    <td className="px-2 py-3 text-center tabular-nums">0</td>
                    <td className="px-2 py-3 text-center font-display text-xl text-[var(--electric)]">0</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-4">Tournament kicks off June 11, 2026. Standings will populate live.</p>
      </main>
      <Footer />
    </div>
  );
}
