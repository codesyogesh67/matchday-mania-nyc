import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useServerFn } from "@tanstack/react-start";
import { searchKnicksBars, type AiBar } from "@/lib/knicks-bars.functions";

const KNICKS_BLUE = "#006BB6";
const KNICKS_ORANGE = "#F58426";

const FEATURED_BARS = [
  { name: "Stout NYC", neighborhood: "Midtown West", vibe: ["Knicks Bar", "Big Screen", "Rowdy"] },
  { name: "Legends Bar & Grill", neighborhood: "Midtown", vibe: ["Sports Bar", "Multi-Screen"] },
  { name: "Brother Jimmy's BBQ", neighborhood: "Murray Hill", vibe: ["Rowdy", "Wings & Beer"] },
  { name: "The Ainsworth", neighborhood: "Chelsea", vibe: ["Upscale", "Knicks Bar"] },
  { name: "Standings Bar", neighborhood: "East Village", vibe: ["Tiny", "Hardcore Fans"] },
  { name: "Nevada Smiths", neighborhood: "East Village", vibe: ["Football & Hoops", "International"] },
];

export function KnicksContent() {
  return (
    <main className="bg-[#0a0a0a] text-white">
      <KnicksHero />
      <GameInfo />
      <WatchInNYC />
      <RunSoFar />
      <HypeSection />
    </main>
  );
}

function Countdown() {
  // Wednesday June 10, 8:30 PM EDT (EDT = UTC-4) → 2026-06-11T00:30:00Z
  const target = new Date("2026-06-11T00:30:00Z").getTime();
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target - now);
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  const Box = ({ n, l }: { n: number; l: string }) => (
    <div className="flex flex-col items-center min-w-[80px] md:min-w-[110px] rounded-lg border border-white/10 bg-black/60 backdrop-blur px-4 py-3"
      style={{ boxShadow: `0 0 24px ${KNICKS_ORANGE}40` }}>
      <span className="font-display text-4xl md:text-6xl tabular-nums" style={{ color: KNICKS_ORANGE, textShadow: `0 0 20px ${KNICKS_ORANGE}` }}>
        {String(n).padStart(2, "0")}
      </span>
      <span className="text-[10px] md:text-xs uppercase tracking-widest text-white/60 mt-1">{l}</span>
    </div>
  );
  return (
    <div className="flex gap-3 md:gap-4 justify-center">
      <Box n={h} l="Hours" />
      <Box n={m} l="Min" />
      <Box n={s} l="Sec" />
    </div>
  );
}

