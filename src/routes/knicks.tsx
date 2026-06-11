import { createFileRoute } from "@tanstack/react-router";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { KnicksContent } from "@/components/KnicksContent";

export const Route = createFileRoute("/knicks")({
  head: () => ({
    meta: [
      { title: "Knicks NBA Finals — One Win Away · MatchDay NYC" },
      { name: "description", content: "Knicks 107, Spurs 106. Greatest comeback in Finals history. NYK leads 3-1. Game 5 Saturday 8:30 PM ET." },
      { property: "og:title", content: "Knicks Finals — One Win From the Championship" },
      { property: "og:description", content: "Down 29 at halftime. Knicks roar back to take a 3-1 series lead. Game 5 Saturday in San Antonio." },
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
