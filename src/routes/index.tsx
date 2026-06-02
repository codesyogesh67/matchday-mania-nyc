import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Countdown } from "@/components/Countdown";
import { MATCHES } from "@/data/matches";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MatchDay NYC — World Cup 2026 Fan HQ" },
      { name: "description", content: "Where NYC watches the World Cup 2026. Schedules, bars, predictions." },
    ],
  }),
  component: Index,
});

function Index() {
  const opener = MATCHES[0];

  return (
    <div>
      <NavBar />
      <main>
        <Hero openerDate={opener.date} />
        <Highlights />
      </main>
      <Footer />
    </div>
  );
}

function Hero({ openerDate }: { openerDate: string }) {
  return (
    <section className="relative overflow-hidden grunge-overlay">
      {/* Skyline silhouette */}
      <Skyline />
      {/* Light beams */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/4 w-40 h-[120%] bg-gradient-to-b from-[var(--electric)]/20 via-[var(--electric)]/5 to-transparent blur-2xl animate-beam"></div>
        <div className="absolute top-0 left-1/2 w-32 h-[120%] bg-gradient-to-b from-[var(--gold)]/15 via-[var(--gold)]/5 to-transparent blur-2xl animate-beam" style={{ animationDelay: "2s" }}></div>
        <div className="absolute top-0 left-2/3 w-48 h-[120%] bg-gradient-to-b from-[var(--electric)]/15 to-transparent blur-2xl animate-beam" style={{ animationDelay: "4s" }}></div>
      </div>
      <div className="stadium-bg absolute inset-0" />

      <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-24 md:pt-24 md:pb-32 text-center">
        <motion.p
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="inline-block rounded-full border border-[var(--electric)]/40 bg-[var(--electric)]/5 px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-[var(--electric)]"
        >
          June 11 — July 19, 2026
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }}
          className="font-display mt-6 text-[16vw] md:text-[10rem] leading-[0.85] tracking-tight"
        >
          MATCHDAY
          <br />
          <span className="text-[var(--electric)] text-glow-green">NYC</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-4 font-display text-xl md:text-3xl tracking-[0.25em] text-foreground/80"
        >
          WORLD CUP 2026 · <span className="text-[var(--gold)] text-glow-gold">USA · CANADA · MEXICO</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.6 }}
          className="mt-10"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">Kickoff in</p>
          <Countdown target={openerDate} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Link to="/bars" className="rounded-md bg-[var(--electric)] text-primary-foreground px-6 py-3 font-bold uppercase tracking-widest text-sm hover:animate-pulse-glow">
            🍺 Find Your Bar
          </Link>
          <Link to="/league" className="rounded-md bg-[var(--gold)] text-background px-6 py-3 font-bold uppercase tracking-widest text-sm">
            🏆 Prediction League
          </Link>
          <Link to="/schedule" className="rounded-md border border-foreground/30 px-6 py-3 font-bold uppercase tracking-widest text-sm hover:border-foreground">
            📅 View Schedule
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function Skyline() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 200"
      preserveAspectRatio="none"
      className="absolute bottom-0 left-0 w-full h-48 md:h-72 opacity-20 pointer-events-none"
    >
      <path
        fill="currentColor"
        className="text-foreground"
        d="M0 200 L0 130 L40 130 L40 90 L80 90 L80 110 L110 110 L110 60 L140 60 L140 100 L180 100 L180 70 L210 70 L210 30 L230 30 L230 70 L260 70 L260 110 L300 110 L300 80 L340 80 L340 50 L370 50 L370 90 L410 90 L410 120 L450 120 L450 90 L490 90 L490 40 L510 40 L510 90 L540 90 L540 110 L580 110 L580 70 L620 70 L620 30 L640 30 L640 70 L670 70 L670 100 L710 100 L710 60 L750 60 L750 110 L790 110 L790 80 L830 80 L830 50 L870 50 L870 100 L910 100 L910 130 L950 130 L950 90 L990 90 L990 60 L1020 60 L1020 100 L1060 100 L1060 130 L1100 130 L1100 110 L1140 110 L1140 140 L1200 140 L1200 200 Z"
      />
    </svg>
  );
}

function Highlights() {
  const items = [
    { label: "Total Matches", value: "104", icon: "⚽" },
    { label: "National Teams", value: "48", icon: "🌍" },
    { label: "Host Cities", value: "16", icon: "🏟" },
    { label: "NYC Bars", value: "18+", icon: "🍺" },
  ];
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-16 md:py-24">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
        {items.map((it, i) => (
          <motion.div
            key={it.label}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="card-glow rounded-lg border border-border bg-card p-5 text-center"
          >
            <div className="text-3xl">{it.icon}</div>
            <div className="font-display text-5xl text-[var(--electric)] text-glow-green mt-2">{it.value}</div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{it.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 grid md:grid-cols-3 gap-4">
        <FeatureCard icon="📅" title="EVERY MATCH" desc="All 104 matches with ET kickoffs, real venues, and live filters." to="/schedule" />
        <FeatureCard icon="🍺" title="THE BARS" desc="Find rowdy supporter bars across the five boroughs and beyond." to="/bars" />
        <FeatureCard icon="🇧🇷" title="THE SQUADS" desc="All 48 teams. Real squads for the giants. Star players highlighted." to="/teams" />
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, desc, to }: { icon: string; title: string; desc: string; to: string }) {
  return (
    <Link to={to} className="card-glow group rounded-lg border border-border bg-card p-6">
      <div className="text-4xl">{icon}</div>
      <h3 className="font-display text-3xl mt-3 tracking-wide">{title}</h3>
      <p className="text-sm text-muted-foreground mt-2">{desc}</p>
      <p className="mt-4 text-xs uppercase tracking-widest text-[var(--electric)]">Open →</p>
    </Link>
  );
}
