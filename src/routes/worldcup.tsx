import { createFileRoute } from "@tanstack/react-router";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { WorldCupContent } from "@/components/WorldCupContent";

export const Route = createFileRoute("/worldcup")({
  head: () => ({
    meta: [
      { title: "FIFA World Cup 2026 — The World Just Landed in New York" },
      { name: "description", content: "48 nations. 104 matches. One city that holds them all. NYC's home for the 2026 FIFA World Cup — schedules, bars, and the daily pulse of the tournament." },
      { property: "og:title", content: "FIFA World Cup 2026 — The World Just Landed in New York" },
      { property: "og:description", content: "48 nations. 104 matches. One city. NYC's home for the 2026 World Cup." },
    ],
  }),
  component: WorldCupPage,
});

function WorldCupPage() {
  return (
    <div style={{ background: "#050a05", minHeight: "100vh" }}>
      <NavBar theme="worldcup" />
      <WorldCupContent />
      <Footer />
    </div>
  );
}
