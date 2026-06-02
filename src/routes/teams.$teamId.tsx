import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { getTeam, type Team } from "@/data/teams";
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
      { name: "description", content: `Squad, coach, and schedule for ${loaderData?.team.name} at the World Cup 2026.` },
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

function TeamPage() {
  const { team } = Route.useLoaderData() as { team: Team };
  const matches = MATCHES.filter(m => m.homeId === team.id || m.awayId === team.id);
  const byPos = (p: "GK" | "DEF" | "MID" | "FWD") => team.squad.filter((s) => s.pos === p);

  return (
    <div>
      <NavBar />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <Link to="/teams" className="text-xs uppercase tracking-widest text-[var(--electric)]">← All Teams</Link>

        <header className="mt-4 flex flex-wrap items-center gap-6 border-b border-border pb-8">
          <div className="text-8xl md:text-9xl">{team.flag}</div>
          <div className="flex-1 min-w-[240px]">
            <h1 className="font-display text-5xl md:text-7xl tracking-wide">{team.name}</h1>
            <div className="flex flex-wrap gap-3 mt-3 text-sm">
              <span className="rounded-full bg-secondary px-3 py-1">Group {team.group}</span>
              <span className="rounded-full bg-secondary px-3 py-1">{team.confederation}</span>
              <span className="rounded-full bg-[var(--gold)]/15 text-[var(--gold)] px-3 py-1">FIFA #{team.fifaRank}</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">Head coach: <span className="text-foreground font-medium">{team.coach}</span></p>
          </div>
          <div className="card-glow rounded-lg border border-[var(--gold)]/40 bg-card p-4 min-w-[240px]">
            <p className="text-[10px] uppercase tracking-widest text-[var(--gold)]">⭐ Star Player</p>
            <p className="font-display text-2xl mt-1">{team.starPlayer.name}</p>
            <p className="text-xs text-muted-foreground">{team.starPlayer.position} · {team.starPlayer.club}</p>
          </div>
        </header>

        <section className="mt-10">
          <h2 className="font-display text-3xl tracking-wide mb-4">Squad</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {(["GK","DEF","MID","FWD"] as const).map(pos => (
              <div key={pos} className="rounded-lg border border-border bg-card p-4">
                <h3 className="font-display tracking-widest text-[var(--electric)] text-lg">{pos === "GK" ? "Goalkeepers" : pos === "DEF" ? "Defenders" : pos === "MID" ? "Midfielders" : "Forwards"}</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  {byPos(pos).map(p => (
                    <li key={p.name} className="border-b border-border/50 pb-1.5 last:border-0">
                      <p className="font-medium">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.club}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

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
    </div>
  );
}
