import { useState } from "react";

export function CallToReserveButton({ name, phone, accent = "#C9A84C", className = "" }: { name: string; phone: string; accent?: string; className?: string }) {
  const [open, setOpen] = useState(false);
  const telHref = `tel:${phone.replace(/[^0-9+]/g, "")}`;
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-bold uppercase tracking-widest transition hover:bg-white/10 ${className}`}
        style={{ borderColor: accent, color: accent }}
      >
        📞 Call to Reserve
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-xl p-6 text-center text-white"
            style={{ background: "#0d1f0d", border: `1px solid ${accent}66`, boxShadow: `0 0 60px ${accent}33` }}
            onClick={e => e.stopPropagation()}
          >
            <p className="text-sm md:text-base">📞 Call <span className="font-bold">{name}</span> to Reserve Your Spot</p>
            <p className="mt-5 font-display text-3xl md:text-4xl font-black tracking-wide" style={{ color: accent }}>{phone}</p>
            <div className="mt-6 flex flex-col gap-3">
              <a
                href={telHref}
                className="rounded-md py-3 font-bold uppercase tracking-widest text-sm"
                style={{ background: accent, color: "#0a0a0a" }}
              >
                Call Now
              </a>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md border border-white/30 py-2.5 text-sm font-semibold text-white/80 hover:bg-white/5"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
