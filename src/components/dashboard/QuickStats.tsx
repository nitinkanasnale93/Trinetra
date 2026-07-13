import GlassCard from "@/components/ui/GlassCard";

export default function QuickStats() {
  return (
    <GlassCard className="p-6">
      <p className="text-sm text-[var(--text-muted)]">
        Intelligence Summary
      </p>

      <h2 className="mt-3 text-3xl font-semibold text-[var(--navy)]">
        1,284
      </h2>

      <p className="mt-2 text-sm text-[var(--text-secondary)]">
        Total incidents analysed in the last 30 days.
      </p>
    </GlassCard>
  );
}