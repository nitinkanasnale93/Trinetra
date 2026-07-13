import AppShell from "@/components/layout/AppShell";

export default function ReportsPage() {
  return (
    <AppShell>
      <p className="mb-2 text-sm text-[var(--text-secondary)]">
        Intelligence records
      </p>

      <h1 className="text-[32px] font-medium tracking-[-0.04em] text-[var(--navy)]">
        Reports
      </h1>

      <p className="mt-2 text-[15px] text-[var(--text-secondary)]">
        Generate and review operational intelligence reports.
      </p>
    </AppShell>
  );
}