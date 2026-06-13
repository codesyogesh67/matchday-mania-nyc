import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const KNICKS_BLUE = "#006BB6";
const KNICKS_ORANGE = "#F58426";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200",
  "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=1200",
  "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=1200",
];

type Borough = "Manhattan" | "Brooklyn" | "Queens" | "Bronx";
type KnicksBar = {
  name: string;
  address: string;
  neighborhood: string;
  borough: Borough;
  rating: number;
  tags: string[];
  hot?: boolean;
};

const BOROUGH_ORDER: Borough[] = ["Manhattan", "Brooklyn", "Queens", "Bronx"];

const FEATURED_BARS: KnicksBar[] = ([
  // Manhattan
  { name: "Mustang Harry's", address: "352 7th Ave, Midtown", neighborhood: "Midtown", borough: "Manhattan" as const, rating: 4.4, tags: ["Official Knicks Bar", "20+ TVs", "Surround Sound"], hot: true },
  { name: "Magic Hour Rooftop", address: "485 7th Ave (Moxy Hotel), Midtown", neighborhood: "Midtown", borough: "Manhattan" as const, rating: 4.5, tags: ["Rooftop", "8 Big Screens", "Retractable Roof"], hot: true },
  { name: "Virgil's Real BBQ", address: "152 W 44th St, Times Square", neighborhood: "Midtown", borough: "Manhattan" as const, rating: 4.3, tags: ["Full BBQ Menu", "Watch Party", "Times Sq"] },
  { name: "Stout NYC", address: "215 W 35th St", neighborhood: "Midtown", borough: "Manhattan" as const, rating: 4.3, tags: ["Epic TV Setup", "Rowdy", "Near MSG"] },
  { name: "Legends Bar", address: "6 W 33rd St", neighborhood: "Midtown", borough: "Manhattan" as const, rating: 4.2, tags: ["3 Floors", "Classic", "Near MSG"] },
  { name: "Goldie's Tavern", address: "135 W 30th St", neighborhood: "Chelsea", borough: "Manhattan" as const, rating: 4.1, tags: ["Official Knicks Bar", "Chill Vibe"] },
  { name: "Crompton Ale House", address: "159 W 26th St", neighborhood: "Chelsea", borough: "Manhattan" as const, rating: 4.0, tags: ["Ale House", "Multiple Screens"] },
  { name: "The Ainsworth", address: "45 E 33rd St", neighborhood: "Midtown", borough: "Manhattan" as const, rating: 3.9, tags: ["Rooftop", "Lively", "Great Food"] },
  { name: "Amity Hall", address: "80 W 3rd St", neighborhood: "West Village", borough: "Manhattan" as const, rating: 4.2, tags: ["Official Knicks Bar", "Downtown", "Chill"] },
  { name: "Hurley's Saloon", address: "232 W 48th St", neighborhood: "Midtown", borough: "Manhattan" as const, rating: 4.1, tags: ["Official Knicks Bar", "Classic NYC Bar"] },
  { name: "Harlem Tavern", address: "2153 Frederick Douglass Blvd", neighborhood: "Harlem", borough: "Manhattan" as const, rating: 4.3, tags: ["Official Knicks Bar", "Beer Garden", "Uptown"] },
  { name: "Standings Bar", address: "43 E 7th St", neighborhood: "East Village", borough: "Manhattan" as const, rating: 4.6, tags: ["Old NY Feel", "Intimate", "Highest Rated"] },
  { name: "Nevada Smiths", address: "100 3rd Ave", neighborhood: "East Village", borough: "Manhattan" as const, rating: 3.9, tags: ["3 Floors", "Global Sports Vibe"] },
  // Brooklyn
  { name: "FancyFree", address: "175 DeKalb Ave", neighborhood: "Fort Greene", borough: "Brooklyn" as const, rating: 4.5, tags: ["Laid Back", "Cocktails", "Local Fave"], hot: true },
  { name: "The Dram Shop", address: "339 9th St", neighborhood: "Park Slope", borough: "Brooklyn" as const, rating: 4.6, tags: ["2026 Best Brooklyn Bar", "7 TVs", "Projector"], hot: true },
  { name: "Time Out Market", address: "55 Water St", neighborhood: "DUMBO", borough: "Brooklyn" as const, rating: 4.3, tags: ["2 Floors", "Food Hall", "Cocktails"] },
  { name: "Black Forest Brooklyn", address: "733 Flatbush Ave", neighborhood: "Flatbush", borough: "Brooklyn" as const, rating: 4.2, tags: ["Beer Hall", "Projection Screens", "Patio"] },
  { name: "Baker's Bar", address: "1 Cornelia St", neighborhood: "Carroll Gardens", borough: "Brooklyn" as const, rating: 4.1, tags: ["Local Spot", "Multiple Screens", "Cozy"] },
  { name: "Brooklyn Bowl", address: "61 Wythe Ave", neighborhood: "Williamsburg", borough: "Brooklyn" as const, rating: 4.4, tags: ["Bowling + Hoops", "Huge Space", "Full Bar"] },
  { name: "Brooklyn Crab", address: "24 Reed St", neighborhood: "Red Hook", borough: "Brooklyn" as const, rating: 4.0, tags: ["Big Screen", "Waterfront", "Seafood"] },
  // Queens
  { name: "Pig Beach Astoria", address: "33-02 Vernon Blvd", neighborhood: "Astoria", borough: "Queens" as const, rating: 4.7, tags: ["28ft Jumbotron", "65 TVs", "Outdoor BBQ"], hot: true },
  { name: "One Station Plaza", address: "21310 41st Ave", neighborhood: "Bayside", borough: "Queens" as const, rating: 4.0, tags: ["Official Knicks Bar", "Local Spot"] },
  // Bronx
  { name: "Rambling House", address: "4292 Katonah Ave", neighborhood: "Woodlawn", borough: "Bronx" as const, rating: 4.1, tags: ["Official Knicks Bar", "Irish Pub", "Bronx Staple"] },
] satisfies KnicksBar[]).slice().sort((a, b) => {
  const bo = BOROUGH_ORDER.indexOf(a.borough) - BOROUGH_ORDER.indexOf(b.borough);
  if (bo !== 0) return bo;
  return b.rating - a.rating;
});

