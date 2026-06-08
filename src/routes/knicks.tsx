import { createFileRoute } from "@tanstack/react-router";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { KnicksContent } from "@/components/KnicksContent";

export const Route = createFileRoute("/knicks")({
  head: () => ({
    meta: [
      { title: "Knicks NBA Finals Game 3 — MatchDay NYC" },
      { name: "description", content: "It's Game Night, New York. NBA Finals Game 3 — Knicks vs Spurs. Where to watch in NYC." },
      { property: "og:title", content: "Knicks Finals Game 3 — MatchDay NYC" },
      { property: "og:description", content: "NYC's HQ for the Knicks NBA Finals run. Tipoff 8:30 PM EDT tonight." },
    ],
  }),
  component: KnicksPage,
});

function KnicksPage() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <NavBar theme="knicks" />
      <KnicksContent />
      <Footer />
    </div>
  );
}
