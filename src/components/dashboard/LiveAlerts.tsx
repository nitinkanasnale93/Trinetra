import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";

const alerts = [
  {
    district: "Bengaluru Urban",
    level: "Critical",
    time: "2 min ago",
  },
  {
    district: "Mysuru",
    level: "Elevated",
    time: "8 min ago",
  },
  {
    district: "Hubballi",
    level: "Moderate",
    time: "14 min ago",
  },
];

export default function LiveAlerts() {
  return (
    <GlassCard className="p-6">
      <h3 className="text-lg font-semibold text-[var(--navy)]">
        Live Alerts
      </h3>

      <div className="mt-6 space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.district}
            className="flex items-center justify-between rounded-xl border border-[var(--border)] p-4"
          >
            <div>
              <p className="font-medium text-[var(--navy)]">
                {alert.district}
              </p>

              <p className="text-xs text-[var(--text-muted)]">
                {alert.time}
              </p>
            </div>

            <Badge>{alert.level}</Badge>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}