import { Link } from "@tanstack/react-router";
import { useState } from "react";

export function NavBar() {
  const [open, setOpen] = useState(false);
  const links: { to: string; label: string; soon?: boolean }[] = [
    { to: "/schedule", label: "Schedule" },
    { to: "/standings", label: "Standings" },
    { to: "/teams", label: "Teams" },
    { to: "/bars", label: "Bars" },
    { to: "/league", label: "Prediction League", soon: true },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 backdrop-blur-xl bg-background/70">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 font-display text-2xl tracking-wider">
          <span className="text-2xl">⚽</span>
          <span>
            MATCHDAY <span className="text-[var(--electric)] text-glow-green">NYC</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className="relative px-3 py-2 text-sm font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground transition"
              activeProps={{ className: "text-[var(--electric)]" }}
            >
              {l.label}
              {l.soon && <span className="ml-2 rounded-full bg-[var(--gold)] px-2 py-0.5 text-[10px] font-bold text-background">SOON</span>}
            </Link>
          ))}
        </nav>

        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground p-2">
          <span className="block w-6 h-0.5 bg-current mb-1.5"></span>
          <span className="block w-6 h-0.5 bg-current mb-1.5"></span>
          <span className="block w-6 h-0.5 bg-current"></span>
        </button>
      </div>
      {open && (
        <nav className="md:hidden border-t border-border bg-background/95 px-4 py-3 flex flex-col gap-1">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="px-3 py-2 text-sm font-medium uppercase tracking-wider text-muted-foreground hover:text-[var(--electric)]"
              activeProps={{ className: "text-[var(--electric)]" }}
            >
              {l.label} {l.soon && <span className="ml-2 rounded-full bg-[var(--gold)] px-2 py-0.5 text-[10px] font-bold text-background">SOON</span>}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
