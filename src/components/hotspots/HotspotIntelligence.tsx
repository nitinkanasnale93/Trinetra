import {
  Clock3,
  Database,
  MapPinned,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function HotspotIntelligence() {
  return (
    <section className="flex h-full flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
      <div className="flex items-center gap-2">
        <Sparkles
          size={16}
          strokeWidth={1.8}
          className="text-[var(--gold)]"
        />

        <p className="text-xs font-medium text-[var(--gold)]">
          Hotspot intelligence
        </p>
      </div>

      <h2 className="mt-6 text-[21px] font-medium leading-7 tracking-[-0.03em] text-[var(--navy)]">
        Yelahanka North shows sustained late-evening activity.
      </h2>

      <p className="mt-4 text-sm leading-6 text-[var(--text-secondary)]">
        Incident density increased across a 3.2 km operational zone.
        Vehicle theft and burglary account for most of the recent activity.
      </p>

      <div className="mt-7 rounded-xl bg-[var(--surface-soft)] p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs text-[var(--text-muted)]">
            Hotspot confidence
          </span>

          <span className="text-sm font-medium text-[var(--navy)]">
            92%
          </span>
        </div>

        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white">
          <div className="h-full w-[92%] rounded-full bg-[var(--gold)]" />
        </div>
      </div>

      <div className="mt-7 space-y-4">
        <Signal
          icon={MapPinned}
          label="Spatial concentration"
          value="3.2 km radius"
        />

        <Signal
          icon={Clock3}
          label="Peak activity"
          value="9 PM – 12 AM"
        />

        <Signal
          icon={Database}
          label="Records analysed"
          value="1,284"
        />

        <Signal
          icon={ShieldCheck}
          label="Evidence grounding"
          value="Verified"
        />
      </div>

      <button className="mt-8 rounded-xl bg-[var(--navy)] px-4 py-3 text-sm text-white transition hover:opacity-90">
        Review hotspot analysis
      </button>
    </section>
  );
}

type SignalProps = {
  icon: React.ElementType;
  label: string;
  value: string;
};

function Signal({
  icon: Icon,
  label,
  value,
}: SignalProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)]">
        <Icon
          size={15}
          strokeWidth={1.8}
          className="text-[var(--text-muted)]"
        />
      </div>

      <div className="flex-1">
        <p className="text-[11px] text-[var(--text-muted)]">
          {label}
        </p>

        <p className="mt-0.5 text-sm font-medium text-[var(--navy)]">
          {value}
        </p>
      </div>
    </div>
  );
}