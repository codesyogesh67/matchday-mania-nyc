import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { TEAMS, GROUPS } from "@/data/teams";

export const Route = createFileRoute("/teams/")({
  head: () => ({
    meta: [
      { title: "Teams & Squads — MatchDay NYC" },
      { name: "description", content: "All 48 World Cup 2026 national teams and full 26-man squads." },
    ],
  }),
  component: TeamsIndex,
});

function TeamsIndex() {
  const [group, setGroup] = useState<string>("All");
  const [q, setQ] = useState("");

  const teamMatches = useMemo(() => {
    if (group === "All") return TEAMS;
    return TEAMS.filter(t => t.group === group);
  }, [group]);

  const playerMatches = useMemo(() => {
    if (q.trim().length < 2) return [];
    const needle = q.toLowerCase();
    const out: { team: typeof TEAMS[number]; player: typeof TEAMS[number]["squad"][number] }[] = [];
    for (const t of TEAMS) {
      for (const p of t.squad) {
        if (p.name.toLowerCase().includes(needle)) out.push({ team: t, player: p });
        if (out.length > 40) return out;
      }
    }
    return out;
  }, [q]);

  const filteredTeams = q.trim() === ""
    ? teamMatches
    : teamMatches.filter(t => t.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div>
      <NavBar />
      <main className="mx-auto max-w-7xl px-4 py-10">
        <header className="mb-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--electric)]">48 Nations · 1,248 Players</p>
          <h1 className="font-display text-5xl md:text-7xl mt-1">TEAMS & SQUADS</h1>
        </header>

        <div className="flex flex-wrap gap-2 mb-4 items-end">
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Search team or player…"
            className="bg-input border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--electric)] flex-1 min-w-[200px]"
          />
          <div className="flex flex-wrap gap-1">
            {["All", ...GROUPS].map(g => (
              <button key={g} onClick={() => setGroup(g)}
                className={`font-display px-3 py-2 rounded-md border text-sm transition ${
                  group === g ? "bg-[var(--electric)] text-primary-foreground border-[var(--electric)]" : "border-border text-muted-foreground"
                }`}>
                {g}
              </button>
            ))}
          </div>
        </div>

        {playerMatches.length > 0 && (
          <section className="mb-8 rounded-lg border border-[var(--gold)]/30 bg-card p-4">
            <h2 className="font-display text-xl text-[var(--gold)] mb-3">⚡ Player matches ({playerMatches.length})</h2>
            <div className="flex flex-wrap gap-2">
              {playerMatches.map(({ team, player }) => (
                <Link key={`${team.id}-${player.name}`} to="/teams/$teamId" params={{ teamId: team.id }}
                  className="flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-3 py-1.5 text-sm hover:border-[var(--electric)]/60 hover:bg-[var(--electric)]/10">
                  <span className="text-lg">{team.flag}</span>
                  <span className="font-medium">{player.name}</span>
                  {player.isStar && <span className="text-[var(--gold)]">⭐</span>}
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{player.pos}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filteredTeams.map(t => (
            <Link key={t.id} to="/teams/$teamId" params={{ teamId: t.id }}
              className="card-glow rounded-lg border border-border bg-card p-4 text-center">
              <div className="text-5xl">{t.flag}</div>
              <p className="font-display text-lg mt-2 tracking-wide">{t.name}</p>
              <p className="text-xs text-muted-foreground">Group {t.group} · #{t.fifaRank}</p>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
