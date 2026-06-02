import { TEAMS, GROUPS } from "./teams";
import { VENUES, type VenueId } from "./venues";

export type Match = {
  id: string;
  date: string; // ISO
  stage: string; // "Group A", "Round of 32", "Quarter-final", etc.
  group?: string;
  homeId: string;
  awayId: string;
  venue: VenueId;
};

// Helper to build an ISO date with ET hour (EDT = UTC-4 in June/July)
const et = (year: number, month: number, day: number, hour: number, min = 0) => {
  // EDT offset -4
  const utcHour = hour + 4;
  const d = new Date(Date.UTC(year, month - 1, day, utcHour, min));
  return d.toISOString();
};

// Map groups to a rotation of venues for variety
const venueRotation: VenueId[] = [
  "metlife","sofi","att","levis","mercedes","hardrock","lincoln","gillette",
  "arrowhead","lumen","bcplace","bmofield","azteca","akron","monterrey"
];

const kickoffTimes: [number, number][] = [[12,0],[15,0],[18,0],[21,0]];

function groupTeams(g: string) {
  return TEAMS.filter(t => t.group === g).map(t => t.id);
}

// Each group plays 6 matches in round-robin: (1v2,3v4),(1v3,2v4),(1v4,2v3)
const roundPairs: [number, number][][] = [
  [[0,1],[2,3]],
  [[0,2],[1,3]],
  [[0,3],[1,2]],
];

function buildGroupMatches(): Match[] {
  const out: Match[] = [];
  let dayCursor = 11; // June 11
  let month = 6;
  let venueIdx = 0;
  let kickoffIdx = 0;

  GROUPS.forEach((g, gi) => {
    const teams = groupTeams(g);
    roundPairs.forEach((round, ri) => {
      round.forEach(([a, b], pi) => {
        const date = month === 6 && dayCursor > 30
          ? et(2026, 7, dayCursor - 30, kickoffTimes[kickoffIdx][0], kickoffTimes[kickoffIdx][1])
          : et(2026, month, dayCursor, kickoffTimes[kickoffIdx][0], kickoffTimes[kickoffIdx][1]);
        out.push({
          id: `G${g}-R${ri+1}-M${pi+1}`,
          date,
          stage: `Group ${g}`,
          group: g,
          homeId: teams[a],
          awayId: teams[b],
          venue: venueRotation[venueIdx % venueRotation.length],
        });
        venueIdx++;
        kickoffIdx = (kickoffIdx + 1) % kickoffTimes.length;
        if (kickoffIdx === 0) {
          dayCursor++;
          if (dayCursor > 30 && month === 6) { month = 7; dayCursor = 1; }
        }
      });
    });
  });
  return out;
}

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
        id: `${stage.replace(/\s/g,"")}-${i+1}`,
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
