import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/standings")({
  head: () => ({
    meta: [
      { title: "FIFA World Cup 2026 · Group Standings — MatchDay NYC" },
      { name: "description", content: "Live group standings for the 2026 FIFA World Cup. All 12 groups, updated as matches are played." },
    ],
  }),
  component: StandingsPage,
});

const WC_GOLD = "#C9A84C";
const WC_BG = "#050a05";
const WC_CARD = "#0d1f0d";

type TeamStanding = {
  name: string;
  flag: string;
  p: number; w: number; d: number; l: number;
  gf: number; ga: number;
  status: "ADV" | "CONT" | "ELIM";
};

type GroupKey = "A"|"B"|"C"|"D"|"E"|"F"|"G"|"H"|"I"|"J"|"K"|"L";

const empty = (name: string, flag: string): TeamStanding => ({
  name, flag, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, status: "CONT",
});

const GROUPS: Record<GroupKey, TeamStanding[]> = {
 A: [
    { name: "Mexico",       flag: "🇲🇽", p: 1, w: 1, d: 0, l: 0, gf: 2, ga: 0, status: "CONT" },
    { name: "South Korea",  flag: "🇰🇷", p: 1, w: 1, d: 0, l: 0, gf: 2, ga: 1, status: "CONT" },
    { name: "Czechia",      flag: "🇨🇿", p: 1, w: 0, d: 0, l: 1, gf: 1, ga: 2, status: "CONT" },
    { name: "South Africa", flag: "🇿🇦", p: 1, w: 0, d: 0, l: 1, gf: 0, ga: 2, status: "CONT" },
  ],
  // ── Group B — played: Jun 12 (Canada 1-1 Bosnia & Herzegovina) ───────────────────
  B: [
    { name: "Canada",               flag: "🇨🇦", p: 1, w: 0, d: 1, l: 0, gf: 1, ga: 1, status: "CONT" },
    { name: "Bosnia & Herzegovina", flag: "🇧🇦", p: 1, w: 0, d: 1, l: 0, gf: 1, ga: 1, status: "CONT" },
    empty("Switzerland", "🇨🇭"),
    empty("Qatar",        "🇶🇦"),
  ],
  C: [empty("Wales", "🏴󠁧󠁢󠁷󠁬󠁳󠁿"), empty("Saudi Arabia", "🇸🇦"), empty("Brazil", "🇧🇷"), empty("Cameroon", "🇨🇲")],
  D: [empty("USA", "🇺🇸"), empty("Paraguay", "🇵🇾"), empty("Australia", "🇦🇺"), empty("Turkey", "🇹🇷")],
  E: [empty("Germany", "🇩🇪"), empty("Curaçao", "🇨🇼"), empty("Ivory Coast", "🇨🇮"), empty("Ecuador", "🇪🇨")],
  F: [empty("Netherlands", "🇳🇱"), empty("Japan", "🇯🇵"), empty("Sweden", "🇸🇪"), empty("Tunisia", "🇹🇳")],
  G: [empty("Belgium", "🇧🇪"), empty("Egypt", "🇪🇬"), empty("Iran", "🇮🇷"), empty("New Zealand", "🇳🇿")],
  H: [empty("Spain", "🇪🇸"), empty("Cape Verde", "🇨🇻"), empty("Saudi Arabia", "🇸🇦"), empty("Uruguay", "🇺🇾")],
  I: [empty("France", "🇫🇷"), empty("Senegal", "🇸🇳"), empty("Iraq", "🇮🇶"), empty("Norway", "🇳🇴")],
  J: [empty("Argentina", "🇦🇷"), empty("Algeria", "🇩🇿"), empty("Austria", "🇦🇹"), empty("Jordan", "🇯🇴")],
  K: [empty("Portugal", "🇵🇹"), empty("DR Congo", "🇨🇩"), empty("Uzbekistan", "🇺🇿"), empty("Colombia", "🇨🇴")],
  L: [empty("England", "🏴󠁧󠁢󠁥󠁮󠁧󠁿"), empty("Croatia", "🇭🇷"), empty("Ghana", "🇬🇭"), empty("Panama", "🇵🇦")],
};

const GROUP_KEYS: GroupKey[] = ["A","B","C","D","E","F","G","H","I","J","K","L"];

function pts(t: TeamStanding) { return t.w * 3 + t.d; }
function gd(t: TeamStanding) { return t.gf - t.ga; }

function rank(teams: TeamStanding[]) {
  return [...teams].sort((a, b) => pts(b) - pts(a) || gd(b) - gd(a) || b.gf - a.gf || a.name.localeCompare(b.name));
}

