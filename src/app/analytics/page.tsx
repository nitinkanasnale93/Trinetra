import AppShell from "@/components/layout/AppShell";

export default function AnalyticsPage() {
  return (
    <AppShell>
      <p className="mb-2 text-sm text-[var(--text-secondary)]">
        Operational intelligence
      </p>

      <h1 className="text-[32px] font-medium tracking-[-0.04em] text-[var(--navy)]">
        Analytics
      </h1>

      <p className="mt-2 text-[15px] text-[var(--text-secondary)]">
        Explore crime trends, patterns, and operational intelligence.
      </p>

      <section className="mt-9 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-10">
        <p className="text-sm text-[var(--text-muted)]">
          Analytics intelligence workspace.
        </p>
      </section>
    </AppShell>
  );
}