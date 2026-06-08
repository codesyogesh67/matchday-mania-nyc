import { Link } from "@tanstack/react-router";
import { useState } from "react";

type Theme = "default" | "knicks";

export function NavBar({ theme = "default" }: { theme?: Theme }) {
  const [open, setOpen] = useState(false);
  const isKnicks = theme === "knicks";

  const links: { to: string; label: string; soon?: boolean; knicks?: boolean }[] = [
    { to: "/", label: "Home" },
    { to: "/knicks", label: "🏀 Knicks Finals", knicks: true },
    { to: "/schedule", label: "Schedule" },
    { to: "/standings", label: "Standings" },
    { to: "/teams", label: "Teams" },
    { to: "/bars", label: "Bars" },
    { to: "/league", label: "Prediction League", soon: true },
  ];

  const headerCls = isKnicks
    ? "sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl bg-black/80"
    : "sticky top-0 z-50 border-b border-border/60 backdrop-blur-xl bg-background/70";

  const brand = isKnicks ? "text-white" : "";
  const brandAccent = isKnicks ? "" : "text-[var(--electric)] text-glow-green";

  return (
    <header className={headerCls}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className={`flex items-center gap-2 font-display text-2xl tracking-wider ${brand}`}>
          <span className="text-2xl">⚽</span>
          <span>
            MATCHDAY{" "}
            {isKnicks ? (
              <span style={{ color: "#F58426", textShadow: "0 0 20px #F58426" }}>NYC</span>
            ) : (
              <span className={brandAccent}>NYC</span>
            )}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <NavItem key={l.to} link={l} isKnicks={isKnicks} />
          ))}
        </nav>

        <button onClick={() => setOpen(!open)} className={`md:hidden p-2 ${isKnicks ? "text-white" : "text-foreground"}`}>
          <span className="block w-6 h-0.5 bg-current mb-1.5"></span>
          <span className="block w-6 h-0.5 bg-current mb-1.5"></span>
          <span className="block w-6 h-0.5 bg-current"></span>
        </button>
      </div>
      {open && (
        <nav className={`md:hidden border-t px-4 py-3 flex flex-col gap-1 ${isKnicks ? "border-white/10 bg-black/95" : "border-border bg-background/95"}`}>
          {links.map(l => (
            <NavItem key={l.to} link={l} isKnicks={isKnicks} onClick={() => setOpen(false)} mobile />
          ))}
        </nav>
      )}
    </header>
  );
}

function NavItem({
  link,
  isKnicks,
  onClick,
  mobile,
}: {
  link: { to: string; label: string; soon?: boolean; knicks?: boolean };
  isKnicks: boolean;
  onClick?: () => void;
  mobile?: boolean;
}) {
  const base = `relative px-3 py-2 text-sm font-medium uppercase tracking-wider transition ${mobile ? "block" : ""}`;
  const muted = isKnicks ? "text-white/70 hover:text-white" : "text-muted-foreground hover:text-foreground";
  const cls = `${base} ${muted}`;
  const activeCls = isKnicks ? "text-white" : "text-[var(--electric)]";

  if (link.knicks) {
    return (
      <Link
        to={link.to}
        onClick={onClick}
        className={`${base} flex items-center gap-2`}
        style={{ color: "#F58426", textShadow: "0 0 12px #F5842680" }}
        activeProps={{ className: `${base} flex items-center gap-2` }}
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ background: "#F58426" }} />
          <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: "#F58426" }} />
        </span>
        {link.label}
        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ background: "#F58426", color: "#000" }}>LIVE</span>
      </Link>
    );
  }

  return (
    <Link to={link.to} onClick={onClick} className={cls} activeProps={{ className: `${base} ${activeCls}` }}>
      {link.label}
      {link.soon && <span className="ml-2 rounded-full bg-[var(--gold)] px-2 py-0.5 text-[10px] font-bold text-background">SOON</span>}
    </Link>
  );
}
