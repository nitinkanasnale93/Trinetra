import AppShell from "@/components/layout/AppShell";

export default function SettingsPage() {
  return (
    <AppShell>
      <p className="mb-2 text-sm text-[var(--text-secondary)]">
        Platform configuration
      </p>

      <h1 className="text-[32px] font-medium tracking-[-0.04em] text-[var(--navy)]">
        Settings
      </h1>

      <p className="mt-2 text-[15px] text-[var(--text-secondary)]">
        Manage TRINETRA platform preferences and configuration.
      </p>
    </AppShell>
  );
}