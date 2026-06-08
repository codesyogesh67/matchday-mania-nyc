import { createFileRoute } from "@tanstack/react-router";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { WorldCupContent } from "@/components/WorldCupContent";

export const Route = createFileRoute("/worldcup")({
  head: () => ({
    meta: [
      { title: "World Cup 2026 — MatchDay NYC" },
      { name: "description", content: "Where NYC watches the World Cup 2026. Schedules, bars, predictions." },
    ],
  }),
  component: WorldCupPage,
});

function WorldCupPage() {
  return (
    <div>
      <NavBar />
      <WorldCupContent />
      <Footer />
    </div>
  );
}