function KnicksHero() {
  return (
    <section className="relative overflow-hidden">
      {/* Animated gradient background */}
      <div aria-hidden className="absolute inset-0 opacity-40"
        style={{
          background: `radial-gradient(circle at 20% 20%, ${KNICKS_BLUE}80, transparent 50%), radial-gradient(circle at 80% 80%, ${KNICKS_ORANGE}60, transparent 50%)`,
        }} />
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/4 w-48 h-[120%] blur-3xl animate-beam"
          style={{ background: `linear-gradient(to bottom, ${KNICKS_BLUE}50, transparent)` }} />
        <div className="absolute top-0 left-2/3 w-48 h-[120%] blur-3xl animate-beam"
          style={{ background: `linear-gradient(to bottom, ${KNICKS_ORANGE}50, transparent)`, animationDelay: "3s" }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pt-12 pb-20 md:pt-20 md:pb-28 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs uppercase tracking-[0.3em]"
          style={{ borderColor: KNICKS_ORANGE, color: KNICKS_ORANGE, background: `${KNICKS_ORANGE}10` }}>
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ background: KNICKS_ORANGE }} />
            <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: KNICKS_ORANGE }} />
          </span>
          Game Night Takeover
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="font-display mt-6 text-[14vw] md:text-[8.5rem] leading-[0.85] tracking-tight"
        >
          BOUNCE BACK TIME,
          <br />
          <span style={{ color: KNICKS_ORANGE, textShadow: `0 0 40px ${KNICKS_ORANGE}90` }}>NEW YORK</span> 🏀
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="mt-5 font-display text-xl md:text-3xl tracking-[0.2em] text-white/90"
        >
          NBA FINALS · GAME 4 · <span style={{ color: KNICKS_BLUE, textShadow: `0 0 20px ${KNICKS_BLUE}` }}>NEW YORK KNICKS</span> vs SPURS
        </motion.p>

        {/* Series + win prob */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <div className="rounded-lg border border-white/15 bg-black/60 px-5 py-3 font-display text-2xl tracking-widest">
            <span style={{ color: KNICKS_ORANGE }}>NYK 2</span>
            <span className="mx-2 text-white/40">–</span>
            <span className="text-white/70">SAS 1</span>
          </div>
          <div className="rounded-lg border border-white/15 bg-black/60 px-5 py-3 text-sm">
            <span className="uppercase tracking-widest text-white/60 mr-2">Win Prob</span>
            <span style={{ color: KNICKS_ORANGE }} className="font-bold">Knicks 52.7%</span>
            <span className="mx-2 text-white/40">|</span>
            <span className="text-white/70">Spurs 47.3%</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
          className="mt-10"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-3">Tipoff in</p>
          <Countdown />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a href="#watch" className="rounded-md px-6 py-3 font-bold uppercase tracking-widest text-sm text-white"
            style={{ background: KNICKS_ORANGE, boxShadow: `0 0 30px ${KNICKS_ORANGE}80` }}>
            🍺 Find a Watch Party
          </a>
          <a href="#watch" className="rounded-md px-6 py-3 font-bold uppercase tracking-widest text-sm text-white"
            style={{ background: KNICKS_BLUE, boxShadow: `0 0 30px ${KNICKS_BLUE}80` }}>
            📍 Where to Watch in NYC
          </a>
          <a href="#game" className="rounded-md border px-6 py-3 font-bold uppercase tracking-widest text-sm text-white/90 hover:bg-white/5"
            style={{ borderColor: "rgba(255,255,255,0.25)" }}>
            🏟 Game Info
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function GameInfo() {
  return (
    <section id="game" className="mx-auto max-w-7xl px-4 py-16 md:py-20">
      <h2 className="font-display text-4xl md:text-6xl tracking-wide text-center">
        <span style={{ color: KNICKS_BLUE }}>GAME</span> <span style={{ color: KNICKS_ORANGE }}>INFO</span>
      </h2>

      <div className="mt-10 grid md:grid-cols-2 gap-4">
        <InfoCard label="Venue" value="Madison Square Garden" sub="New York City" />
        <InfoCard label="Tipoff" value="8:30 PM EDT" sub="Wednesday, June 10" />
        <InfoCard label="Series" value="NBA Finals — Game 4" sub="NYK leads 2-1" />
        <InfoCard label="Broadcast" value="ABC / ESPN" sub="National TV" />
      </div>

      <h3 className="mt-14 font-display text-3xl md:text-4xl tracking-wide text-center">SERIES SO FAR</h3>
      <div className="mt-6 grid md:grid-cols-3 gap-4">
        <RecapCard game="Game 1 — Final" result="NYK 105 – SAS 95" note="Brunson 32 pts. NYC takes the opener in San Antonio." won />
        <RecapCard game="Game 2 — Final" result="NYK 105 – SAS 104" note="OG Anunoby buzzer-beater. Garden erupts in San Antonio." won />
        <RecapCard game="Game 3 — Final" result="SAS 115 – NYK 111" note="Spurs steal one at the Garden. Series now 2-1." won={false} />
      </div>
    </section>
  );
}

function InfoCard({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5 transition hover:bg-white/[0.06]"
      style={{ borderImage: `linear-gradient(135deg, ${KNICKS_BLUE}, ${KNICKS_ORANGE}) 1` }}>
      <p className="text-xs uppercase tracking-widest text-white/50">{label}</p>
      <p className="font-display text-3xl mt-1" style={{ color: KNICKS_ORANGE }}>{value}</p>
      <p className="text-sm text-white/70 mt-1">{sub}</p>
    </div>
  );
}

function RecapCard({ game, result, note, won }: { game: string; result: string; note: string; won: boolean }) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/40 p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-widest text-white/50">{game}</span>
        <span className="text-xs px-2 py-0.5 rounded-full font-bold"
          style={{ background: won ? `${KNICKS_ORANGE}20` : `${KNICKS_BLUE}20`, color: won ? KNICKS_ORANGE : "#fff" }}>
          {won ? "W" : "L"}
        </span>
      </div>
      <p className="font-display text-3xl mt-2" style={{ color: KNICKS_BLUE }}>{result}</p>
      <p className="text-sm text-white/70 mt-2">{note}</p>
    </div>
  );
}