const GOLD = "#FFD700";

export function KnicksContent() {
  return (
    <main className="bg-[#0A0A0A] text-white">
      <KnicksHero />
      <SeriesRecap />
      <Game4Recap />
      <Game5Section />
      <WatchInNYC />
      <RunSoFar />
      <HypeSection />
    </main>
  );
}

function Countdown() {
  // Game 5: June 13, 2026 at 8:30 PM EDT (UTC-4) → 2026-06-14T00:30:00Z
  const target = new Date("2026-06-14T00:30:00Z").getTime();
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
    <div
      className="flex flex-col items-center min-w-[88px] md:min-w-[120px] rounded-xl border-2 px-4 py-3 bg-black/80"
      style={{ borderColor: KNICKS_ORANGE, boxShadow: `0 0 24px ${KNICKS_ORANGE}55` }}
    >
      <span
        key={n}
        className="font-display text-5xl md:text-7xl tabular-nums animate-fade-in"
        style={{ color: KNICKS_ORANGE, textShadow: `0 0 24px ${KNICKS_ORANGE}` }}
      >
        {String(n).padStart(2, "0")}
      </span>
      <span className="text-[10px] md:text-xs uppercase tracking-widest text-white/60 mt-1">{l}</span>
    </div>
  );
  return (
    <div className="flex flex-wrap gap-3 md:gap-4 justify-center max-w-sm md:max-w-none mx-auto">
      <Box n={h} l="Hours" />
      <Box n={m} l="Minutes" />
      <Box n={s} l="Seconds" />
    </div>
  );
}

