import {
  ArrowUpRight,
  MapPin,
  TrendingDown,
  TrendingUp,
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

type Zone = {
  name: string;
  district: string;
  score: number;
  incidents: number;
  change: string;
  trend: "up" | "down";
};

const priorityZones: Record<string, Zone[]> = {
  "HS-001": [
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
      name: "Electronic City South",
      district: "Bengaluru",
      score: 63,
      incidents: 21,
      change: "-3%",
      trend: "down",
    },
  ],

  "HS-002": [
    {
      name: "Vijayanagar",
      district: "Mysuru",
      score: 86,
      incidents: 34,
      change: "+14%",
      trend: "up",
    },
    {
      name: "Hebbal Industrial Area",
      district: "Mysuru",
      score: 78,
      incidents: 29,
      change: "+10%",
      trend: "up",
    },
    {
      name: "Nazarbad",
      district: "Mysuru",
      score: 69,
      incidents: 23,
      change: "+6%",
      trend: "up",
    },
    {
      name: "Kuvempunagar",
      district: "Mysuru",
      score: 57,
      incidents: 17,
      change: "-4%",
      trend: "down",
    },
  ],

  "HS-003": [
    {
      name: "Tumakuru Central",
      district: "Tumakuru",
      score: 88,
      incidents: 31,
      change: "+21%",
      trend: "up",
    },
    {
      name: "Kyathsandra Corridor",
      district: "Tumakuru",
      score: 81,
      incidents: 24,
      change: "+16%",
      trend: "up",
    },
    {
      name: "Sira Road Zone",
      district: "Tumakuru",
      score: 74,
      incidents: 20,
      change: "+11%",
      trend: "up",
    },
    {
      name: "Gubbi Gate",
      district: "Tumakuru",
      score: 61,
      incidents: 17,
      change: "+5%",
      trend: "up",
    },
  ],

  "HS-004": [
    {
      name: "Shivamogga Central",
      district: "Shivamogga",
      score: 72,
      incidents: 17,
      change: "+9%",
      trend: "up",
    },
    {
      name: "Vinoba Nagar",
      district: "Shivamogga",
      score: 65,
      incidents: 13,
      change: "+6%",
      trend: "up",
    },
    {
      name: "Sagar Road",
      district: "Shivamogga",
      score: 58,
      incidents: 10,
      change: "+3%",
      trend: "up",
    },
    {
      name: "Gandhi Bazaar",
      district: "Shivamogga",
      score: 49,
      incidents: 8,
      change: "-2%",
      trend: "down",
    },
  ],

  "HS-005": [
    {
      name: "Belagavi Central",
      district: "Belagavi",
      score: 52,
      incidents: 11,
      change: "+2%",
      trend: "up",
    },
    {
      name: "Tilakwadi",
      district: "Belagavi",
      score: 46,
      incidents: 9,
      change: "-1%",
      trend: "down",
    },
    {
      name: "Shahapur",
      district: "Belagavi",
      score: 41,
      incidents: 8,
      change: "-3%",
      trend: "down",
    },
    {
      name: "Udyambag",
      district: "Belagavi",
      score: 35,
      incidents: 6,
      change: "-5%",
      trend: "down",
    },
  ],
};

export default function PriorityZones({
  hotspot,
}: Props) {
  const zones =
    priorityZones[hotspot.id] ??
    priorityZones["HS-001"];

  return (
    <section className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
      <div className="flex items-center justify-between border-b border-[var(--border)] px-6 py-5">
        <div>
          <h2 className="text-[16px] font-medium tracking-[-0.02em] text-[var(--navy)]">
            Priority zones
          </h2>

          <p className="mt-1 text-xs text-[var(--text-muted)]">
            Zones ranked by current hotspot intensity in{" "}
            {hotspot.district}
          </p>
        </div>

        <span className="rounded-full bg-[var(--surface-soft)] px-3 py-1.5 text-[10px] font-medium text-[var(--text-muted)]">
          {hotspot.id}
        </span>
      </div>

      <div>
        {zones.map((zone, index) => {
          const TrendIcon =
            zone.trend === "up"
              ? TrendingUp
              : TrendingDown;

          return (
            <button
              key={zone.name}
              type="button"
              className="group flex w-full items-center gap-4 border-b border-[var(--border)] px-6 py-5 text-left transition last:border-b-0 hover:bg-[var(--surface-soft)]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-xs font-medium text-[var(--text-muted)]">
                {String(index + 1).padStart(
                  2,
                  "0"
                )}
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
                    {zone.district} ·{" "}
                    {zone.incidents} incidents
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
                    className="h-full rounded-full bg-[var(--gold)] transition-all duration-700"
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
                <TrendIcon
                  size={13}
                  strokeWidth={2}
                />

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