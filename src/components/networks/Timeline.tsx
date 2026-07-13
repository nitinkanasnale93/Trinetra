import GlassCard from "@/components/ui/GlassCard";

const events = [
  {
    title: "Phone became active",
    date: "10 July",
  },
  {
    title: "Vehicle detected",
    date: "11 July",
  },
  {
    title: "Bank transaction",
    date: "12 July",
  },
  {
    title: "Crime reported",
    date: "13 July",
  },
];

export default function Timeline() {
  return (
    <GlassCard className="p-8">
      <h2 className="text-xl font-semibold text-[var(--navy)]">
        Investigation Timeline
      </h2>

      <div className="mt-8 space-y-6">
        {events.map((event, index) => (
          <div
            key={event.title}
            className="flex gap-4"
          >
            <div className="flex flex-col items-center">
              <div className="h-3 w-3 rounded-full bg-[var(--gold)]" />

              {index !== events.length - 1 && (
                <div className="mt-2 h-12 w-px bg-[var(--border)]" />
              )}
            </div>

            <div>
              <p className="font-medium text-[var(--navy)]">
                {event.title}
              </p>

              <p className="text-sm text-[var(--text-muted)]">
                {event.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}