function KnicksHero() {
  return (
    <section className="relative overflow-hidden bg-[#0A0A0A]">
      {/* Animated particle / smoke gradient */}
      <div aria-hidden className="absolute inset-0">
        <motion.div
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 20% 30%, ${KNICKS_ORANGE}55, transparent 55%), radial-gradient(circle at 80% 70%, ${KNICKS_BLUE}55, transparent 55%)`,
          }}
        />
        <motion.div
          animate={{ opacity: [0.6, 0.2, 0.6] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 70% 20%, ${KNICKS_ORANGE}40, transparent 50%), radial-gradient(circle at 30% 90%, ${KNICKS_BLUE}40, transparent 50%)`,
          }}
        />
        <div className="absolute inset-0" style={{
          backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence baseFrequency='0.85' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/></svg>\")",
          opacity: 0.07,
          mixBlendMode: "overlay",
        }} />
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/4 w-48 h-[120%] blur-3xl animate-beam"
            style={{ background: `linear-gradient(to bottom, ${KNICKS_BLUE}50, transparent)` }} />
          <div className="absolute top-0 left-2/3 w-48 h-[120%] blur-3xl animate-beam"
            style={{ background: `linear-gradient(to bottom, ${KNICKS_ORANGE}50, transparent)`, animationDelay: "3s" }} />
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pt-10 pb-16 md:pt-16 md:pb-24 text-center">
        {/* Series Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full border-2 px-5 py-2 text-xs md:text-sm uppercase tracking-[0.25em] font-bold relative overflow-hidden"
          style={{ borderColor: GOLD, color: GOLD, background: "rgba(255,215,0,0.08)" }}
        >
          <span className="relative z-10">🏆 NBA Finals 2026 — Knicks vs Spurs</span>
          <motion.span
            aria-hidden
            className="absolute inset-y-0 -left-1/2 w-1/2"
            style={{ background: "linear-gradient(90deg, transparent, rgba(255,215,0,0.45), transparent)" }}
            animate={{ x: ["0%", "400%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>

        {/* Series Score */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
          className="mt-8 flex items-end justify-center gap-4 md:gap-8 font-display leading-none"
        >
          <div className="flex flex-col items-center">
            <span className="text-xs md:text-sm uppercase tracking-[0.3em] text-white/70 mb-2">NYK</span>
            <motion.span
              animate={{ textShadow: [`0 0 30px ${KNICKS_ORANGE}90`, `0 0 60px ${KNICKS_ORANGE}`, `0 0 30px ${KNICKS_ORANGE}90`], scale: [1, 1.04, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-[10rem] md:text-[14rem] tabular-nums"
              style={{ color: KNICKS_ORANGE }}
            >3</motion.span>
          </div>
          <span className="text-6xl md:text-8xl text-white/30 pb-4">—</span>
          <div className="flex flex-col items-center">
            <span className="text-xs md:text-sm uppercase tracking-[0.3em] text-white/50 mb-2">SAS</span>
            <span className="text-[7rem] md:text-[10rem] tabular-nums text-white/40">1</span>
          </div>
        </motion.div>
        <p className="mt-2 font-bold uppercase tracking-[0.3em] text-xs md:text-sm" style={{ color: KNICKS_ORANGE }}>
          New York Knicks lead the series
        </p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="font-display mt-10 text-[14vw] md:text-[8rem] leading-[0.85] tracking-tight"
          style={{ textShadow: `0 0 40px ${KNICKS_ORANGE}55` }}
        >
          ONE WIN AWAY.
          <br />
          <span style={{ color: KNICKS_ORANGE, textShadow: `0 0 50px ${KNICKS_ORANGE}` }}>CLOSE IT OUT TONIGHT.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="mt-5 text-base md:text-xl font-medium text-white tracking-wide"
        >
          Game 5 · San Antonio · Tonight · <span className="font-bold" style={{ color: KNICKS_ORANGE }}>8:30 PM ET</span>
        </motion.p>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="mt-10"
        >
          <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-white/70 mb-4">⏳ Game 5 Tipoff In</p>
          <Countdown />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}
          className="mt-10 px-2"
        >
          <motion.a
            href="#watch"
            animate={{ boxShadow: [`0 0 20px ${KNICKS_ORANGE}80`, `0 0 50px ${KNICKS_ORANGE}`, `0 0 20px ${KNICKS_ORANGE}80`] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block w-full md:w-auto rounded-lg px-8 py-4 font-display text-xl md:text-2xl tracking-widest text-white"
            style={{ background: `linear-gradient(90deg, ${KNICKS_ORANGE}, #ff9d4d, ${KNICKS_ORANGE})` }}
          >
            🔥 GET READY — IT'S CHAMPIONSHIP TIME
          </motion.a>
        </motion.div>

        {/* Win Probability Bar */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
          className="mt-10 max-w-2xl mx-auto"
        >
          <div className="flex justify-between text-xs uppercase tracking-widest mb-2">
            <span className="text-white/70">SAS 64%</span>
            <span style={{ color: KNICKS_ORANGE }}>NYK 36%</span>
          </div>
          <div className="h-3 w-full rounded-full overflow-hidden flex border border-white/10">
            <div className="h-full" style={{ width: "64%", background: "#555" }} />
            <div className="h-full" style={{ width: "36%", background: KNICKS_ORANGE }} />
          </div>
          <p className="mt-3 text-xs md:text-sm italic text-white/60">
            Vegas favors SA on the road... but this team doesn't care.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

type GameRecap = {
  num: number; us: number; them: number; won: boolean; loc: string; date: string; blurb: string;
};
const SERIES: GameRecap[] = [
  { num: 1, us: 105, them: 95, won: true, loc: "San Antonio", date: "Wed Jun 3", blurb: "The Knicks stunned the Spurs on their home floor to open the Finals. A balanced attack and stifling defense set the tone for the series." },
  { num: 2, us: 105, them: 104, won: true, loc: "San Antonio", date: "Fri Jun 5", blurb: "One point. That's all that separated the Knicks from giving SA a split. New York held on in the final seconds to go up 2-0 heading back to MSG." },
  { num: 3, us: 111, them: 115, won: false, loc: "New York (MSG)", date: "Mon Jun 8", blurb: "San Antonio fought back on the Garden floor, stealing one to avoid the sweep. The Spurs kept their hopes alive in a gritty, physical game." },
  { num: 4, us: 107, them: 106, won: true, loc: "New York (MSG)", date: "Wed Jun 10", blurb: "The Knicks reclaimed control with a clutch Game 4 win at MSG. New York now holds a 3-1 series lead and can close out the championship TONIGHT in San Antonio." },
];

function SeriesRecap() {
  const [active, setActive] = useState(4);
  const game = SERIES.find(g => g.num === active)!;
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 md:py-20">
      <h2 className="font-display text-3xl md:text-5xl tracking-wide text-center">
        📋 HOW WE GOT HERE — <span style={{ color: KNICKS_ORANGE }}>SERIES RECAP</span>
      </h2>
      <div className="mt-8 flex flex-wrap justify-center gap-2 border-b border-white/10">
        {SERIES.map(g => {
          const isActive = g.num === active;
          return (
            <button
              key={g.num}
              onClick={() => setActive(g.num)}
              className="relative px-5 py-3 font-display text-lg md:text-xl tracking-widest uppercase transition-colors"
              style={{ color: isActive ? KNICKS_ORANGE : "rgba(255,255,255,0.6)" }}
            >
              Game {g.num}
              {isActive && (
                <motion.span
                  layoutId="recap-underline"
                  className="absolute left-0 right-0 -bottom-px h-1 rounded-full"
                  style={{ background: KNICKS_ORANGE, boxShadow: `0 0 16px ${KNICKS_ORANGE}` }}
                />
              )}
            </button>
          );
        })}
      </div>

      <motion.div
        key={game.num}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-8 rounded-xl border-2 p-6 md:p-10 bg-black/60"
        style={{ borderColor: game.won ? KNICKS_ORANGE : "#444" }}
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-white/60">
              {game.loc} · {game.date}
            </p>
            <p className="mt-2 font-display text-4xl md:text-6xl tabular-nums">
              <span style={{ color: game.won ? "#22c55e" : "#ef4444" }}>NYK {game.us}</span>
              <span className="text-white/40 mx-3">·</span>
              <span style={{ color: game.won ? "#ef4444" : "#22c55e" }}>SAS {game.them}</span>
            </p>
          </div>
          <span
            className="px-4 py-2 rounded-full font-bold text-sm uppercase tracking-widest"
            style={{
              background: game.won ? `${KNICKS_ORANGE}25` : "#ef444425",
              color: game.won ? KNICKS_ORANGE : "#ef4444",
              border: `2px solid ${game.won ? KNICKS_ORANGE : "#ef4444"}`,
            }}
          >
            {game.won ? "✅ Knicks Win" : "❌ Spurs Win"}
          </span>
        </div>
        <p className="mt-6 text-base md:text-lg text-white/85 leading-relaxed">{game.blurb}</p>
      </motion.div>
    </section>
  );
}

function Game4Recap() {
  const quarters = [
    { team: "Knicks", q: [22, 27, 26, 32], final: 107, won: true },
    { team: "Spurs", q: [41, 35, 14, 16], final: 106, won: false },
  ];
  const performers = [
    { icon: "🔥", name: "Jalen Brunson", line: "36 PTS · 7 AST · 5 REB · 3 STL · 48% FG", tag: "CLUTCH KING" },
    { icon: "💥", name: "OG Anunoby", line: "33 PTS · 7/9 from three (77.8%) · 100% FT", tag: "UNCONSCIOUS" },
    { icon: "🏀", name: "Karl-Anthony Towns", line: "13 PTS · 10 REB · 80% FG", tag: "DOUBLE-DOUBLE" },
    { icon: "💪", name: "Josh Hart", line: "6 PTS · 8 REB · 6 AST", tag: "HEART & SOUL" },
    { icon: "🛡", name: "Jose Alvarado", line: "8 PTS · 3 AST · 100% FG off bench", tag: "SPARK PLUG" },
  ];

  return (
    <section id="recap" className="mx-auto max-w-7xl px-4 py-16 md:py-20">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-white/60">Game 4 — Final · Wed June 11 · MSG</p>
        <h2 className="font-display text-4xl md:text-6xl tracking-wide mt-2">
          <span style={{ color: KNICKS_ORANGE, textShadow: `0 0 30px ${KNICKS_ORANGE}80` }}>KNICKS WIN</span> 107–106
        </h2>
        <p className="mt-3 font-bold uppercase tracking-widest text-sm md:text-base" style={{ color: KNICKS_BLUE }}>
          Greatest Comeback in NBA Finals History
        </p>
      </div>

      {/* Callout */}
      <motion.div
        animate={{ boxShadow: [`0 0 0 ${KNICKS_ORANGE}00`, `0 0 40px ${KNICKS_ORANGE}80`, `0 0 0 ${KNICKS_ORANGE}00`] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="mt-8 rounded-xl border p-6 text-center"
        style={{ borderColor: KNICKS_ORANGE, background: `${KNICKS_ORANGE}10` }}
      >
        <p className="font-display text-2xl md:text-4xl tracking-wide" style={{ color: KNICKS_ORANGE }}>
          TRAILED BY 29 AT HALFTIME.
        </p>
        <p className="font-display text-xl md:text-3xl tracking-wide text-white/90 mt-1">
          Outscored Spurs <span style={{ color: KNICKS_ORANGE }}>58–30</span> in the second half.
        </p>
      </motion.div>

      {/* Box score table */}
      <div className="mt-10 overflow-x-auto rounded-lg border border-white/10 bg-black/40">
        <table className="w-full text-center text-sm md:text-base">
          <thead>
            <tr className="text-white/60 uppercase text-xs tracking-widest">
              <th className="py-3 px-3 text-left">Team</th>
              <th className="py-3 px-3">Q1</th>
              <th className="py-3 px-3">Q2</th>
              <th className="py-3 px-3">Q3</th>
              <th className="py-3 px-3">Q4</th>
              <th className="py-3 px-3 font-display text-base" style={{ color: KNICKS_ORANGE }}>FINAL</th>
            </tr>
          </thead>
          <tbody>
            {quarters.map(r => (
              <tr key={r.team} className="border-t border-white/10">
                <td className="py-3 px-3 text-left font-display text-xl"
                  style={{ color: r.won ? KNICKS_ORANGE : "#fff" }}>{r.team}</td>
                {r.q.map((n, i) => (
                  <td key={i} className="py-3 px-3 tabular-nums text-white/80">{n}</td>
                ))}
                <td className="py-3 px-3 font-display text-2xl tabular-nums"
                  style={{ color: r.won ? KNICKS_ORANGE : "#fff" }}>{r.final}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Performers */}
      <h3 className="mt-14 font-display text-3xl md:text-4xl tracking-wide text-center">
        KEY <span style={{ color: KNICKS_ORANGE }}>PERFORMERS</span>
      </h3>
      <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {performers.map(p => (
          <div key={p.name} className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
            <div className="flex items-center justify-between">
              <span className="text-2xl">{p.icon}</span>
              <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                style={{ background: `${KNICKS_ORANGE}20`, color: KNICKS_ORANGE }}>{p.tag}</span>
            </div>
            <p className="font-display text-2xl mt-2">{p.name}</p>
            <p className="text-sm text-white/70 mt-1">{p.line}</p>
          </div>
        ))}
      </div>

      {/* Team stats */}
      <div className="mt-10 grid md:grid-cols-3 gap-3">
        <StatTile label="Field Goal %" value="46.2%" />
        <StatTile label="Three-Point %" value="46.9%" />
        <StatTile label="Rebounds · Assists" value="53 · 23" />
      </div>
    </section>
  );
}

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/40 p-5 text-center">
      <p className="text-xs uppercase tracking-widest text-white/50">{label}</p>
      <p className="font-display text-4xl mt-2" style={{ color: KNICKS_ORANGE, textShadow: `0 0 20px ${KNICKS_ORANGE}60` }}>{value}</p>
    </div>
  );
}

function Game5Section() {
  return (
    <section id="game5" className="mx-auto max-w-7xl px-4 py-16 md:py-20">
      <h2 className="font-display text-4xl md:text-6xl tracking-wide text-center">
        GAME 5 · <span style={{ color: KNICKS_ORANGE }}>CHAMPIONSHIP OPPORTUNITY</span>
      </h2>

      <div className="mt-10 grid md:grid-cols-2 gap-4">
        <InfoCard label="Match" value="Knicks @ Spurs" sub="NYK leads 3–1" />
        <InfoCard label="Tipoff" value="8:30 PM ET" sub="Saturday, June 14" />
        <InfoCard label="Venue" value="AT&T Center" sub="San Antonio, TX (Spurs home)" />
        <InfoCard label="Win Probability" value="Knicks 54.7%" sub="Spurs 45.3%" />
      </div>

      <motion.div
        animate={{ scale: [1, 1.02, 1], boxShadow: [`0 0 0 ${KNICKS_ORANGE}00`, `0 0 50px ${KNICKS_ORANGE}90`, `0 0 0 ${KNICKS_ORANGE}00`] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="mt-10 rounded-xl border p-6 md:p-8 text-center"
        style={{ borderColor: KNICKS_ORANGE, background: `linear-gradient(135deg, ${KNICKS_BLUE}30, ${KNICKS_ORANGE}25)` }}
      >
        <p className="font-display text-2xl md:text-4xl tracking-wide leading-tight">
          WIN SATURDAY. BRING THE TROPHY HOME
          <br />
          <span style={{ color: KNICKS_ORANGE }}>TO NEW YORK FOR THE FIRST TIME SINCE 1973.</span> 🏆
        </p>
      </motion.div>

      <div className="mt-10">
        <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-3 text-center">Tipoff in</p>
        <Countdown />
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

function WatchInNYC() {
  const [query, setQuery] = useState("");
  const [borough, setBorough] = useState<"All" | Borough>("All");

  const filtered = FEATURED_BARS.filter(b => {
    if (borough !== "All" && b.borough !== borough) return false;
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      b.name.toLowerCase().includes(q) ||
      b.neighborhood.toLowerCase().includes(q) ||
      b.borough.toLowerCase().includes(q) ||
      b.address.toLowerCase().includes(q) ||
      b.tags.some(v => v.toLowerCase().includes(q))
    );
  });

  const boroughs: Array<"All" | Borough> = ["All", ...BOROUGH_ORDER];

  return (
    <section id="watch" className="mx-auto max-w-7xl px-4 py-16 md:py-20">
      <h2 className="font-display text-4xl md:text-6xl tracking-wide text-center">
        🍺 CATCH THE GAME <span style={{ color: KNICKS_ORANGE }}>IN NYC</span>
      </h2>
      <p className="text-center text-white/60 mt-3 max-w-2xl mx-auto">
        23 bars across the five boroughs showing Game 4 tonight.
      </p>

      {/* Search */}
      <div className="mt-10 flex flex-col sm:flex-row gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, neighborhood, borough, or tag…"
          className="flex-1 rounded-md border border-white/15 bg-black/60 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-white/40"
        />
      </div>

      {/* Borough filter */}
      <div className="mt-4 flex flex-wrap gap-2">
        {boroughs.map(b => {
          const active = borough === b;
          return (
            <button
              key={b}
              onClick={() => setBorough(b)}
              className="rounded-full px-4 py-1.5 text-xs uppercase tracking-widest font-bold border transition"
              style={{
                borderColor: active ? KNICKS_ORANGE : "rgba(255,255,255,0.15)",
                background: active ? KNICKS_ORANGE : "transparent",
                color: active ? "#000" : "rgba(255,255,255,0.8)",
                boxShadow: active ? `0 0 16px ${KNICKS_ORANGE}80` : undefined,
              }}
            >
              {b}
            </button>
          );
        })}
        <span className="ml-auto text-xs text-white/50 self-center">{filtered.length} bar{filtered.length === 1 ? "" : "s"}</span>
      </div>

      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map(b => (
          <BarCard key={b.name} bar={b} />
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-white/50 col-span-full text-center">No bars match your search.</p>
        )}
      </div>
    </section>
  );
}

function BarCard({ bar }: { bar: KnicksBar }) {
  const featured = !!bar.hot;
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
        {bar.hot && (
          <span
            className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full whitespace-nowrap animate-pulse"
            style={{ background: KNICKS_ORANGE, color: "#000" }}
          >
            🔥 Hot tonight
          </span>
        )}
      </div>
      <p className="text-sm text-white/70 mt-1">📍 {bar.address}</p>
      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-white/60">
        <span className="px-2 py-0.5 rounded-full border border-white/10">{bar.neighborhood}</span>
        <span className="px-2 py-0.5 rounded-full border border-white/10">{bar.borough}</span>
        <span
          className="px-2 py-0.5 rounded-full border font-bold"
          style={{ borderColor: `${KNICKS_ORANGE}80`, color: KNICKS_ORANGE }}
        >
          ★ {bar.rating.toFixed(1)}
        </span>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {bar.tags.map(v => (
          <span key={v} className="text-[11px] uppercase tracking-wider px-2 py-0.5 rounded-full border"
            style={{ borderColor: `${KNICKS_BLUE}80`, color: KNICKS_BLUE }}>{v}</span>
        ))}
      </div>
    </motion.div>
  );
}

function RunSoFar() {
  const rounds = [
    { round: "Round 1", opp: "Atlanta Hawks", result: "Won 4-2", icon: "✅" },
    { round: "Round 2", opp: "Philadelphia 76ers", result: "Swept 4-0", icon: "✅" },
    { round: "ECF", opp: "Cleveland Cavaliers", result: "Swept 4-0", icon: "✅" },
    { round: "NBA Finals", opp: "San Antonio Spurs", result: "Leading 3-1 — One Win Away", icon: "🏆" },
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
