import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { WorldCupContent } from "@/components/WorldCupContent";
import { KnicksContent } from "@/components/KnicksContent";
import { getActiveGameDay } from "@/data/gameDayEvents";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MatchDay NYC — NYC's Game Day HQ" },
      { name: "description", content: "Where NYC watches the biggest games. World Cup 2026, Knicks Finals, and every NYC game day." },
    ],
  }),
  component: Index,
});

function Index() {
  // Compute on the client to use the real local "today" without SSR hydration mismatches.
  const [active, setActive] = useState<ReturnType<typeof getActiveGameDay>>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setActive(getActiveGameDay());
    setReady(true);
  }, []);

  if (!ready) {
    return (
      <div style={{ background: "#050a05", minHeight: "100vh" }}>
        <NavBar theme="worldcup" />
        <WorldCupContent />
        <Footer />
      </div>
    );
  }

  if (active?.route === "/knicks") {
    return (
      <div className="bg-[#0a0a0a] min-h-screen">
        <NavBar theme="knicks" />
        <KnicksContent />
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ background: "#050a05", minHeight: "100vh" }}>
      <NavBar theme="worldcup" />
      <WorldCupContent />
      <Footer />
    </div>
  );
}

