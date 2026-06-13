import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { WatchInNYC, StatusBadge } from "@/components/WorldCupContent";
import { getMatchStatus, todayEtIso, type MatchStatus } from "@/lib/matchStatus";

export const Route = createFileRoute("/schedule")({
  head: () => ({
    meta: [
      { title: "FIFA World Cup 2026 · Full Schedule — MatchDay NYC" },
      { name: "description", content: "Every World Cup 2026 match. Dates, kickoff times, venues, broadcasts. June 11 – July 19. USA · Mexico · Canada." },
    ],
  }),
  component: SchedulePage,
});

const WC_GOLD = "#C9A84C";
const WC_BG = "#050a05";
const WC_CARD = "#0d1f0d";

type Stage =
  | "Group Stage"
  | "Round of 32"
  | "Round of 16"
  | "Quarterfinals"
  | "Semifinals"
  | "Final";

export type Match = {
  stage: Stage;
  group?: string;
  iso: string;
  date: string;
  time: string;
  home: string; homeFlag: string;
  away: string; awayFlag: string;
  venue: string;
  city: string;
  broadcast: string;
  metlife?: boolean;
  tbd?: boolean;
  homeScore?: number;
  awayScore?: number;
};

export const MATCHES: Match[] = [
  // ── June 11 ──────────────────────────────────────────────────────────────
  { stage: "Group Stage", group: "Group A", iso: "2026-06-11", date: "Thu Jun 11", time: "3:00 PM ET",  home: "Mexico",      homeFlag: "🇲🇽", away: "South Africa", awayFlag: "🇿🇦", venue: "Estadio Azteca",          city: "Mexico City",       broadcast: "FOX / Tubi", homeScore: 2, awayScore: 0 },
  { stage: "Group Stage", group: "Group A", iso: "2026-06-11", date: "Thu Jun 11", time: "10:00 PM ET", home: "South Korea", homeFlag: "🇰🇷", away: "Czechia",      awayFlag: "🇨🇿", venue: "Estadio Akron",           city: "Zapopan",           broadcast: "FS1",homeScore: 2, awayScore: 1 },

  // ── June 12 ──────────────────────────────────────────────────────────────
  { stage: "Group Stage", group: "Group B", iso: "2026-06-12", date: "Fri Jun 12", time: "3:00 PM ET",  home: "Canada",      homeFlag: "🇨🇦", away: "Bosnia & Herzegovina", awayFlag: "🇧🇦", venue: "BMO Field",    city: "Toronto",           broadcast: "FOX",homeScore: 1, awayScore: 1 },
  { stage: "Group Stage", group: "Group D", iso: "2026-06-12", date: "Fri Jun 12", time: "9:00 PM ET",  home: "USA",         homeFlag: "🇺🇸", away: "Paraguay",     awayFlag: "🇵🇾", venue: "SoFi Stadium",            city: "Inglewood, CA",     broadcast: "FOX / Tubi",homeScore: 4, awayScore: 1 },

  // ── June 13 ──────────────────────────────────────────────────────────────
  { stage: "Group Stage", group: "Group B", iso: "2026-06-13", date: "Sat Jun 13", time: "3:00 PM ET",  home: "Qatar",       homeFlag: "🇶🇦", away: "Switzerland",  awayFlag: "🇨🇭", venue: "Levi's Stadium",          city: "Santa Clara, CA",   broadcast: "FOX" },
  { stage: "Group Stage", group: "Group C", iso: "2026-06-13", date: "Sat Jun 13", time: "6:00 PM ET",  home: "Brazil",      homeFlag: "🇧🇷", away: "Morocco",      awayFlag: "🇲🇦", venue: "MetLife Stadium",         city: "East Rutherford, NJ", broadcast: "FS1", metlife: true },
  { stage: "Group Stage", group: "Group C", iso: "2026-06-13", date: "Sat Jun 13", time: "9:00 PM ET",  home: "Haiti",       homeFlag: "🇭🇹", away: "Scotland",     awayFlag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", venue: "Gillette Stadium",        city: "Foxborough, MA",    broadcast: "FS1" },

  // ── June 14 ──────────────────────────────────────────────────────────────
  { stage: "Group Stage", group: "Group D", iso: "2026-06-14", date: "Sun Jun 14", time: "12:00 AM ET", home: "Australia",   homeFlag: "🇦🇺", away: "Türkiye",      awayFlag: "🇹🇷", venue: "BC Place",                city: "Vancouver",         broadcast: "FS1" },
  { stage: "Group Stage", group: "Group E", iso: "2026-06-14", date: "Sun Jun 14", time: "1:00 PM ET",  home: "Germany",     homeFlag: "🇩🇪", away: "Curaçao",      awayFlag: "🇨🇼", venue: "NRG Stadium",             city: "Houston, TX",       broadcast: "FOX" },
  { stage: "Group Stage", group: "Group F", iso: "2026-06-14", date: "Sun Jun 14", time: "4:00 PM ET",  home: "Netherlands", homeFlag: "🇳🇱", away: "Japan",        awayFlag: "🇯🇵", venue: "AT&T Stadium",            city: "Arlington, TX",     broadcast: "FOX" },
  { stage: "Group Stage", group: "Group E", iso: "2026-06-14", date: "Sun Jun 14", time: "7:00 PM ET",  home: "Ivory Coast", homeFlag: "🇨🇮", away: "Ecuador",      awayFlag: "🇪🇨", venue: "Lincoln Financial Field", city: "Philadelphia, PA",  broadcast: "FS1" },
  { stage: "Group Stage", group: "Group F", iso: "2026-06-14", date: "Sun Jun 14", time: "10:00 PM ET", home: "Sweden",      homeFlag: "🇸🇪", away: "Tunisia",      awayFlag: "🇹🇳", venue: "Estadio BBVA",            city: "Monterrey",         broadcast: "FS1" },

  // ── June 15 ──────────────────────────────────────────────────────────────
  { stage: "Group Stage", group: "Group H", iso: "2026-06-15", date: "Mon Jun 15", time: "1:00 PM ET",  home: "Spain",       homeFlag: "🇪🇸", away: "Cape Verde",   awayFlag: "🇨🇻", venue: "Mercedes-Benz Stadium",  city: "Atlanta, GA",       broadcast: "FOX" },
  { stage: "Group Stage", group: "Group G", iso: "2026-06-15", date: "Mon Jun 15", time: "3:00 PM ET",  home: "Belgium",     homeFlag: "🇧🇪", away: "Egypt",        awayFlag: "🇪🇬", venue: "Lumen Field",             city: "Seattle, WA",       broadcast: "FOX" },
  { stage: "Group Stage", group: "Group H", iso: "2026-06-15", date: "Mon Jun 15", time: "6:00 PM ET",  home: "Saudi Arabia",homeFlag: "🇸🇦", away: "Uruguay",      awayFlag: "🇺🇾", venue: "Hard Rock Stadium",       city: "Miami Gardens, FL", broadcast: "FS1" },
  { stage: "Group Stage", group: "Group G", iso: "2026-06-15", date: "Mon Jun 15", time: "9:00 PM ET",  home: "Iran",        homeFlag: "🇮🇷", away: "New Zealand",  awayFlag: "🇳🇿", venue: "SoFi Stadium",            city: "Inglewood, CA",     broadcast: "FS1" },

  // ── June 16 ──────────────────────────────────────────────────────────────
  { stage: "Group Stage", group: "Group I", iso: "2026-06-16", date: "Tue Jun 16", time: "3:00 PM ET",  home: "France",      homeFlag: "🇫🇷", away: "Senegal",      awayFlag: "🇸🇳", venue: "MetLife Stadium",         city: "East Rutherford, NJ", broadcast: "FOX", metlife: true },
  { stage: "Group Stage", group: "Group I", iso: "2026-06-16", date: "Tue Jun 16", time: "6:00 PM ET",  home: "Iraq",        homeFlag: "🇮🇶", away: "Norway",       awayFlag: "🇳🇴", venue: "Gillette Stadium",        city: "Foxborough, MA",    broadcast: "FOX" },
  { stage: "Group Stage", group: "Group J", iso: "2026-06-16", date: "Tue Jun 16", time: "9:00 PM ET",  home: "Argentina",   homeFlag: "🇦🇷", away: "Algeria",      awayFlag: "🇩🇿", venue: "Arrowhead Stadium",       city: "Kansas City, MO",   broadcast: "FOX" },

  // ── June 17 ──────────────────────────────────────────────────────────────
  { stage: "Group Stage", group: "Group J", iso: "2026-06-17", date: "Wed Jun 17", time: "12:00 AM ET", home: "Austria",     homeFlag: "🇦🇹", away: "Jordan",       awayFlag: "🇯🇴", venue: "Levi's Stadium",          city: "Santa Clara, CA",   broadcast: "FS1" },
  { stage: "Group Stage", group: "Group K", iso: "2026-06-17", date: "Wed Jun 17", time: "1:00 PM ET",  home: "Portugal",    homeFlag: "🇵🇹", away: "DR Congo",     awayFlag: "🇨🇩", venue: "NRG Stadium",             city: "Houston, TX",       broadcast: "FOX" },
  { stage: "Group Stage", group: "Group L", iso: "2026-06-17", date: "Wed Jun 17", time: "4:00 PM ET",  home: "England",     homeFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", away: "Croatia",      awayFlag: "🇭🇷", venue: "AT&T Stadium",            city: "Arlington, TX",     broadcast: "FOX" },
  { stage: "Group Stage", group: "Group L", iso: "2026-06-17", date: "Wed Jun 17", time: "7:00 PM ET",  home: "Ghana",       homeFlag: "🇬🇭", away: "Panama",       awayFlag: "🇵🇦", venue: "BMO Field",               city: "Toronto",           broadcast: "FS1" },
  { stage: "Group Stage", group: "Group K", iso: "2026-06-17", date: "Wed Jun 17", time: "10:00 PM ET", home: "Uzbekistan",  homeFlag: "🇺🇿", away: "Colombia",     awayFlag: "🇨🇴", venue: "Estadio Azteca",          city: "Mexico City",       broadcast: "FS1" },

  // ── June 18 ──────────────────────────────────────────────────────────────
  { stage: "Group Stage", group: "Group A", iso: "2026-06-18", date: "Thu Jun 18", time: "12:00 PM ET", home: "Czechia",     homeFlag: "🇨🇿", away: "South Africa", awayFlag: "🇿🇦", venue: "Mercedes-Benz Stadium",  city: "Atlanta, GA",       broadcast: "FOX" },
  { stage: "Group Stage", group: "Group B", iso: "2026-06-18", date: "Thu Jun 18", time: "3:00 PM ET",  home: "Switzerland", homeFlag: "🇨🇭", away: "Bosnia & Herzegovina", awayFlag: "🇧🇦", venue: "SoFi Stadium", city: "Inglewood, CA",  broadcast: "FOX" },
  { stage: "Group Stage", group: "Group B", iso: "2026-06-18", date: "Thu Jun 18", time: "6:00 PM ET",  home: "Canada",      homeFlag: "🇨🇦", away: "Qatar",        awayFlag: "🇶🇦", venue: "BC Place",                city: "Vancouver",         broadcast: "FS1" },
  { stage: "Group Stage", group: "Group A", iso: "2026-06-18", date: "Thu Jun 18", time: "9:00 PM ET",  home: "Mexico",      homeFlag: "🇲🇽", away: "South Korea",  awayFlag: "🇰🇷", venue: "Estadio Akron",           city: "Zapopan",           broadcast: "FOX" },

  // ── June 19 ──────────────────────────────────────────────────────────────
  { stage: "Group Stage", group: "Group D", iso: "2026-06-19", date: "Fri Jun 19", time: "3:00 PM ET",  home: "USA",         homeFlag: "🇺🇸", away: "Australia",    awayFlag: "🇦🇺", venue: "Lumen Field",             city: "Seattle, WA",       broadcast: "FOX" },
  { stage: "Group Stage", group: "Group C", iso: "2026-06-19", date: "Fri Jun 19", time: "6:00 PM ET",  home: "Scotland",    homeFlag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", away: "Morocco",     awayFlag: "🇲🇦", venue: "Gillette Stadium",        city: "Foxborough, MA",    broadcast: "FOX" },
  { stage: "Group Stage", group: "Group C", iso: "2026-06-19", date: "Fri Jun 19", time: "8:30 PM ET",  home: "Brazil",      homeFlag: "🇧🇷", away: "Haiti",        awayFlag: "🇭🇹", venue: "Lincoln Financial Field", city: "Philadelphia, PA",  broadcast: "FOX" },
  { stage: "Group Stage", group: "Group D", iso: "2026-06-19", date: "Fri Jun 19", time: "11:00 PM ET", home: "Türkiye",     homeFlag: "🇹🇷", away: "Paraguay",     awayFlag: "🇵🇾", venue: "Levi's Stadium",          city: "Santa Clara, CA",   broadcast: "FS1" },

  // ── June 20 ──────────────────────────────────────────────────────────────
  { stage: "Group Stage", group: "Group F", iso: "2026-06-20", date: "Sat Jun 20", time: "1:00 PM ET",  home: "Netherlands", homeFlag: "🇳🇱", away: "Sweden",       awayFlag: "🇸🇪", venue: "NRG Stadium",             city: "Houston, TX",       broadcast: "FOX" },
  { stage: "Group Stage", group: "Group E", iso: "2026-06-20", date: "Sat Jun 20", time: "4:00 PM ET",  home: "Germany",     homeFlag: "🇩🇪", away: "Ivory Coast",  awayFlag: "🇨🇮", venue: "BMO Field",               city: "Toronto",           broadcast: "FOX" },
  { stage: "Group Stage", group: "Group E", iso: "2026-06-20", date: "Sat Jun 20", time: "8:00 PM ET",  home: "Ecuador",     homeFlag: "🇪🇨", away: "Curaçao",      awayFlag: "🇨🇼", venue: "Arrowhead Stadium",       city: "Kansas City, MO",   broadcast: "FS1" },

  // ── June 21 ──────────────────────────────────────────────────────────────
  { stage: "Group Stage", group: "Group F", iso: "2026-06-21", date: "Sun Jun 21", time: "12:00 AM ET", home: "Tunisia",     homeFlag: "🇹🇳", away: "Japan",        awayFlag: "🇯🇵", venue: "Estadio BBVA",            city: "Monterrey",         broadcast: "FS1" },
  { stage: "Group Stage", group: "Group H", iso: "2026-06-21", date: "Sun Jun 21", time: "12:00 PM ET", home: "Spain",       homeFlag: "🇪🇸", away: "Saudi Arabia", awayFlag: "🇸🇦", venue: "Mercedes-Benz Stadium",  city: "Atlanta, GA",       broadcast: "FOX" },
  { stage: "Group Stage", group: "Group G", iso: "2026-06-21", date: "Sun Jun 21", time: "3:00 PM ET",  home: "Belgium",     homeFlag: "🇧🇪", away: "Iran",         awayFlag: "🇮🇷", venue: "SoFi Stadium",            city: "Inglewood, CA",     broadcast: "FOX" },
  { stage: "Group Stage", group: "Group H", iso: "2026-06-21", date: "Sun Jun 21", time: "6:00 PM ET",  home: "Uruguay",     homeFlag: "🇺🇾", away: "Cape Verde",   awayFlag: "🇨🇻", venue: "Hard Rock Stadium",       city: "Miami Gardens, FL", broadcast: "FOX" },
  { stage: "Group Stage", group: "Group G", iso: "2026-06-21", date: "Sun Jun 21", time: "9:00 PM ET",  home: "New Zealand", homeFlag: "🇳🇿", away: "Egypt",        awayFlag: "🇪🇬", venue: "BC Place",                city: "Vancouver",         broadcast: "FS1" },

  // ── June 22 ──────────────────────────────────────────────────────────────
  { stage: "Group Stage", group: "Group J", iso: "2026-06-22", date: "Mon Jun 22", time: "1:00 PM ET",  home: "Argentina",   homeFlag: "🇦🇷", away: "Austria",      awayFlag: "🇦🇹", venue: "AT&T Stadium",            city: "Arlington, TX",     broadcast: "FOX" },
  { stage: "Group Stage", group: "Group I", iso: "2026-06-22", date: "Mon Jun 22", time: "5:00 PM ET",  home: "France",      homeFlag: "🇫🇷", away: "Iraq",         awayFlag: "🇮🇶", venue: "Lincoln Financial Field", city: "Philadelphia, PA",  broadcast: "FOX" },
  { stage: "Group Stage", group: "Group I", iso: "2026-06-22", date: "Mon Jun 22", time: "8:00 PM ET",  home: "Norway",      homeFlag: "🇳🇴", away: "Senegal",      awayFlag: "🇸🇳", venue: "MetLife Stadium",         city: "East Rutherford, NJ", broadcast: "FOX", metlife: true },
  { stage: "Group Stage", group: "Group J", iso: "2026-06-22", date: "Mon Jun 22", time: "11:00 PM ET", home: "Jordan",      homeFlag: "🇯🇴", away: "Algeria",      awayFlag: "🇩🇿", venue: "Levi's Stadium",          city: "Santa Clara, CA",   broadcast: "FS1" },

  // ── June 23 ──────────────────────────────────────────────────────────────
  { stage: "Group Stage", group: "Group K", iso: "2026-06-23", date: "Tue Jun 23", time: "1:00 PM ET",  home: "Portugal",    homeFlag: "🇵🇹", away: "Uzbekistan",   awayFlag: "🇺🇿", venue: "NRG Stadium",             city: "Houston, TX",       broadcast: "FOX" },
  { stage: "Group Stage", group: "Group L", iso: "2026-06-23", date: "Tue Jun 23", time: "4:00 PM ET",  home: "England",     homeFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", away: "Ghana",       awayFlag: "🇬🇭", venue: "Gillette Stadium",        city: "Foxborough, MA",    broadcast: "FOX" },
  { stage: "Group Stage", group: "Group L", iso: "2026-06-23", date: "Tue Jun 23", time: "7:00 PM ET",  home: "Panama",      homeFlag: "🇵🇦", away: "Croatia",      awayFlag: "🇭🇷", venue: "BMO Field",               city: "Toronto",           broadcast: "FS1" },
  { stage: "Group Stage", group: "Group K", iso: "2026-06-23", date: "Tue Jun 23", time: "10:00 PM ET", home: "Colombia",    homeFlag: "🇨🇴", away: "DR Congo",     awayFlag: "🇨🇩", venue: "Estadio Akron",           city: "Zapopan",           broadcast: "FS1" },

  // ── June 24 (Final Group Matchday – simultaneous pairs) ──────────────────
  { stage: "Group Stage", group: "Group B", iso: "2026-06-24", date: "Wed Jun 24", time: "3:00 PM ET",  home: "Switzerland", homeFlag: "🇨🇭", away: "Canada",       awayFlag: "🇨🇦", venue: "BC Place",                city: "Vancouver",         broadcast: "FOX" },
  { stage: "Group Stage", group: "Group B", iso: "2026-06-24", date: "Wed Jun 24", time: "3:00 PM ET",  home: "Bosnia & Herzegovina", homeFlag: "🇧🇦", away: "Qatar", awayFlag: "🇶🇦", venue: "Lumen Field",           city: "Seattle, WA",       broadcast: "FS1" },
  { stage: "Group Stage", group: "Group C", iso: "2026-06-24", date: "Wed Jun 24", time: "6:00 PM ET",  home: "Scotland",    homeFlag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", away: "Brazil",     awayFlag: "🇧🇷", venue: "Hard Rock Stadium",       city: "Miami Gardens, FL", broadcast: "FOX" },
  { stage: "Group Stage", group: "Group C", iso: "2026-06-24", date: "Wed Jun 24", time: "6:00 PM ET",  home: "Morocco",     homeFlag: "🇲🇦", away: "Haiti",        awayFlag: "🇭🇹", venue: "Mercedes-Benz Stadium",  city: "Atlanta, GA",       broadcast: "FS1" },
  { stage: "Group Stage", group: "Group A", iso: "2026-06-24", date: "Wed Jun 24", time: "9:00 PM ET",  home: "Czechia",     homeFlag: "🇨🇿", away: "Mexico",       awayFlag: "🇲🇽", venue: "Estadio Azteca",          city: "Mexico City",       broadcast: "FOX" },
  { stage: "Group Stage", group: "Group A", iso: "2026-06-24", date: "Wed Jun 24", time: "9:00 PM ET",  home: "South Africa",homeFlag: "🇿🇦", away: "South Korea",  awayFlag: "🇰🇷", venue: "Estadio BBVA",            city: "Monterrey",         broadcast: "FS1" },

  // ── June 25 (Final Group Matchday – simultaneous pairs) ──────────────────
  { stage: "Group Stage", group: "Group E", iso: "2026-06-25", date: "Thu Jun 25", time: "4:00 PM ET",  home: "Curaçao",     homeFlag: "🇨🇼", away: "Ivory Coast",  awayFlag: "🇨🇮", venue: "Lincoln Financial Field", city: "Philadelphia, PA",  broadcast: "FS1" },
  { stage: "Group Stage", group: "Group E", iso: "2026-06-25", date: "Thu Jun 25", time: "4:00 PM ET",  home: "Ecuador",     homeFlag: "🇪🇨", away: "Germany",      awayFlag: "🇩🇪", venue: "MetLife Stadium",         city: "East Rutherford, NJ", broadcast: "FOX", metlife: true },
  { stage: "Group Stage", group: "Group F", iso: "2026-06-25", date: "Thu Jun 25", time: "7:00 PM ET",  home: "Japan",       homeFlag: "🇯🇵", away: "Sweden",       awayFlag: "🇸🇪", venue: "AT&T Stadium",            city: "Arlington, TX",     broadcast: "FOX" },
  { stage: "Group Stage", group: "Group F", iso: "2026-06-25", date: "Thu Jun 25", time: "7:00 PM ET",  home: "Tunisia",     homeFlag: "🇹🇳", away: "Netherlands",  awayFlag: "🇳🇱", venue: "Arrowhead Stadium",       city: "Kansas City, MO",   broadcast: "FS1" },
  { stage: "Group Stage", group: "Group D", iso: "2026-06-25", date: "Thu Jun 25", time: "10:00 PM ET", home: "Türkiye",     homeFlag: "🇹🇷", away: "USA",          awayFlag: "🇺🇸", venue: "SoFi Stadium",            city: "Inglewood, CA",     broadcast: "FOX" },
  { stage: "Group Stage", group: "Group D", iso: "2026-06-25", date: "Thu Jun 25", time: "10:00 PM ET", home: "Paraguay",    homeFlag: "🇵🇾", away: "Australia",    awayFlag: "🇦🇺", venue: "Levi's Stadium",          city: "Santa Clara, CA",   broadcast: "FS1" },

  // ── June 26 (Final Group Matchday – simultaneous pairs) ──────────────────
  { stage: "Group Stage", group: "Group I", iso: "2026-06-26", date: "Fri Jun 26", time: "3:00 PM ET",  home: "Norway",      homeFlag: "🇳🇴", away: "France",       awayFlag: "🇫🇷", venue: "Gillette Stadium",        city: "Foxborough, MA",    broadcast: "FOX" },
  { stage: "Group Stage", group: "Group I", iso: "2026-06-26", date: "Fri Jun 26", time: "3:00 PM ET",  home: "Senegal",     homeFlag: "🇸🇳", away: "Iraq",         awayFlag: "🇮🇶", venue: "BMO Field",               city: "Toronto",           broadcast: "FS1" },
  { stage: "Group Stage", group: "Group H", iso: "2026-06-26", date: "Fri Jun 26", time: "8:00 PM ET",  home: "Cape Verde",  homeFlag: "🇨🇻", away: "Saudi Arabia", awayFlag: "🇸🇦", venue: "NRG Stadium",             city: "Houston, TX",       broadcast: "FOX" },
  { stage: "Group Stage", group: "Group H", iso: "2026-06-26", date: "Fri Jun 26", time: "8:00 PM ET",  home: "Uruguay",     homeFlag: "🇺🇾", away: "Spain",        awayFlag: "🇪🇸", venue: "Estadio Akron",           city: "Zapopan",           broadcast: "FS1" },
  { stage: "Group Stage", group: "Group G", iso: "2026-06-26", date: "Fri Jun 26", time: "11:00 PM ET", home: "Egypt",       homeFlag: "🇪🇬", away: "Iran",         awayFlag: "🇮🇷", venue: "Lumen Field",             city: "Seattle, WA",       broadcast: "FOX" },
  { stage: "Group Stage", group: "Group G", iso: "2026-06-26", date: "Fri Jun 26", time: "11:00 PM ET", home: "New Zealand", homeFlag: "🇳🇿", away: "Belgium",      awayFlag: "🇧🇪", venue: "BC Place",                city: "Vancouver",         broadcast: "FS1" },

  // ── June 27 (Final Group Matchday – simultaneous pairs) ──────────────────
  { stage: "Group Stage", group: "Group L", iso: "2026-06-27", date: "Sat Jun 27", time: "5:00 PM ET",  home: "Panama",      homeFlag: "🇵🇦", away: "England",      awayFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", venue: "MetLife Stadium",         city: "East Rutherford, NJ", broadcast: "FOX", metlife: true },
  { stage: "Group Stage", group: "Group L", iso: "2026-06-27", date: "Sat Jun 27", time: "5:00 PM ET",  home: "Croatia",     homeFlag: "🇭🇷", away: "Ghana",        awayFlag: "🇬🇭", venue: "Lincoln Financial Field", city: "Philadelphia, PA",  broadcast: "FS1" },
  { stage: "Group Stage", group: "Group K", iso: "2026-06-27", date: "Sat Jun 27", time: "7:30 PM ET",  home: "Colombia",    homeFlag: "🇨🇴", away: "Portugal",     awayFlag: "🇵🇹", venue: "Hard Rock Stadium",       city: "Miami Gardens, FL", broadcast: "FOX" },
  { stage: "Group Stage", group: "Group K", iso: "2026-06-27", date: "Sat Jun 27", time: "7:30 PM ET",  home: "DR Congo",    homeFlag: "🇨🇩", away: "Uzbekistan",   awayFlag: "🇺🇿", venue: "Mercedes-Benz Stadium",  city: "Atlanta, GA",       broadcast: "FS1" },
  { stage: "Group Stage", group: "Group J", iso: "2026-06-27", date: "Sat Jun 27", time: "10:00 PM ET", home: "Algeria",     homeFlag: "🇩🇿", away: "Austria",      awayFlag: "🇦🇹", venue: "Arrowhead Stadium",       city: "Kansas City, MO",   broadcast: "FOX" },
  { stage: "Group Stage", group: "Group J", iso: "2026-06-27", date: "Sat Jun 27", time: "10:00 PM ET", home: "Jordan",      homeFlag: "🇯🇴", away: "Argentina",    awayFlag: "🇦🇷", venue: "AT&T Stadium",            city: "Arlington, TX",     broadcast: "FS1" },
];

const KNOCKOUT_PLACEHOLDERS: { stage: Stage; window: string; note?: string; metlife?: boolean }[] = [
  { stage: "Round of 32", window: "June 28 – July 3", note: "Top 2 from each group + 8 best 3rd-place teams advance" },
  { stage: "Round of 16", window: "July 4 – July 7" },
  { stage: "Quarterfinals", window: "July 9 – July 11" },
  { stage: "Semifinals", window: "July 14 – July 15" },
  { stage: "Final", window: "Bronze Match July 18 · FINAL July 19", note: "FINAL at MetLife Stadium, East Rutherford NJ", metlife: true },
];

const STAGES: Stage[] = ["Group Stage", "Round of 32", "Round of 16", "Quarterfinals", "Semifinals", "Final"];

function SchedulePage() {
  const [stage, setStage] = useState<Stage>("Group Stage");
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(id);
  }, []);

  // Scroll to today's section on load
  useEffect(() => {
    const todayEl = document.getElementById("today-section");
    if (todayEl) todayEl.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const groupMatchesByDate = useMemo(() => {
    const order: Record<MatchStatus, number> = { live: 0, upcoming: 1, ft: 2 };
    const map = new Map<string, { date: string; iso: string; matches: Match[] }>();
    MATCHES.forEach(m => {
      if (!map.has(m.date)) map.set(m.date, { date: m.date, iso: m.iso, matches: [] });
      map.get(m.date)!.matches.push(m);
    });
    map.forEach(({ matches }) => {
      matches.sort((a, b) => {
        const sa = getMatchStatus(a.iso, a.time, now).status;
        const sb = getMatchStatus(b.iso, b.time, now).status;
        return order[sa] - order[sb];
      });
    });
    return Array.from(map.values());
  }, [now]);

  const todayIso = todayEtIso(now);

  return (
    <div style={{ background: WC_BG, minHeight: "100vh" }} className="text-white">
      <NavBar theme="worldcup" />
      <main className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <header className="text-center mb-10">
          <p className="text-[11px] md:text-xs uppercase font-semibold" style={{ color: WC_GOLD, letterSpacing: "0.4em" }}>
            The Fixtures
          </p>
          <h1 className="font-display mt-3 text-4xl md:text-6xl tracking-tight font-black">
            FIFA WORLD CUP 2026 · FULL SCHEDULE
          </h1>
          <p className="mt-4 text-white/70 text-base md:text-lg">
            June 11 – July 19 · USA · Mexico · Canada
          </p>
        </header>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {STAGES.map(s => {
            const active = s === stage;
            return (
              <button
                key={s}
                onClick={() => setStage(s)}
                className="rounded-full px-4 py-2 text-xs md:text-sm font-bold uppercase tracking-widest transition"
                style={{
                  background: active ? WC_GOLD : "transparent",
                  color: active ? "#0a0a0a" : WC_GOLD,
                  border: `1.5px solid ${WC_GOLD}`,
                  boxShadow: active ? `0 0 20px ${WC_GOLD}55` : "none",
                }}
              >
                {s}
              </button>
            );
          })}
        </div>

        {stage === "Group Stage" ? (
          <div className="space-y-12">
            {groupMatchesByDate.map(({ date, iso, matches }) => {
              const isToday = iso === todayIso;
              return (
                <section key={date} id={isToday ? "today-section" : undefined}>
                  <div className="flex items-center gap-4 mb-4">
                    <h2
                      className="font-display text-2xl md:text-3xl tracking-wide"
                      style={{ color: isToday ? "#ffffff" : WC_GOLD }}
                    >
                      {date}
                      {isToday && (
                        <span
                          className="ml-3 text-xs font-bold uppercase tracking-widest rounded-full px-3 py-1 align-middle"
                          style={{ background: WC_GOLD, color: "#0a0a0a" }}
                        >
                          TODAY
                        </span>
                      )}
                    </h2>
                    <div
                      className="flex-1 h-px"
                      style={{
                        background: isToday
                          ? `linear-gradient(90deg, #ffffff88, transparent)`
                          : `linear-gradient(90deg, ${WC_GOLD}88, transparent)`,
                      }}
                    />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    {matches.map((m, i) => <MatchCard key={i} m={m} now={now} />)}
                  </div>
                </section>
              );
            })}
          </div>
        ) : (
          <KnockoutView stage={stage} />
        )}

        <div className="text-center mt-16">
          <a href="#bars" className="inline-block rounded-md px-7 py-3.5 font-bold uppercase tracking-widest text-sm transition hover:brightness-110"
            style={{ background: WC_GOLD, color: "#0a0a0a", boxShadow: `0 0 28px ${WC_GOLD}55` }}>
            🍺 Find a Bar in NYC
          </a>
        </div>
      </main>

      <WatchInNYC />
      <Footer />
    </div>
  );
}

function MatchCard({ m, now }: { m: Match; now: number }) {
  const s = getMatchStatus(m.iso, m.time, now);
  const isLive = s.status === "live";
  const isFt = s.status === "ft";
  return (
    <article
      className={`rounded-xl overflow-hidden relative ${isLive ? "animate-pulse-glow" : ""}`}
      style={{
        background: WC_CARD,
        border: isLive || m.metlife ? `2px solid ${WC_GOLD}` : `1px solid ${WC_GOLD}44`,
        boxShadow: isLive ? `0 0 50px ${WC_GOLD}80` : m.metlife ? `0 0 40px ${WC_GOLD}55` : `0 0 20px ${WC_GOLD}10`,
        opacity: isFt ? 0.65 : 1,
      }}
    >
      {m.metlife && (
        <div className="absolute top-3 right-3 z-10 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest"
          style={{ background: WC_GOLD, color: "#0a0a0a", boxShadow: `0 0 16px ${WC_GOLD}` }}>
          ⭐ NYC Area
        </div>
      )}
      <div className="flex items-center justify-between px-5 py-2.5 border-b" style={{ borderColor: `${WC_GOLD}33`, background: "rgba(0,0,0,0.3)" }}>
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold" style={{ color: WC_GOLD }}>{m.group ?? m.stage}</span>
        <StatusBadge status={s.status} time={m.time} minutesPlayed={s.minutesPlayed} />
      </div>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-5">
        <div className="text-right">
          <div className="text-3xl md:text-4xl">{m.homeFlag}</div>
          <p className="font-display tracking-wide mt-1.5 text-base md:text-lg font-bold">{m.home}</p>
        </div>
        <div className="font-display text-lg text-white/40">
          {(isFt || isLive) && m.homeScore != null && m.awayScore != null
            ? <span className="text-white">{m.homeScore}–{m.awayScore}</span>
            : "VS"}
        </div>
        <div className="text-left">
          <div className="text-3xl md:text-4xl">{m.awayFlag}</div>
          <p className="font-display tracking-wide mt-1.5 text-base md:text-lg font-bold">{m.away}</p>
        </div>
      </div>
      <div className="px-5 py-3 border-t text-xs md:text-sm text-white/80 space-y-1 flex items-center justify-between gap-3" style={{ borderColor: `${WC_GOLD}22`, background: "rgba(0,0,0,0.25)" }}>
        <div className="space-y-0.5">
          <div>📍 {m.venue} · {m.city}</div>
          <div>📺 <span style={{ color: WC_GOLD }}>{m.broadcast}</span></div>
        </div>
        <a href="#bars" className="shrink-0 text-[11px] font-bold uppercase tracking-widest whitespace-nowrap hover:underline" style={{ color: WC_GOLD }}>
          Find a Bar →
        </a>
      </div>
    </article>
  );
}

function KnockoutView({ stage }: { stage: Stage }) {
  const k = KNOCKOUT_PLACEHOLDERS.find(x => x.stage === stage);
  if (!k) return null;
  return (
    <div className="max-w-2xl mx-auto">
      <article
        className="rounded-xl p-8 md:p-12 text-center"
        style={{
          background: WC_CARD,
          border: k.metlife ? `2px solid ${WC_GOLD}` : `1px solid ${WC_GOLD}44`,
          boxShadow: k.metlife ? `0 0 60px ${WC_GOLD}55` : `0 0 30px ${WC_GOLD}10`,
        }}
      >
        {k.metlife && (
          <div className="inline-block rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest mb-4"
            style={{ background: WC_GOLD, color: "#0a0a0a" }}>
            ⭐ NYC Area Game
          </div>
        )}
        <h2 className="font-display text-3xl md:text-5xl font-black tracking-tight" style={{ color: WC_GOLD }}>{stage}</h2>
        <p className="mt-4 text-white/80 text-lg md:text-xl">{k.window}</p>
        {k.note && <p className="mt-4 text-white/60 max-w-md mx-auto">{k.note}</p>}
        <p className="mt-8 text-xs uppercase tracking-widest text-white/40">Bracket finalizes after Group Stage · June 27</p>
      </article>
    </div>
  );
}
