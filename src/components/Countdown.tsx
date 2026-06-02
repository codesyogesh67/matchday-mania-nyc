import { useEffect, useState } from "react";

export function Countdown({ target }: { target: string }) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = Math.max(0, new Date(target).getTime() - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  const Box = ({ n, l }: { n: number; l: string }) => (
    <div className="flex flex-col items-center min-w-[70px] md:min-w-[100px] rounded-lg border border-border bg-card/80 backdrop-blur px-3 py-3 md:px-5 md:py-4">
      <span className="font-display text-3xl md:text-5xl text-[var(--electric)] text-glow-green tabular-nums">
        {String(n).padStart(2, "0")}
      </span>
      <span className="text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground mt-1">{l}</span>
    </div>
  );

  return (
    <div className="flex gap-2 md:gap-4 justify-center">
      <Box n={days} l="Days" />
      <Box n={hours} l="Hours" />
      <Box n={minutes} l="Min" />
      <Box n={seconds} l="Sec" />
    </div>
  );
}