function WatchInNYC() {
  const search = useServerFn(searchKnicksBars);
  const [query, setQuery] = useState("");
  const [bars, setBars] = useState<AiBar[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function run(q: string) {
    setLoading(true); setError(null);
    try {
      const res = await search({ data: { query: q || undefined } });
      setBars(res.bars);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load bars");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { run(""); /* eslint-disable-next-line */ }, []);

  return (
    <section id="watch" className="mx-auto max-w-7xl px-4 py-16 md:py-20">
      <h2 className="font-display text-4xl md:text-6xl tracking-wide text-center">
        🍺 CATCH THE GAME <span style={{ color: KNICKS_ORANGE }}>IN NYC</span>
      </h2>
      <p className="text-center text-white/60 mt-3 max-w-2xl mx-auto">
        Featured Knicks bars + AI-curated watch spots across the five boroughs.
      </p>

      {/* Featured */}
      <h3 className="mt-10 font-display text-2xl tracking-widest text-white/80">⭐ FEATURED KNICKS BARS</h3>
      <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {FEATURED_BARS.map(b => <BarCard key={b.name} bar={b} featured />)}
      </div>

      {/* Search */}
      <form
        onSubmit={(e) => { e.preventDefault(); run(query); }}
        className="mt-12 flex flex-col sm:flex-row gap-2"
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for bars or areas in NYC…"
          className="flex-1 rounded-md border border-white/15 bg-black/60 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-white/40"
        />
        <button type="submit"
          className="rounded-md px-6 py-3 font-bold uppercase tracking-widest text-sm text-white"
          style={{ background: KNICKS_BLUE, boxShadow: `0 0 20px ${KNICKS_BLUE}80` }}>
          {loading ? "Searching…" : "Search"}
        </button>
      </form>

      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {loading && bars.length === 0 && Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-lg border border-white/10 bg-white/[0.03] p-5 animate-pulse h-32" />
        ))}
        {bars.map((b, i) => (
          <BarCard key={`${b.name}-${i}`} bar={{ name: b.name, neighborhood: b.neighborhood, vibe: b.vibe, note: b.note }} />
        ))}
      </div>
    </section>
  );
}

function BarCard({
  bar,
  featured = false,
}: {
  bar: { name: string; neighborhood: string; vibe: string[]; note?: string };
  featured?: boolean;
}) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="rounded-lg border bg-white/[0.03] p-5"
      style={{
        borderColor: featured ? KNICKS_ORANGE : "rgba(255,255,255,0.1)",
        boxShadow: featured ? `0 0 20px ${KNICKS_ORANGE}30` : undefined,
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <h4 className="font-display text-2xl tracking-wide">{bar.name}</h4>
        {featured && <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full" style={{ background: KNICKS_ORANGE, color: "#000" }}>Featured</span>}
      </div>
      <p className="text-sm text-white/70 mt-1">📍 {bar.neighborhood}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {bar.vibe.map(v => (
          <span key={v} className="text-[11px] uppercase tracking-wider px-2 py-0.5 rounded-full border"
            style={{ borderColor: `${KNICKS_BLUE}80`, color: KNICKS_BLUE }}>{v}</span>
        ))}
      </div>
      {bar.note && <p className="text-xs text-white/50 mt-3 line-clamp-2">{bar.note}</p>}
    </motion.div>
  );
}

function RunSoFar() {
  const rounds = [
    { round: "Round 1", opp: "Atlanta Hawks", result: "Won 4-2", icon: "✅" },
    { round: "Round 2", opp: "Philadelphia 76ers", result: "Swept 4-0", icon: "✅" },
    { round: "ECF", opp: "Cleveland Cavaliers", result: "Swept 4-0", icon: "✅" },
    { round: "NBA Finals", opp: "San Antonio Spurs", result: "Leading 2-1", icon: "🔥" },
  ];
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 md:py-20">
      <h2 className="font-display text-4xl md:text-6xl tracking-wide text-center">
        THE <span style={{ color: KNICKS_ORANGE }}>RUN</span> SO FAR
      </h2>
      <div className="mt-10 relative">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
          style={{ background: `linear-gradient(to bottom, ${KNICKS_BLUE}, ${KNICKS_ORANGE})` }} />
        <div className="space-y-6">
          {rounds.map((r, i) => (
            <motion.div key={r.round}
              initial={{ opacity: 0, x: i % 2 ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`relative md:w-1/2 ${i % 2 ? "md:ml-auto md:pl-10" : "md:pr-10"} pl-12 md:pl-0`}
            >
              <div className="absolute left-4 md:left-auto md:right-auto top-5 w-3 h-3 rounded-full -translate-x-1/2 md:translate-x-0"
                style={{
                  background: KNICKS_ORANGE,
                  boxShadow: `0 0 12px ${KNICKS_ORANGE}`,
                  left: i % 2 ? undefined : "calc(50% - 6px)",
                  right: i % 2 ? "calc(50% - 6px)" : undefined,
                }} />
              <div className="rounded-lg border border-white/10 bg-black/60 p-5">
                <p className="text-xs uppercase tracking-widest text-white/50">{r.round}</p>
                <p className="font-display text-2xl mt-1">{r.opp}</p>
                <p className="mt-1 text-sm" style={{ color: KNICKS_ORANGE }}>
                  {r.icon} {r.result}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HypeSection() {
  const chant = "LET'S GO KNICKS · ".repeat(20);
  return (
    <section className="relative py-16 md:py-24 overflow-hidden border-y border-white/10"
      style={{ background: `linear-gradient(135deg, ${KNICKS_BLUE}40, #000 40%, ${KNICKS_ORANGE}40)` }}>
      <div className="relative text-center px-4">
        <motion.h2
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="font-display text-5xl md:text-8xl tracking-wide"
          style={{ textShadow: `0 0 40px ${KNICKS_ORANGE}90` }}
        >
          NYC IS <span style={{ color: KNICKS_ORANGE }}>READY</span>
        </motion.h2>
        <p className="mt-4 text-white/70 uppercase tracking-[0.3em] text-sm">The Garden. Wednesday. 8:30.</p>
      </div>

      <div className="mt-10 overflow-hidden whitespace-nowrap">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="inline-block font-display text-3xl md:text-5xl tracking-widest"
          style={{ color: KNICKS_ORANGE, textShadow: `0 0 20px ${KNICKS_ORANGE}` }}
        >
          {chant}{chant}
        </motion.div>
      </div>
    </section>
  );
}