function StandingsPage() {
  const [active, setActive] = useState<GroupKey | "ALL">("A");

  return (
    <div style={{ background: WC_BG, minHeight: "100vh" }} className="text-white">
      <NavBar theme="worldcup" />
      <main className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <header className="text-center mb-10">
          <p className="text-[11px] md:text-xs uppercase font-semibold" style={{ color: WC_GOLD, letterSpacing: "0.4em" }}>
            The Tables
          </p>
          <h1 className="font-display mt-3 text-4xl md:text-6xl tracking-tight font-black">
            FIFA WORLD CUP 2026 · GROUP STANDINGS
          </h1>
          <p className="mt-4 text-white/70 text-base md:text-lg">Group Stage: June 11 – June 27</p>
        </header>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {GROUP_KEYS.map(g => {
            const isActive = active === g;
            return (
              <button key={g} onClick={() => setActive(g)}
                className="rounded-full px-3.5 py-2 text-xs md:text-sm font-bold uppercase tracking-widest transition"
                style={{
                  background: isActive ? WC_GOLD : "transparent",
                  color: isActive ? "#0a0a0a" : WC_GOLD,
                  border: `1.5px solid ${WC_GOLD}`,
                  boxShadow: isActive ? `0 0 20px ${WC_GOLD}55` : "none",
                }}>
                Group {g}
              </button>
            );
          })}
          <button onClick={() => setActive("ALL")}
            className="rounded-full px-3.5 py-2 text-xs md:text-sm font-bold uppercase tracking-widest transition"
            style={{
              background: active === "ALL" ? WC_GOLD : "transparent",
              color: active === "ALL" ? "#0a0a0a" : WC_GOLD,
              border: `1.5px solid ${WC_GOLD}`,
              boxShadow: active === "ALL" ? `0 0 20px ${WC_GOLD}55` : "none",
            }}>
            All Groups
          </button>
        </div>

        {active === "ALL" ? (
          <div className="grid gap-8 md:grid-cols-2">
            {GROUP_KEYS.map(g => <GroupTable key={g} g={g} teams={GROUPS[g]} compact />)}
          </div>
        ) : (
          <GroupTable g={active} teams={GROUPS[active]} />
        )}

        <p className="text-center text-white/55 italic mt-10 text-sm">
          Standings update automatically as matches are played. Check back after each game day.
        </p>
      </main>
      <Footer />
    </div>
  );
}

function GroupTable({ g, teams, compact = false }: { g: GroupKey; teams: TeamStanding[]; compact?: boolean }) {
  const ranked = rank(teams);
  return (
    <section className="rounded-xl overflow-hidden" style={{ background: WC_CARD, border: `1px solid ${WC_GOLD}44`, boxShadow: `0 0 30px ${WC_GOLD}15` }}>
      <header className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: `${WC_GOLD}33`, background: "rgba(0,0,0,0.3)" }}>
        <h2 className="font-display text-xl md:text-2xl tracking-wide" style={{ color: WC_GOLD }}>GROUP {g}</h2>
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/60">Top 2 advance</span>
      </header>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-[10px] uppercase tracking-widest text-white/50">
            <tr>
              <th className="text-left px-3 py-2.5">#</th>
              <th className="text-left px-3 py-2.5">Team</th>
              <th className="px-2 py-2.5">P</th>
              <th className="px-2 py-2.5">W</th>
              <th className="px-2 py-2.5">D</th>
              <th className="px-2 py-2.5">L</th>
              {!compact && <th className="px-2 py-2.5">GF</th>}
              {!compact && <th className="px-2 py-2.5">GA</th>}
              <th className="px-2 py-2.5">GD</th>
              <th className="px-2 py-2.5" style={{ color: WC_GOLD }}>Pts</th>
              <th className="px-2 py-2.5">Status</th>
            </tr>
          </thead>
          <tbody>
            {ranked.map((t, i) => (
              <tr key={t.name} className="border-t" style={{ borderColor: `${WC_GOLD}1a`, background: i < 2 ? `${WC_GOLD}0d` : "transparent" }}>
                <td className="px-3 py-2.5 font-display text-lg" style={{ color: i < 2 ? WC_GOLD : "#fff" }}>{i + 1}</td>
                <td className="px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{t.flag}</span>
                    <span className="font-medium">{t.name}</span>
                  </div>
                </td>
                <td className="px-2 py-2.5 text-center tabular-nums">{t.p}</td>
                <td className="px-2 py-2.5 text-center tabular-nums">{t.w}</td>
                <td className="px-2 py-2.5 text-center tabular-nums">{t.d}</td>
                <td className="px-2 py-2.5 text-center tabular-nums">{t.l}</td>
                {!compact && <td className="px-2 py-2.5 text-center tabular-nums">{t.gf}</td>}
                {!compact && <td className="px-2 py-2.5 text-center tabular-nums">{t.ga}</td>}
                <td className="px-2 py-2.5 text-center tabular-nums">{gd(t) > 0 ? `+${gd(t)}` : gd(t)}</td>
                <td className="px-2 py-2.5 text-center font-display text-lg" style={{ color: WC_GOLD }}>{pts(t)}</td>
                <td className="px-2 py-2.5 text-center"><StatusBadge status={t.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function StatusBadge({ status }: { status: TeamStanding["status"] }) {
  const map = {
    ADV: { bg: "#14532d", color: "#86efac", label: "ADV" },
    CONT: { bg: `${WC_GOLD}22`, color: WC_GOLD, label: "CONT" },
    ELIM: { bg: "#3f3f46", color: "#a1a1aa", label: "ELIM" },
  } as const;
  const s = map[status];
  return (
    <span className="inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest"
      style={{ background: s.bg, color: s.color, border: `1px solid ${s.color}55` }}>
      {s.label}
    </span>
  );
}
