import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { BARS } from "@/data/bars";
import { CallToReserveButton } from "@/components/CallToReserve";
import { getMatchStatus, todayEtIso, type MatchStatus } from "@/lib/matchStatus";
import hero1 from "@/assets/wc-hero-1.jpg";
import hero2 from "@/assets/wc-hero-2.jpg";
import hero3 from "@/assets/wc-hero-3.jpg";

const WC_GOLD = "#C9A84C";
const WC_GREEN = "#2d6a4f";
const WC_BG = "#050a05";
const WC_CARD = "#0d1f0d";

const HERO_IMAGES = [hero1, hero2, hero3];

const FLAG_MARQUEE = "🇧🇷 🇦🇷 🇫🇷 🇩🇪 🇪🇸 🇵🇹 🇬🇧 🇮🇹 🇳🇱 🇧🇪 🇲🇽 🇺🇸 🇯🇵 🇰🇷 🇸🇳 🇲🇦 🇳🇬 🇨🇲 🇬🇭 🇨🇴 🇺🇾 🇨🇷 🇨🇭 🇩🇰 🇸🇪 🇳🇴 🇵🇱 🇦🇺 🇳🇿".split(" ");

export function WorldCupContent() {
  return (
    <main style={{ background: WC_BG }} className="text-white">
      <Hero />
      <TodaysGames />
      <UnitySection />
      <WatchInNYC />
      <TournamentTicker />
    </main>
  );
}

function Hero() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % HERO_IMAGES.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMAGES[idx]})` }}
        />
      </AnimatePresence>
      {/* Light dark overlay — images are already dark/detailed */}
      <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.35)" }} />
      {/* Bottom gradient to anchor lower-third text without obscuring image's upper visuals */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#050a05] via-[#050a05]/85 to-transparent" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-16 md:pb-24 text-center md:text-left">
        <motion.p
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="text-[10px] md:text-xs uppercase font-semibold"
          style={{ color: WC_GOLD, letterSpacing: "0.35em", textShadow: `0 0 24px ${WC_GOLD}80` }}
        >
          FIFA World Cup 2026 · Opens Today · June 11
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.8 }}
          className="font-display mt-4 text-[10vw] md:text-7xl lg:text-8xl leading-[0.95] tracking-tight font-black text-white max-w-5xl"
          style={{ textShadow: "0 4px 30px rgba(0,0,0,0.7)" }}
        >
          THE WORLD JUST LANDED <span className="text-white">IN NEW YORK</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-5 text-base md:text-xl text-white/90 max-w-2xl"
        >
          48 nations. 104 matches. One city that holds them all.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-7 flex flex-wrap items-center justify-center md:justify-start gap-3"
        >
          <a href="#today" className="rounded-md px-6 py-3 font-bold uppercase tracking-widest text-xs md:text-sm transition hover:brightness-110"
            style={{ background: WC_GOLD, color: "#0a0a0a", boxShadow: `0 0 28px ${WC_GOLD}55` }}>
            Today's Matches
          </a>
          <a href="#bars" className="rounded-md border-2 border-white px-6 py-3 font-bold uppercase tracking-widest text-xs md:text-sm text-white transition hover:bg-white hover:text-black">
            Find a Bar
          </a>
          <Link to="/schedule" className="rounded-md px-6 py-3 font-bold uppercase tracking-widest text-xs md:text-sm transition hover:bg-[#C9A84C] hover:text-black"
            style={{ border: `2px solid ${WC_GOLD}`, color: WC_GOLD, background: "transparent" }}>
            ⚽ Full Schedule
          </Link>
          <Link to="/standings" className="rounded-md px-6 py-3 font-bold uppercase tracking-widest text-xs md:text-sm text-white transition hover:bg-white hover:text-black"
            style={{ border: `2px solid #ffffff`, background: "transparent" }}>
            📊 Standings
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

type TodayMatch = {
  iso: string;
  group: string; home: string; homeFlag: string; away: string; awayFlag: string;
  time: string; venue: string; broadcast: string;
  homeScore?: number; awayScore?: number; metlife?: boolean;
};
const TODAY_MATCHES: TodayMatch[] = [
  { iso: "2026-06-11", group: "Group A", home: "Mexico", homeFlag: "🇲🇽", away: "South Africa", awayFlag: "🇿🇦", time: "3:00 PM ET", venue: "Estadio Azteca, Mexico City", broadcast: "FOX / Tubi (free)", homeScore: 2, awayScore: 0 },
  { iso: "2026-06-11", group: "Group A", home: "South Korea", homeFlag: "🇰🇷", away: "Czechia", awayFlag: "🇨🇿", time: "10:00 PM ET", venue: "Estadio Akron, Guadalajara, Mexico", broadcast: "FS1" },
];

