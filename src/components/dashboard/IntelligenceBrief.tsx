import {
  ArrowUpRight,
  Database,
  MapPinned,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

type IntelligenceAlert = {
  alert_id: string;
  pattern_id: string;
  alert_title: string;
  alert_type: string;
  severity: string;
  alert_scope: string;
  alert_reason: string;
  pattern_score: number;
  incident_count: number;
  district_count: number;
  alert_status: string;
  created_at: string;
  acknowledged_by: string | null;
  acknowledged_at: string | null;
  acknowledged: boolean;
};

type IntelligenceBriefProps = {
  alert?: IntelligenceAlert;
  analysedIncidentCount: number;
};

export default function IntelligenceBrief({
  alert,
  analysedIncidentCount,
}: IntelligenceBriefProps) {
  if (!alert) {
    return (
      <section className="flex h-full flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5 lg:p-6">
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

        <h2 className="mt-5 text-lg font-medium leading-7 tracking-[-0.03em] text-[var(--navy)] sm:text-xl">
          No active intelligence alert detected.
        </h2>

        <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
          Verified incident records are available for continued
          pattern analysis.
        </p>

        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-3 text-xs text-[var(--text-secondary)]">
            <Database
              size={15}
              strokeWidth={1.8}
              className="text-[var(--text-muted)]"
            />

            Analysed {analysedIncidentCount} verified incident records
          </div>

          <div className="flex items-center gap-3 text-xs text-[var(--text-secondary)]">
            <ShieldCheck
              size={15}
              strokeWidth={1.8}
              className="text-[var(--text-muted)]"
            />

            Explainable rule-engine analysis
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="flex h-full flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5 lg:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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

        <span className="self-start rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-2.5 py-1 text-[10px] font-semibold tracking-[0.08em] text-[var(--navy)]">
          {alert.severity}
        </span>
      </div>

      <h2 className="mt-5 text-lg font-medium leading-7 tracking-[-0.03em] text-[var(--navy)] sm:text-xl">
        {alert.alert_title}
      </h2>

      <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
        {alert.alert_reason}
      </p>

      <div className="mt-6 border-t border-[var(--border)] pt-5">
        <div className="flex items-center justify-between">
          <span className="text-xs text-[var(--text-muted)]">
            Pattern confidence
          </span>

          <span className="text-sm font-medium text-[var(--navy)]">
            {alert.pattern_score}%
          </span>
        </div>

        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[var(--surface-soft)]">
          <div
            className="h-full rounded-full bg-[var(--gold)]"
            style={{
              width: `${Math.min(
                Math.max(alert.pattern_score, 0),
                100
              )}%`,
            }}
          />
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex items-center gap-3 text-xs leading-5 text-[var(--text-secondary)]">
          <Database
            size={15}
            strokeWidth={1.8}
            className="shrink-0 text-[var(--text-muted)]"
          />

          {alert.incident_count} linked incidents from{" "}
          {analysedIncidentCount} analysed records
        </div>

        <div className="flex items-center gap-3 text-xs leading-5 text-[var(--text-secondary)]">
          <MapPinned
            size={15}
            strokeWidth={1.8}
            className="shrink-0 text-[var(--text-muted)]"
          />

          Cross-jurisdiction activity across {alert.district_count} districts
        </div>

        <div className="flex items-center gap-3 text-xs leading-5 text-[var(--text-secondary)]">
          <ShieldCheck
            size={15}
            strokeWidth={1.8}
            className="shrink-0 text-[var(--text-muted)]"
          />

          Explainable evidence-backed pattern analysis
        </div>
      </div>

      <button className="mt-8 flex items-center justify-between rounded-xl bg-[var(--navy)] px-4 py-3 text-sm text-white transition hover:opacity-90 lg:mt-auto">
        <span className="truncate">
          Review {alert.pattern_id}
        </span>

        <ArrowUpRight
          size={16}
          strokeWidth={1.8}
        />
      </button>
    </section>
  );
}