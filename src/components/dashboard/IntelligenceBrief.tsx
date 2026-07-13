import {
  ArrowUpRight,
  Database,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function IntelligenceBrief() {
  return (
    <section className="flex h-full flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
      <div className="flex items-center gap-2">
        <Sparkles
          size={16}
          strokeWidth={1.8}
          className="text-[var(--gold)]"
        />

        <p className="text-xs font-medium text-[var(--gold)]">
          TRINETRA Intelligence
        </p>
      </div>

      <h2 className="mt-6 text-[20px] font-medium leading-7 tracking-[-0.03em] text-[var(--navy)]">
        Theft activity increased across three North Bengaluru zones.
      </h2>

      <p className="mt-4 text-sm leading-6 text-[var(--text-secondary)]">
        Twelve related incidents show similar time and location patterns,
        primarily between 9 PM and midnight.
      </p>

      <div className="mt-6 border-t border-[var(--border)] pt-5">
        <div className="flex items-center justify-between">
          <span className="text-xs text-[var(--text-muted)]">
            Confidence
          </span>

          <span className="text-sm font-medium text-[var(--navy)]">
            87%
          </span>
        </div>

        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[var(--surface-soft)]">
          <div className="h-full w-[87%] rounded-full bg-[var(--gold)]" />
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex items-center gap-3 text-xs text-[var(--text-secondary)]">
          <Database
            size={15}
            strokeWidth={1.8}
            className="text-[var(--text-muted)]"
          />

          Analysed 1,284 incident records
        </div>

        <div className="flex items-center gap-3 text-xs text-[var(--text-secondary)]">
          <ShieldCheck
            size={15}
            strokeWidth={1.8}
            className="text-[var(--text-muted)]"
          />

          Evidence-grounded analysis
        </div>
      </div>

      <button className="mt-auto flex items-center justify-between rounded-xl bg-[var(--navy)] px-4 py-3 text-sm text-white transition hover:opacity-90">
        Review analysis

        <ArrowUpRight size={16} strokeWidth={1.8} />
      </button>
    </section>
  );
}