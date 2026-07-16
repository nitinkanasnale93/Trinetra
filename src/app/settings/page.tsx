"use client";

import { useState } from "react";

import {
  Bell,
  BrainCircuit,
  Check,
  Database,
  MapPinned,
  Save,
  ShieldCheck,
  SlidersHorizontal,
  UserRound,
} from "lucide-react";

import AppShell from "@/components/layout/AppShell";

type SettingsSection =
  | "Profile"
  | "Intelligence"
  | "Notifications"
  | "Data";

const sections: {
  name: SettingsSection;
  description: string;
  icon: typeof UserRound;
}[] = [
  {
    name: "Profile",
    description: "Analyst identity and workspace",
    icon: UserRound,
  },
  {
    name: "Intelligence",
    description: "Risk and confidence thresholds",
    icon: BrainCircuit,
  },
  {
    name: "Notifications",
    description: "Operational alert preferences",
    icon: Bell,
  },
  {
    name: "Data",
    description: "Dataset and analysis preferences",
    icon: Database,
  },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] =
    useState<SettingsSection>("Profile");

  const [name, setName] = useState("Nitin Kanasnale");

  const [role, setRole] = useState(
    "Intelligence Analyst"
  );

  const [workspace, setWorkspace] = useState(
    "Karnataka Intelligence Workspace"
  );

  const [riskThreshold, setRiskThreshold] =
    useState(70);

  const [confidenceThreshold, setConfidenceThreshold] =
    useState(85);

  const [predictionReview, setPredictionReview] =
    useState(true);

  const [hotspotAlerts, setHotspotAlerts] =
    useState(true);

  const [predictionAlerts, setPredictionAlerts] =
    useState(true);

  const [reportAlerts, setReportAlerts] =
    useState(false);

  const [dailyDigest, setDailyDigest] =
    useState(true);

  const [dataset, setDataset] = useState(
    "Prototype demonstration dataset"
  );

  const [analysisWindow, setAnalysisWindow] =
    useState("Last 7 days");

  const [saved, setSaved] = useState(false);

  const saveSettings = () => {
    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 2200);
  };

  return (
    <AppShell>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mb-2 text-sm text-[var(--text-secondary)]">
            Platform configuration
          </p>

          <h1 className="text-3xl font-medium tracking-[-0.04em] text-[var(--navy)] sm:text-[32px]">
            Settings
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--text-secondary)] sm:text-[15px]">
            Manage TRINETRA platform preferences and configuration.
          </p>
        </div>

        <button
          type="button"
          onClick={saveSettings}
          className={`flex h-11 w-full items-center justify-center gap-2 rounded-xl px-4 text-sm font-medium text-white transition sm:w-auto ${
            saved
              ? "bg-[var(--success)]"
              : "bg-[var(--navy)] hover:opacity-90"
          }`}
        >
          {saved ? (
            <>
              <Check size={16} />
              Settings saved
            </>
          ) : (
            <>
              <Save size={16} />
              Save changes
            </>
          )}
        </button>
      </div>

      <section className="mt-9 grid grid-cols-1 gap-4 xl:grid-cols-[300px_minmax(0,1fr)]">
        {/* Settings Navigation */}

        <aside className="h-fit rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3 xl:sticky xl:top-24">
          <div className="px-3 pb-3 pt-2">
            <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]">
              Configuration
            </p>
          </div>

          <div className="space-y-1">
            {sections.map((section) => {
              const Icon = section.icon;

              const isActive =
                activeSection === section.name;

              return (
                <button
                  key={section.name}
                  type="button"
                  onClick={() =>
                    setActiveSection(section.name)
                  }
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${
                    isActive
                      ? "bg-[var(--gold-soft)]/50"
                      : "hover:bg-[var(--surface-soft)]"
                  }`}
                >
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                      isActive
                        ? "bg-[var(--surface)]"
                        : "border border-[var(--border)]"
                    }`}
                  >
                    <Icon
                      size={16}
                      strokeWidth={1.8}
                      className={
                        isActive
                          ? "text-[var(--gold)]"
                          : "text-[var(--text-muted)]"
                      }
                    />
                  </div>

                  <div className="min-w-0">
                    <p
                      className={`text-sm font-medium ${
                        isActive
                          ? "text-[var(--navy)]"
                          : "text-[var(--text-secondary)]"
                      }`}
                    >
                      {section.name}
                    </p>

                    <p className="mt-0.5 text-[10px] leading-4 text-[var(--text-muted)]">
                      {section.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-4 border-t border-[var(--border)] px-3 pb-2 pt-5">
            <div className="flex items-start gap-3">
              <ShieldCheck
                size={16}
                className="mt-0.5 shrink-0 text-[var(--gold)]"
              />

              <div>
                <p className="text-xs font-medium text-[var(--navy)]">
                  Prototype environment
                </p>

                <p className="mt-1 text-[10px] leading-4 text-[var(--text-muted)]">
                  Configuration changes affect the current demonstration
                  workspace.
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Settings Content */}

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
          {activeSection === "Profile" && (
            <SettingsContent
              eyebrow="Analyst profile"
              title="Workspace identity"
              description="Manage the analyst information displayed across the TRINETRA interface."
              icon={UserRound}
            >
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <Field label="Display name">
                  <input
                    value={name}
                    onChange={(event) =>
                      setName(event.target.value)
                    }
                    className="settings-input"
                  />
                </Field>

                <Field label="Platform role">
                  <select
                    value={role}
                    onChange={(event) =>
                      setRole(event.target.value)
                    }
                    className="settings-input"
                  >
                    <option>
                      Intelligence Analyst
                    </option>

                    <option>
                      Police Officer
                    </option>

                    <option>
                      Platform Administrator
                    </option>
                  </select>
                </Field>

                <div className="md:col-span-2">
                  <Field label="Workspace">
                    <input
                      value={workspace}
                      onChange={(event) =>
                        setWorkspace(event.target.value)
                      }
                      className="settings-input"
                    />
                  </Field>
                </div>
              </div>

              <div className="mt-7 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-5">
                <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]">
                  Analyst preview
                </p>

                <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--navy)] text-sm font-medium text-white">
                    {getInitials(name)}
                  </div>

                  <div>
                    <p className="text-sm font-medium text-[var(--navy)]">
                      {name || "Unnamed analyst"}
                    </p>

                    <p className="mt-1 text-xs text-[var(--text-muted)]">
                      {role}
                    </p>
                  </div>
                </div>
              </div>
            </SettingsContent>
          )}

          {activeSection === "Intelligence" && (
            <SettingsContent
              eyebrow="Intelligence engine"
              title="Analytical thresholds"
              description="Configure how the demonstration workspace surfaces risk and prediction intelligence."
              icon={BrainCircuit}
            >
              <Threshold
                icon={MapPinned}
                label="Elevated risk threshold"
                description="Districts at or above this score are treated as elevated."
                value={riskThreshold}
                onChange={setRiskThreshold}
              />

              <div className="my-7 border-t border-[var(--border)]" />

              <Threshold
                icon={SlidersHorizontal}
                label="Minimum confidence threshold"
                description="Analytical results below this confidence level require additional review."
                value={confidenceThreshold}
                onChange={setConfidenceThreshold}
              />

              <div className="my-7 border-t border-[var(--border)]" />

              <ToggleSetting
                title="Require prediction review"
                description="Flag predictive intelligence for human analyst validation before operational use."
                checked={predictionReview}
                onChange={setPredictionReview}
              />
            </SettingsContent>
          )}

          {activeSection === "Notifications" && (
            <SettingsContent
              eyebrow="Operational alerts"
              title="Notification preferences"
              description="Choose which intelligence events should appear as analyst notifications."
              icon={Bell}
            >
              <div className="space-y-1">
                <ToggleSetting
                  title="Hotspot escalation alerts"
                  description="Receive an alert when a hotspot moves above the elevated risk threshold."
                  checked={hotspotAlerts}
                  onChange={setHotspotAlerts}
                />

                <Divider />

                <ToggleSetting
                  title="Prediction review alerts"
                  description="Receive an alert when a new prediction requires analyst validation."
                  checked={predictionAlerts}
                  onChange={setPredictionAlerts}
                />

                <Divider />

                <ToggleSetting
                  title="Report readiness alerts"
                  description="Receive an alert when an intelligence report is prepared for review."
                  checked={reportAlerts}
                  onChange={setReportAlerts}
                />

                <Divider />

                <ToggleSetting
                  title="Daily intelligence digest"
                  description="Show a daily summary of hotspot, prediction, and analytical changes."
                  checked={dailyDigest}
                  onChange={setDailyDigest}
                />
              </div>
            </SettingsContent>
          )}

          {activeSection === "Data" && (
            <SettingsContent
              eyebrow="Analysis data"
              title="Dataset preferences"
              description="Review the dataset and default analysis window used by the demonstration workspace."
              icon={Database}
            >
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <Field label="Active dataset">
                  <select
                    value={dataset}
                    onChange={(event) =>
                      setDataset(event.target.value)
                    }
                    className="settings-input"
                  >
                    <option>
                      Prototype demonstration dataset
                    </option>

                    <option>
                      Karnataka sample incident dataset
                    </option>

                    <option>
                      Synthetic analytical dataset
                    </option>
                  </select>
                </Field>

                <Field label="Default analysis window">
                  <select
                    value={analysisWindow}
                    onChange={(event) =>
                      setAnalysisWindow(
                        event.target.value
                      )
                    }
                    className="settings-input"
                  >
                    <option>Last 7 days</option>

                    <option>Last 30 days</option>

                    <option>Last 90 days</option>
                  </select>
                </Field>
              </div>

              <div className="mt-7 rounded-2xl border border-[var(--border)] bg-[var(--gold-soft)]/35 p-5">
                <div className="flex items-start gap-3">
                  <ShieldCheck
                    size={17}
                    className="mt-0.5 shrink-0 text-[var(--gold)]"
                  />

                  <div>
                    <p className="text-sm font-medium text-[var(--navy)]">
                      Demonstration data notice
                    </p>

                    <p className="mt-2 text-xs leading-5 text-[var(--text-secondary)]">
                      TRINETRA currently uses demonstration and synthetic
                      records to represent the intended crime intelligence
                      workflow. The prototype does not represent a live
                      police operational database.
                    </p>
                  </div>
                </div>
              </div>
            </SettingsContent>
          )}
        </div>
      </section>

      <style jsx global>{`
        .settings-input {
          height: 44px;
          width: 100%;
          border-radius: 12px;
          border: 1px solid var(--border);
          background: var(--background);
          padding: 0 14px;
          font-size: 14px;
          color: var(--navy);
          outline: none;
          transition:
            border-color 160ms ease,
            box-shadow 160ms ease;
        }

        .settings-input:focus {
          border-color: var(--gold);
          box-shadow: 0 0 0 3px
            color-mix(
              in srgb,
              var(--gold) 12%,
              transparent
            );
        }
      `}</style>
    </AppShell>
  );
}

