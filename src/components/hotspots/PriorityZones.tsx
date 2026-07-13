import {
  ArrowUpRight,
  MapPin,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

const zones = [
  {
    name: "Yelahanka North",
    district: "Bengaluru",
    score: 92,
    incidents: 48,
    change: "+18%",
    trend: "up",
  },
  {
    name: "Hebbal Corridor",
    district: "Bengaluru",
    score: 84,
    incidents: 36,
    change: "+12%",
    trend: "up",
  },
  {
    name: "Whitefield East",
    district: "Bengaluru",
    score: 71,
    incidents: 29,
    change: "+7%",
    trend: "up",
  },
  {
    name: "Vijayanagar",
    district: "Mysuru",
    score: 58,
    incidents: 18,
    change: "-4%",
    trend: "down",
  },
];

export default function PriorityZones() {
  return (
    <section className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
      <div className="border-b border-[var(--border)] px-6 py-5">
        <h2 className="text-[16px] font-medium tracking-[-0.02em] text-[var(--navy)]">
          Priority zones
        </h2>

        <p className="mt-1 text-xs text-[var(--text-muted)]">
          Zones ranked by current hotspot intensity
        </p>
      </div>

      <div>
        {zones.map((zone, index) => {
          const TrendIcon =
            zone.trend === "up" ? TrendingUp : TrendingDown;

          return (
            <button
              key={zone.name}
              className="group flex w-full items-center gap-4 border-b border-[var(--border)] px-6 py-5 text-left transition last:border-b-0 hover:bg-[var(--surface-soft)]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-xs font-medium text-[var(--text-muted)]">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="flex min-w-0 flex-1 items-center gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--gold-soft)]">
                  <MapPin
                    size={15}
                    strokeWidth={1.8}
                    className="text-[var(--gold)]"
                  />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-[var(--navy)]">
                    {zone.name}
                  </p>

                  <p className="mt-1 text-[11px] text-[var(--text-muted)]">
                    {zone.district} · {zone.incidents} incidents
                  </p>
                </div>
              </div>

              <div className="w-28">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[var(--text-muted)]">
                    Risk score
                  </span>

                  <span className="text-xs font-medium text-[var(--navy)]">
                    {zone.score}
                  </span>
                </div>

                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[var(--surface-soft)]">
                  <div
                    className="h-full rounded-full bg-[var(--gold)]"
                    style={{
                      width: `${zone.score}%`,
                    }}
                  />
                </div>
              </div>

              <div
                className={`flex w-16 items-center justify-end gap-1 text-xs ${
                  zone.trend === "up"
                    ? "text-[var(--danger)]"
                    : "text-[var(--success)]"
                }`}
              >
                <TrendIcon size={13} strokeWidth={2} />
                {zone.change}
              </div>

              <ArrowUpRight
                size={15}
                strokeWidth={1.8}
                className="text-[var(--text-muted)] opacity-0 transition group-hover:opacity-100"
              />
            </button>
          );
        })}
      </div>
    </section>
  );
}