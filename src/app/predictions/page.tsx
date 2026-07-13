import {
  AlertTriangle,
  ArrowUpRight,
  BrainCircuit,
  CheckCircle2,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import AppShell from "@/components/layout/AppShell";

const predictions = [
  {
    zone: "Yelahanka North",
    prediction: "Elevated vehicle theft activity",
    probability: 87,
    window: "Next 24 hours",
  },
  {
    zone: "Hebbal Corridor",
    prediction: "Burglary activity may increase",
    probability: 74,
    window: "Next 48 hours",
  },
  {
    zone: "Whitefield East",
    prediction: "Cyber fraud reporting concentration",
    probability: 68,
    window: "Next 7 days",
  },
];

export default function PredictionsPage() {
  return (
    <AppShell>
      <p className="mb-2 text-sm text-[var(--text-secondary)]">
        Predictive intelligence
      </p>

      <h1 className="text-[32px] font-medium tracking-[-0.04em] text-[var(--navy)]">
        Predictions
      </h1>

      <p className="mt-2 text-[15px] text-[var(--text-secondary)]">
        Review data-driven risk forecasts and the evidence behind them.
      </p>

      <section className="mt-9 grid grid-cols-[1fr_360px] gap-4">
        <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
          <div className="border-b border-[var(--border)] px-6 py-5">
            <h2 className="text-[16px] font-medium text-[var(--navy)]">
              Active predictions
            </h2>

            <p className="mt-1 text-xs text-[var(--text-muted)]">
              Ranked by forecast probability
            </p>
          </div>

          {predictions.map((prediction) => (
            <button
              key={prediction.zone}
              className="group flex w-full items-center gap-5 border-b border-[var(--border)] px-6 py-6 text-left last:border-0 hover:bg-[var(--surface-soft)]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--gold-soft)]">
                <BrainCircuit
                  size={18}
                  className="text-[var(--gold)]"
                />
              </div>

              <div className="flex-1">
                <p className="text-sm font-medium text-[var(--navy)]">
                  {prediction.prediction}
                </p>

                <p className="mt-1 text-xs text-[var(--text-muted)]">
                  {prediction.zone} · {prediction.window}
                </p>
              </div>

              <div className="w-32">
                <div className="flex justify-between text-xs">
                  <span className="text-[var(--text-muted)]">
                    Probability
                  </span>

                  <span className="font-medium text-[var(--navy)]">
                    {prediction.probability}%
                  </span>
                </div>

                <div className="mt-2 h-1.5 rounded-full bg-[var(--surface-soft)]">
                  <div
                    className="h-full rounded-full bg-[var(--gold)]"
                    style={{
                      width: `${prediction.probability}%`,
                    }}
                  />
                </div>
              </div>

              <ArrowUpRight
                size={16}
                className="text-[var(--text-muted)] opacity-0 group-hover:opacity-100"
              />
            </button>
          ))}
        </div>

        <aside className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-[var(--gold)]" />

            <span className="text-xs font-medium text-[var(--gold)]">
              AI Trust Engine
            </span>
          </div>

          <h2 className="mt-6 text-[22px] font-medium tracking-[-0.03em] text-[var(--navy)]">
            Prediction quality
          </h2>

          <div className="mt-7 flex items-center justify-center">
            <div className="flex h-40 w-40 items-center justify-center rounded-full border-[14px] border-[var(--gold-soft)]">
              <div className="text-center">
                <p className="text-4xl font-medium tracking-[-0.05em] text-[var(--navy)]">
                  89%
                </p>

                <p className="mt-1 text-[10px] text-[var(--text-muted)]">
                  Trust score
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <TrustItem
              icon={CheckCircle2}
              label="Data grounding"
              score="94%"
            />

            <TrustItem
              icon={CheckCircle2}
              label="Evidence relevance"
              score="91%"
            />

            <TrustItem
              icon={AlertTriangle}
              label="Unsupported claims"
              score="0"
            />
          </div>

          <p className="mt-7 text-xs leading-5 text-[var(--text-muted)]">
            Predictions support operational review and should not be treated
            as proof of criminal activity.
          </p>
        </aside>
      </section>
    </AppShell>
  );
}

function TrustItem({
  icon: Icon,
  label,
  score,
}: {
  icon: LucideIcon;
  label: string;
  score: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <Icon size={15} className="text-[var(--success)]" />

      <span className="flex-1 text-xs text-[var(--text-secondary)]">
        {label}
      </span>

      <span className="text-sm font-medium text-[var(--navy)]">
        {score}
      </span>
    </div>
  );
}