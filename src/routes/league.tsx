import { createFileRoute, Link } from "@tanstack/react-router";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/league")({
  head: () => ({
    meta: [
      { title: "Prediction League — MatchDay NYC" },
      { name: "description", content: "The MatchDay NYC fan prediction league. Coming soon." },
    ],
  }),
  component: LeaguePage,
});

function LeaguePage() {
  return (
    <div>
      <NavBar />
      <main className="mx-auto max-w-3xl px-4 py-20 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Coming Soon</p>
        <h1 className="font-display text-6xl md:text-8xl mt-3 text-glow-green">PREDICTION LEAGUE</h1>
        <p className="text-muted-foreground mt-5 text-lg">
          Pick winners. Predict scores. Climb the leaderboard. Earn bragging rights across all five boroughs.
        </p>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-3">
          {["🏆 Match Picks","🎯 Score Predictions","👥 Bar Leagues","🥇 NYC Leaderboard","💸 Prize Pots","📲 Live Push Alerts"].map(x => (
            <div key={x} className="card-glow rounded-lg border border-border bg-card p-4 font-display text-lg tracking-wide">{x}</div>
          ))}
        </div>
        <Link to="/schedule" className="mt-10 inline-block rounded-md bg-[var(--electric)] text-primary-foreground font-bold uppercase tracking-widest text-sm px-6 py-3 hover:animate-pulse-glow">
          See the Schedule
        </Link>
      </main>
      <Footer />
    </div>
  );
}
