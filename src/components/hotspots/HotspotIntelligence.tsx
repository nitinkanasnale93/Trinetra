import {
  Clock3,
  Database,
  MapPinned,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

type Hotspot = {
  id: string;
  district: string;
  lat: number;
  lng: number;
  incidents: number;
  risk: string;
  confidence: number;
  insight: string;
};

type Props = {
  hotspot: Hotspot;
};

const hotspotDetails: Record<
  string,
  {
    title: string;
    description: string;
    radius: string;
    peakActivity: string;
  }
> = {
  "HS-001": {
    title:
      "Bengaluru Urban shows sustained late-evening activity.",
    description:
      "Incident density increased across a 3.2 km operational zone. Vehicle theft and burglary account for most of the recent activity.",
    radius: "3.2 km radius",
    peakActivity: "9 PM – 12 AM",
  },

  "HS-002": {
    title:
      "Mysuru shows recurring activity across linked locations.",
    description:
      "Spatial clustering indicates repeated incident patterns around connected operational zones and nearby transport corridors.",
    radius: "2.8 km radius",
    peakActivity: "7 PM – 11 PM",
  },

  "HS-003": {
    title:
      "Tumakuru is showing a rapid increase in incident density.",
    description:
      "Recent monitoring data indicates elevated activity across multiple connected locations within the district.",
    radius: "2.4 km radius",
    peakActivity: "8 PM – 11 PM",
  },

  "HS-004": {
    title:
      "Shivamogga shows an emerging spatial crime pattern.",
    description:
      "Moderate incident concentration has been detected with activity gradually expanding across nearby zones.",
    radius: "1.9 km radius",
    peakActivity: "6 PM – 10 PM",
  },

  "HS-005": {
    title:
      "Belagavi activity remains below escalation thresholds.",
    description:
      "Current incident concentration remains relatively low with no significant expansion detected during the recent monitoring window.",
    radius: "1.4 km radius",
    peakActivity: "5 PM – 8 PM",
  },
};

export default function HotspotIntelligence({
  hotspot,
}: Props) {
  const details =
    hotspotDetails[hotspot.id] ?? {
      title: `${hotspot.district} hotspot activity detected.`,
      description: hotspot.insight,
      radius: "2.0 km radius",
      peakActivity: "Activity window unavailable",
    };

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

      <div className="mt-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]">
            {hotspot.id}
          </p>

          <h2 className="mt-1 text-[21px] font-medium leading-7 tracking-[-0.03em] text-[var(--navy)]">
            {details.title}
          </h2>
        </div>

        <span className="shrink-0 rounded-full bg-[var(--gold-soft)] px-3 py-1 text-[11px] font-medium text-[var(--gold)]">
          {hotspot.risk}
        </span>
      </div>

      <p className="mt-4 text-sm leading-6 text-[var(--text-secondary)]">
        {details.description}
      </p>

      <div className="mt-7 rounded-xl bg-[var(--surface-soft)] p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs text-[var(--text-muted)]">
            Hotspot confidence
          </span>

          <span className="text-sm font-medium text-[var(--navy)]">
            {hotspot.confidence}%
          </span>
        </div>

        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white">
          <div
            className="h-full rounded-full bg-[var(--gold)] transition-all duration-700"
            style={{
              width: `${hotspot.confidence}%`,
            }}
          />
        </div>
      </div>

      <div className="mt-7 space-y-4">
        <Signal
          icon={MapPinned}
          label="Spatial concentration"
          value={details.radius}
        />

        <Signal
          icon={Clock3}
          label="Peak activity"
          value={details.peakActivity}
        />

        <Signal
          icon={Database}
          label="Records analysed"
          value={hotspot.incidents.toLocaleString()}
        />

        <Signal
          icon={ShieldCheck}
          label="Evidence grounding"
          value="Verified"
        />
      </div>

      <button
        type="button"
        className="mt-8 rounded-xl bg-[var(--navy)] px-4 py-3 text-sm text-white transition hover:opacity-90"
      >
        Review {hotspot.district} analysis
      </button>
    </section>
  );
}

type SignalProps = {
  icon: LucideIcon;
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