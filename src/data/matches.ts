import { TEAMS } from "./teams";
import { VENUES, type VenueId } from "./venues";

export type Match = {
  id: string;
  date: string; // ISO
  stage: string;
  group?: string;
  homeId: string;
  awayId: string;
  venue: VenueId;
};

// EDT = UTC-4 in June/July
const et = (year: number, month: number, day: number, hour: number, min = 0) => {
  const utcHour = hour + 4;
  const d = new Date(Date.UTC(year, month - 1, day, utcHour, min));
  return d.toISOString();
};

type Fix = [string, number, number, string, string, VenueId, string];
// [day(YYYY-MM-DD), hour, min, homeId, awayId, venue, group]

const groupFixtures: Fix[] = [
  // June 11 — Group A
  ["2026-06-11", 15, 0, "mex", "rsa", "azteca", "A"],
  ["2026-06-11", 22, 0, "kor", "cze", "akron", "A"],
  // June 12
  ["2026-06-12", 15, 0, "can", "bih", "bmofield", "B"],
  ["2026-06-12", 21, 0, "usa", "par", "sofi", "D"],
  // June 13
  ["2026-06-13", 15, 0, "qat", "sui", "levis", "B"],
  ["2026-06-13", 18, 0, "bra", "mar", "metlife", "C"],
  ["2026-06-13", 21, 0, "hai", "sco", "gillette", "C"],
  // June 14
  ["2026-06-14", 0, 0, "aus", "tur", "bcplace", "D"],
  ["2026-06-14", 13, 0, "ger", "cuw", "nrg", "E"],
  ["2026-06-14", 16, 0, "ned", "jpn", "att", "F"],
  ["2026-06-14", 19, 0, "civ", "ecu", "lincoln", "E"],
  ["2026-06-14", 22, 0, "swe", "tun", "monterrey", "F"],
  // June 15
  ["2026-06-15", 12, 0, "esp", "cpv", "mercedes", "H"],
  ["2026-06-15", 15, 0, "bel", "egy", "lumen", "G"],
  ["2026-06-15", 18, 0, "ksa", "uru", "hardrock", "H"],
  ["2026-06-15", 21, 0, "irn", "nzl", "sofi", "G"],
  // June 16
  ["2026-06-16", 15, 0, "fra", "sen", "metlife", "I"],
  ["2026-06-16", 18, 0, "irq", "nor", "gillette", "I"],
  ["2026-06-16", 21, 0, "arg", "alg", "arrowhead", "J"],
  // June 17
  ["2026-06-17", 0, 0, "aut", "jor", "levis", "J"],
  ["2026-06-17", 13, 0, "por", "cod", "nrg", "K"],
  ["2026-06-17", 16, 0, "eng", "cro", "att", "L"],
  ["2026-06-17", 19, 0, "gha", "pan", "bmofield", "L"],
  ["2026-06-17", 22, 0, "uzb", "col", "azteca", "K"],
  // June 18
  ["2026-06-18", 12, 0, "cze", "rsa", "mercedes", "A"],
  ["2026-06-18", 15, 0, "sui", "bih", "sofi", "B"],
  ["2026-06-18", 18, 0, "can", "qat", "bcplace", "B"],
  ["2026-06-18", 21, 0, "mex", "kor", "akron", "A"],
  // June 19
  ["2026-06-19", 15, 0, "usa", "aus", "lumen", "D"],
  ["2026-06-19", 18, 0, "sco", "mar", "gillette", "C"],
  ["2026-06-19", 20, 30, "bra", "hai", "lincoln", "C"],
  ["2026-06-19", 23, 0, "tur", "par", "levis", "D"],
  // June 20
  ["2026-06-20", 13, 0, "ned", "swe", "nrg", "F"],
  ["2026-06-20", 16, 0, "ger", "civ", "bmofield", "E"],
  ["2026-06-20", 20, 0, "ecu", "cuw", "arrowhead", "E"],
  // June 21
  ["2026-06-21", 0, 0, "tun", "jpn", "monterrey", "F"],
  ["2026-06-21", 12, 0, "esp", "ksa", "mercedes", "H"],
  ["2026-06-21", 15, 0, "bel", "irn", "sofi", "G"],
  ["2026-06-21", 18, 0, "uru", "cpv", "hardrock", "H"],
  ["2026-06-21", 21, 0, "nzl", "egy", "bcplace", "G"],
  // June 22
  ["2026-06-22", 13, 0, "arg", "aut", "att", "J"],
  ["2026-06-22", 17, 0, "fra", "irq", "lincoln", "I"],
  ["2026-06-22", 20, 0, "nor", "sen", "metlife", "I"],
  ["2026-06-22", 23, 0, "jor", "alg", "levis", "J"],
];

function buildGroupMatches(): Match[] {
  return groupFixtures.map(([d, h, m, home, away, venue, group], i) => {
    const [y, mo, da] = d.split("-").map(Number);
    return {
      id: `G${group}-${i + 1}`,
      date: et(y, mo, da, h, m),
      stage: `Group ${group}`,
      group,
      homeId: home,
      awayId: away,
      venue,
    };
  });
}

const venueRotation: VenueId[] = [
  "metlife","sofi","att","levis","mercedes","hardrock","lincoln","gillette",
  "arrowhead","lumen","bcplace","bmofield","azteca","akron","monterrey","nrg",
];

function buildKnockoutMatches(): Match[] {
  const out: Match[] = [];
  const stages: { stage: string; count: number; startDay: number; startMonth: number }[] = [
    { stage: "Round of 32", count: 16, startDay: 28, startMonth: 6 },
    { stage: "Round of 16", count: 8, startDay: 4, startMonth: 7 },
    { stage: "Quarter-final", count: 4, startDay: 9, startMonth: 7 },
    { stage: "Semi-final", count: 2, startDay: 14, startMonth: 7 },
    { stage: "Third place", count: 1, startDay: 18, startMonth: 7 },
    { stage: "Final", count: 1, startDay: 19, startMonth: 7 },
  ];
  let venueIdx = 0;
  stages.forEach(({ stage, count, startDay, startMonth }) => {
    for (let i = 0; i < count; i++) {
      const day = startDay + Math.floor(i / 2);
      const hour = i % 2 === 0 ? 15 : 19;
      out.push({
        id: `${stage.replace(/\s/g, "")}-${i + 1}`,
        date: et(2026, startMonth, day, hour),
        stage,
        homeId: "tbd",
        awayId: "tbd",
        venue: stage === "Final" ? "metlife" : venueRotation[venueIdx % venueRotation.length],
      });
      venueIdx++;
    }
  });
  return out;
}

export const MATCHES: Match[] = [...buildGroupMatches(), ...buildKnockoutMatches()];

export function getTeamForMatch(id: string) {
  if (id === "tbd") return { id: "tbd", name: "TBD", flag: "❔" };
  return TEAMS.find(t => t.id === id) ?? { id: "tbd", name: "TBD", flag: "❔" };
}

export function getVenue(id: VenueId) {
  return VENUES[id];
}