function TodaysGames() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(id);
  }, []);

  const todayIso = todayEtIso(now);
  const items = TODAY_MATCHES
    .filter(m => m.iso === todayIso)
    .map(m => ({ m, s: getMatchStatus(m.iso, m.time, now) }));

  // Sort: LIVE first, UPCOMING next (soonest first), FT last
  const order = { live: 0, upcoming: 1, ft: 2 } as const;
  items.sort((a, b) => {
    const o = order[a.s.status] - order[b.s.status];
    if (o !== 0) return o;
    return a.s.kickoffMs - b.s.kickoffMs;
  });

  const list = items.length ? items : TODAY_MATCHES.map(m => ({ m, s: getMatchStatus(m.iso, m.time, now) }));

  return (
    <section id="today" className="relative mx-auto max-w-7xl px-4 py-20 md:py-28">
      <SectionHeader eyebrow="Kick Off Day" title="JUNE 11 · 2026" />
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {list.map(({ m, s }, i) => {
          const isLive = s.status === "live";
          const isFt = s.status === "ft";
          return (
            <motion.article
              key={`${m.iso}-${m.time}-${i}`}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-xl overflow-hidden relative ${isLive ? "animate-pulse-glow" : ""}`}
              style={{
                background: WC_CARD,
                border: isLive ? `2px solid ${WC_GOLD}` : `1px solid ${WC_GOLD}66`,
                boxShadow: isLive ? `0 0 50px ${WC_GOLD}80` : `0 0 40px ${WC_GOLD}15`,
                opacity: isFt ? 0.65 : 1,
              }}
            >
              <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: `${WC_GOLD}33`, background: "rgba(0,0,0,0.3)" }}>
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold" style={{ color: WC_GOLD }}>{m.group}</span>
                <StatusBadge status={s.status} time={m.time} minutesPlayed={s.minutesPlayed} />
              </div>
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-5 py-8">
                <div className="text-right">
                  <div className="text-5xl md:text-6xl">{m.homeFlag}</div>
                  <p className="font-display tracking-wide mt-2 text-xl md:text-2xl font-bold">{m.home}</p>
                </div>
                <div className="font-display text-2xl text-white/40">
                  {(isFt || isLive) && m.homeScore != null && m.awayScore != null
                    ? <span className="text-white">{m.homeScore}–{m.awayScore}</span>
                    : "VS"}
                </div>
                <div className="text-left">
                  <div className="text-5xl md:text-6xl">{m.awayFlag}</div>
                  <p className="font-display tracking-wide mt-2 text-xl md:text-2xl font-bold">{m.away}</p>
                </div>
              </div>
              <div className="px-5 py-4 border-t text-sm text-white/80 space-y-1" style={{ borderColor: `${WC_GOLD}22`, background: "rgba(0,0,0,0.25)" }}>
                <div>📍 {m.venue}</div>
                <div>📺 <span style={{ color: WC_GOLD }}>{m.broadcast}</span></div>
              </div>
            </motion.article>
          );
        })}
      </div>
      <p className="mt-10 text-center text-sm md:text-base text-white/70 italic">
        The Final comes home to <span style={{ color: WC_GOLD }} className="font-semibold not-italic">MetLife Stadium, New Jersey</span> · July 19, 2026
      </p>
    </section>
  );
}

export function StatusBadge({ status, time, minutesPlayed }: { status: "upcoming"|"live"|"ft"; time: string; minutesPlayed?: number }) {
  if (status === "live") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-widest text-white animate-pulse-glow"
        style={{ background: "#FF0000", boxShadow: "0 0 14px #FF0000aa" }}>
        🔴 Live{minutesPlayed ? ` · ~${minutesPlayed}'` : ""}
      </span>
    );
  }
  if (status === "ft") {
    return (
      <span className="inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white"
        style={{ background: "#333333" }}>
        FT
      </span>
    );
  }
  return <span className="text-[11px] uppercase tracking-widest" style={{ color: "#C9A84C" }}>{time}</span>;
}


function UnitySection() {
  return (
    <section className="relative overflow-hidden border-y" style={{ borderColor: `${WC_GOLD}22`, background: "linear-gradient(180deg, #050a05 0%, #081208 50%, #050a05 100%)" }}>
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, ${WC_GOLD} 0, transparent 40%), radial-gradient(circle at 80% 70%, ${WC_GREEN} 0, transparent 40%)`,
        }}
      />
      <div className="relative mx-auto max-w-5xl px-4 py-24 md:py-36 text-center">
        <SectionHeader eyebrow="The Soul of It" title="ONE CITY. EVERY NATION." />
        <motion.p
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-12 text-xl md:text-3xl leading-relaxed text-white/90 font-light"
        >
          New York has always been where the world comes together. On any given block you'll hear a dozen languages,
          smell food from a hundred countries, and share a subway car with someone whose flag is flying in today's match.
          <br /><br />
          The World Cup doesn't just visit New York — <span style={{ color: WC_GOLD }} className="font-semibold">it comes home</span>.
          For 39 days this summer, every neighborhood becomes its own stadium. Every bar becomes an embassy. Every fan becomes family.
        </motion.p>
      </div>

      <div className="relative border-t border-b py-6 overflow-hidden" style={{ borderColor: `${WC_GOLD}33`, background: "rgba(0,0,0,0.4)" }}>
        <div className="flex gap-6 animate-marquee whitespace-nowrap text-4xl md:text-5xl">
          {[...FLAG_MARQUEE, ...FLAG_MARQUEE, ...FLAG_MARQUEE].map((f, i) => (
            <span key={i}>{f}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WatchInNYC() {
  const [q, setQ] = useState("");
  const filtered = BARS.filter(b => {
    const s = q.trim().toLowerCase();
    if (!s) return true;
    return (
      b.name.toLowerCase().includes(s) ||
      b.neighborhood.toLowerCase().includes(s) ||
      b.borough.toLowerCase().includes(s) ||
      b.vibe.toLowerCase().includes(s)
    );
  });

  return (
    <section id="bars" className="relative mx-auto max-w-7xl px-4 py-20 md:py-28">
      <SectionHeader eyebrow="Where To Watch" title="FIND YOUR MATCH IN NYC" />
      <p className="mt-6 text-center text-white/70">
        Search your neighborhood — every bar is showing the World Cup tonight
      </p>
      <div className="mt-6 max-w-xl mx-auto">
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Search by name, neighborhood, borough, or vibe…"
          className="w-full rounded-lg px-5 py-3.5 text-white placeholder-white/40 focus:outline-none focus:ring-2"
          style={{ background: WC_CARD, border: `1px solid ${WC_GOLD}55`, boxShadow: `inset 0 0 20px ${WC_GOLD}10` }}
        />
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(b => (
          <article key={b.id} className="rounded-lg p-5 flex flex-col" style={{ background: WC_CARD, border: `1px solid ${WC_GOLD}33` }}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-display text-xl tracking-wide text-white">{b.name}</h3>
                  {b.hot && (
                    <span className="text-[10px] font-bold uppercase tracking-widest rounded-full px-2 py-0.5" style={{ background: "rgba(245,132,38,0.18)", color: "#F58426", border: "1px solid rgba(245,132,38,0.5)" }}>🔥 Hot tonight</span>
                  )}
                </div>
                <p className="text-sm text-white/70 mt-1.5">{b.address}</p>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full whitespace-nowrap" style={{ background: `${WC_GOLD}22`, color: WC_GOLD }}>★ {b.rating}</span>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-3">
              <span className="text-[10px] uppercase tracking-widest rounded-full px-2 py-0.5" style={{ background: "rgba(255,255,255,0.06)", color: "#fff", border: "1px solid rgba(255,255,255,0.15)" }}>{b.neighborhood} · {b.borough}</span>
              {(b.tags ?? []).map(t => (
                <span key={t} className="text-[10px] uppercase tracking-widest rounded-full px-2 py-0.5" style={{ color: WC_GOLD, border: `1px solid ${WC_GOLD}55` }}>{t}</span>
              ))}
            </div>
            <p className="text-sm text-white/75 mt-3 italic">"{b.specialsTemplate}"</p>
            {b.phone && (
              <div className="mt-4">
                <CallToReserveButton name={b.name} phone={b.phone} accent={WC_GOLD} />
              </div>
            )}
          </article>
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="text-center text-white/50 mt-10">No bars match that search. Try a borough or vibe.</p>
      )}
    </section>
  );
}

function TournamentTicker() {
  const text = "48 TEAMS · 104 MATCHES · 16 CITIES · 3 COUNTRIES · OPENS JUNE 11 · FINAL JULY 19 AT METLIFE NJ · USA · MEXICO · CANADA · THE BIGGEST WORLD CUP IN HISTORY";
  return (
    <section className="relative border-t border-b py-5 overflow-hidden" style={{ borderColor: `${WC_GOLD}55`, background: "linear-gradient(90deg, #050a05, #0d1f0d, #050a05)" }}>
      <div className="flex gap-12 animate-marquee whitespace-nowrap font-display text-2xl md:text-4xl tracking-[0.2em]" style={{ color: WC_GOLD, textShadow: `0 0 24px ${WC_GOLD}55` }}>
        {Array.from({ length: 4 }).map((_, i) => <span key={i}>{text} ·</span>)}
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="text-center">
      <p className="text-[11px] md:text-xs uppercase font-semibold" style={{ color: WC_GOLD, letterSpacing: "0.4em" }}>
        {eyebrow}
      </p>
      <h2 className="font-display mt-3 text-4xl md:text-6xl tracking-tight font-black">
        {title}
      </h2>
      <div className="mt-4 mx-auto h-px w-24" style={{ background: `linear-gradient(90deg, transparent, ${WC_GOLD}, transparent)` }} />
    </div>
  );
}

// Re-export Link to silence unused-import linters during incremental builds
export { Link };
