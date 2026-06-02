import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { TEAMS, GROUPS } from "@/data/teams";

export const Route = createFileRoute("/teams/")({
  head: () => ({
    meta: [
      { title: "Teams & Squads — MatchDay NYC" },
      { name: "description", content: "All 48 World Cup 2026 national teams and squads." },
    ],
  }),
  component: TeamsIndex,
});

function TeamsIndex() {
  const [group, setGroup] = useState<string>("All");
  const [q, setQ] = useState("");
  const filtered = TEAMS.filter(t =>
    (group === "All" || t.group === group) &&
    (q === "" || t.name.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <div>
      <NavBar />
      <main className="mx-auto max-w-7xl px-4 py-10">
        <header className="mb-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--electric)]">48 Nations</p>
          <h1 className="font-display text-5xl md:text-7xl mt-1">TEAMS & SQUADS</h1>
        </header>

        <div className="flex flex-wrap gap-2 mb-4 items-end">
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search team…"
            className="bg-input border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--electric)] flex-1 min-w-[200px]" />
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

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filtered.map(t => (
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
