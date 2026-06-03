import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { getTeam, type Team, type SquadPlayer, type Pos } from "@/data/teams";
import { MATCHES, getTeamForMatch, getVenue } from "@/data/matches";

export const Route = createFileRoute("/teams/$teamId")({
  loader: ({ params }) => {
    const team = getTeam(params.teamId);
    if (!team) throw notFound();
    return { team };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.team.name ?? "Team"} — MatchDay NYC` },
      { name: "description", content: `Full 26-man squad, coach, and World Cup 2026 schedule for ${loaderData?.team.name}.` },
    ],
  }),
  component: TeamPage,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-display text-5xl">Team not found</h1>
        <Link to="/teams" className="text-[var(--electric)] mt-4 inline-block">← Back to teams</Link>
      </div>
    </div>
  ),
});

const POS_META: Record<Pos, { label: string; icon: string }> = {
  GK: { label: "Goalkeepers", icon: "🧤" },
  DEF: { label: "Defenders", icon: "🛡️" },
  MID: { label: "Midfielders", icon: "⚙️" },
  FWD: { label: "Forwards", icon: "⚡" },
};

function TeamPage() {
  const { team } = Route.useLoaderData() as { team: Team };
  const [selected, setSelected] = useState<SquadPlayer | null>(null);

  const stars = team.squad.filter(p => p.isStar);
  const matches = MATCHES.filter(m => m.homeId === team.id || m.awayId === team.id);
  const nextMatch = matches[0];
  const byPos = (p: Pos) => team.squad.filter(s => s.pos === p);

  return (
    <div>
      <NavBar />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <Link to="/teams" className="text-xs uppercase tracking-widest text-[var(--electric)]">← All Teams</Link>

        <header className="mt-4 flex flex-wrap items-center gap-6 border-b border-border pb-8">
          <div className="text-8xl md:text-9xl drop-shadow-lg">{team.flag}</div>
          <div className="flex-1 min-w-[240px]">
            <h1 className="font-display text-5xl md:text-7xl tracking-wide">{team.name}</h1>
            <div className="flex flex-wrap gap-2 mt-3 text-sm">
              <span className="rounded-full bg-[var(--electric)]/20 text-[var(--electric)] border border-[var(--electric)]/40 px-3 py-1 font-display tracking-wider">GROUP {team.group}</span>
              <span className="rounded-full bg-secondary px-3 py-1">{team.confederation}</span>
              <span className="rounded-full bg-[var(--gold)]/15 text-[var(--gold)] px-3 py-1">FIFA #{team.fifaRank}</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">Head coach: <span className="text-foreground font-medium">{team.coach}</span></p>
            <Link to="/bars" className="inline-block mt-4 rounded-md bg-[var(--electric)] text-primary-foreground font-bold uppercase text-xs tracking-widest px-4 py-2.5 hover:animate-pulse-glow">
              🍺 Find a bar to watch {team.name}
            </Link>
          </div>
        </header>

        {stars.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display text-3xl tracking-wide mb-4 text-[var(--gold)]">⭐ Key Players</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {stars.map(p => (
                <motion.button
                  key={p.name}
                  whileHover={{ y: -3 }}
                  onClick={() => setSelected(p)}
                  className="text-left card-glow rounded-lg border border-[var(--gold)]/50 bg-gradient-to-br from-[var(--gold)]/10 to-transparent p-5"
                >
                  <p className="text-[10px] uppercase tracking-widest text-[var(--gold)]">⭐ Key Player · {p.pos}</p>
                  <p className="font-display text-2xl mt-1">{p.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{p.club}</p>
                </motion.button>
              ))}
            </div>
          </section>
        )}

        <section className="mt-10">
          <h2 className="font-display text-3xl tracking-wide mb-4">Full Squad <span className="text-muted-foreground text-base">· {team.squad.length} players</span></h2>
          <div className="grid md:grid-cols-2 gap-6">
            {(["GK","DEF","MID","FWD"] as const).map(pos => (
              <div key={pos} className="rounded-lg border border-border bg-card p-5">
                <h3 className="font-display tracking-widest text-[var(--electric)] text-lg mb-3">
                  {POS_META[pos].icon} {POS_META[pos].label.toUpperCase()}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {byPos(pos).map(p => (
                    <button
                      key={p.name}
                      onClick={() => setSelected(p)}
                      className={`group flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition ${
                        p.isStar
                          ? "border-[var(--gold)]/60 bg-[var(--gold)]/10 hover:bg-[var(--gold)]/20"
                          : "border-border bg-secondary/40 hover:border-[var(--electric)]/60 hover:bg-[var(--electric)]/10"
                      }`}
                    >
                      <span className="text-[10px] font-display tracking-widest text-muted-foreground group-hover:text-foreground">{p.pos}</span>
                      <span className="font-medium">{p.name}</span>
                      {p.isStar && <span className="text-[var(--gold)]">⭐</span>}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {nextMatch && (
          <section className="mt-10">
            <h2 className="font-display text-3xl tracking-wide mb-4">Next Match</h2>
            {(() => {
              const h = getTeamForMatch(nextMatch.homeId);
              const a = getTeamForMatch(nextMatch.awayId);
              const v = getVenue(nextMatch.venue);
              const d = new Date(nextMatch.date);
              return (
                <div className="card-glow rounded-lg border border-[var(--electric)]/40 bg-card p-5">
                  <p className="text-[10px] uppercase tracking-widest text-[var(--electric)]">{nextMatch.stage}</p>
                  <p className="font-display text-3xl mt-1">{h.flag} {h.name} <span className="text-muted-foreground">vs</span> {a.name} {a.flag}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", timeZone: "America/New_York" })} · {d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: "America/New_York" })} ET
                  </p>
                  <p className="text-sm mt-1">{v.name} · {v.city}</p>
                </div>
              );
            })()}
          </section>
        )}

        <section className="mt-10">
          <h2 className="font-display text-3xl tracking-wide mb-4">Group Schedule</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {matches.filter(m => m.stage.startsWith("Group")).map(m => {
              const h = getTeamForMatch(m.homeId);
              const a = getTeamForMatch(m.awayId);
              const v = getVenue(m.venue);
              const d = new Date(m.date);
              return (
                <div key={m.id} className="card-glow rounded-lg border border-border bg-card p-4">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    {d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", timeZone: "America/New_York" })} · {d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: "America/New_York" })} ET
                  </p>
                  <p className="font-display text-xl mt-1">{h.flag} {h.name} <span className="text-muted-foreground">vs</span> {a.name} {a.flag}</p>
                  <p className="text-xs text-muted-foreground mt-1">{v.name} · {v.city}</p>
                </div>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="card-glow w-full max-w-sm rounded-2xl border border-[var(--electric)]/40 bg-card p-6"
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-[10px] uppercase tracking-widest text-[var(--electric)]">{team.flag} {team.name}</p>
              <p className="font-display text-4xl mt-1">{selected.name} {selected.isStar && <span className="text-[var(--gold)]">⭐</span>}</p>
              <div className="flex gap-2 mt-3">
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-display tracking-widest">{POS_META[selected.pos].icon} {POS_META[selected.pos].label}</span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">Club</p>
              <p className="font-display text-xl">{selected.club ?? "—"}</p>
              <button onClick={() => setSelected(null)} className="mt-6 w-full rounded-md bg-[var(--electric)] text-primary-foreground font-bold uppercase text-xs tracking-widest py-2.5">
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
