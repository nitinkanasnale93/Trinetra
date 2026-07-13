"use client";

import {
  Activity,
  GitBranch,
  ShieldAlert,
  Users,
} from "lucide-react";

type Props = {
  entities: number;
  connections: number;
  highRisk: number;
  averageConfidence: number;
};

export default function NetworkAnalytics({
  entities,
  connections,
  highRisk,
  averageConfidence,
}: Props) {
  const analytics = [
    {
      label: "Entities",
      value: entities,
      icon: Users,
    },
    {
      label: "Connections",
      value: connections,
      icon: GitBranch,
    },
    {
      label: "High Risk",
      value: highRisk,
      icon: ShieldAlert,
    },
    {
      label: "Avg. Confidence",
      value: `${averageConfidence}%`,
      icon: Activity,
    },
  ];

  return (
    <section className="mt-9 grid grid-cols-4 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
      {analytics.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={item.label}
            className={`flex items-center gap-4 px-5 py-4 ${
              index !== analytics.length - 1
                ? "border-r border-[var(--border)]"
                : ""
            }`}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--gold-soft)]">
              <Icon
                size={17}
                className="text-[var(--gold)]"
              />
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-[0.08em] text-[var(--text-muted)]">
                {item.label}
              </p>

              <p className="mt-1 text-xl font-semibold tracking-[-0.03em] text-[var(--navy)]">
                {item.value}
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
}