function SettingsContent({
  eyebrow,
  title,
  description,
  icon: Icon,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  icon: typeof UserRound;
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="border-b border-[var(--border)] px-5 py-6 sm:px-7">
        <div className="flex items-center gap-2">
          <Icon
            size={15}
            className="text-[var(--gold)]"
          />

          <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--gold)]">
            {eyebrow}
          </p>
        </div>

        <h2 className="mt-4 break-words text-xl font-medium tracking-[-0.03em] text-[var(--navy)] sm:text-[22px]">
          {title}
        </h2>

        <p className="mt-2 text-sm text-[var(--text-muted)]">
          {description}
        </p>
      </div>

      <div className="p-5 sm:p-7">{children}</div>
    </>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-medium text-[var(--text-secondary)]">
        {label}
      </span>

      {children}
    </label>
  );
}

function Threshold({
  icon: Icon,
  label,
  description,
  value,
  onChange,
}: {
  icon: typeof MapPinned;
  label: string;
  description: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--gold-soft)]">
          <Icon
            size={16}
            className="text-[var(--gold)]"
          />
        </div>

        <div className="flex-1">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-medium text-[var(--navy)]">
                {label}
              </p>

              <p className="mt-1 text-xs leading-5 text-[var(--text-muted)]">
                {description}
              </p>
            </div>

            <span className="w-fit rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-center text-sm font-medium text-[var(--navy)]">              {value}%
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            value={value}
            onChange={(event) =>
              onChange(Number(event.target.value))
            }
            className="mt-5 w-full accent-[var(--gold)]"
          />
        </div>
      </div>
    </div>
  );
}

function ToggleSetting({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex flex-col gap-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-medium text-[var(--navy)]">
          {title}
        </p>

        <p className="mt-1 max-w-[620px] text-xs leading-5 text-[var(--text-muted)]">
          {description}
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          checked
            ? "bg-[var(--navy)]"
            : "bg-[var(--border-strong)]"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${
            checked ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}

function Divider() {
  return (
    <div className="border-t border-[var(--border)]" />
  );
}

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}