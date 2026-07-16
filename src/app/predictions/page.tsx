"use client";

import { useState } from "react";

import {
  AlertTriangle,
  ArrowUpRight,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  Database,
  MapPinned,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import AppShell from "@/components/layout/AppShell";

type Prediction = {
  id: string;
  zone: string;
  prediction: string;
  probability: number;
  window: string;
  trustScore: number;
  dataGrounding: number;
  evidenceRelevance: number;
  unsupportedClaims: number;
  records: number;
  pattern: string;
  reasoning: string;
  recommendation: string;
};

const predictions: Prediction[] = [
  {
    id: "PRD-001",
    zone: "Yelahanka North",
    prediction: "Elevated vehicle theft activity",
    probability: 87,
    window: "Next 24 hours",
    trustScore: 89,
    dataGrounding: 94,
    evidenceRelevance: 91,
    unsupportedClaims: 0,
    records: 428,
    pattern: "Late-evening vehicle activity",
    reasoning:
      "Recent vehicle theft incidents show repeated late-evening clustering near parking corridors and connected transit routes.",
    recommendation:
      "Increase patrol visibility across identified parking corridors between 9 PM and 1 AM.",
  },
  {
    id: "PRD-002",
    zone: "Hebbal Corridor",
    prediction: "Burglary activity may increase",
    probability: 74,
    window: "Next 48 hours",
    trustScore: 84,
    dataGrounding: 88,
    evidenceRelevance: 86,
    unsupportedClaims: 1,
    records: 316,
    pattern: "Recurring residential intrusion pattern",
    reasoning:
      "Burglary reports indicate recurring spatial activity across nearby residential zones with similar time windows.",
    recommendation:
      "Review residential patrol coverage and monitor repeat activity between 11 PM and 3 AM.",
  },
  {
    id: "PRD-003",
    zone: "Whitefield East",
    prediction: "Cyber fraud reporting concentration",
    probability: 68,
    window: "Next 7 days",
    trustScore: 78,
    dataGrounding: 82,
    evidenceRelevance: 79,
    unsupportedClaims: 2,
    records: 241,
    pattern: "Concentrated digital fraud reporting",
    reasoning:
      "Recent complaint records show an increase in similarly classified digital fraud reports across connected reporting zones.",
    recommendation:
      "Prioritize complaint correlation and review repeated transaction or communication indicators.",
  },
];

export default function PredictionsPage() {
  const [selectedPrediction, setSelectedPrediction] =
    useState<Prediction>(predictions[0]);

  return (
    <AppShell>
      <p className="mb-2 text-sm text-[var(--text-secondary)]">
        Predictive intelligence
      </p>

      <h1 className="text-3xl font-medium tracking-[-0.04em] text-[var(--navy)] sm:text-[32px]">
        Predictions
      </h1>

      <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--text-secondary)] sm:text-[15px]">
        Review data-driven risk forecasts and the evidence behind them.
      </p>

      <section className="mt-9 grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
        {/* Active Predictions */}

        <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
          <div className="border-b border-[var(--border)] px-6 py-5">
            <h2 className="text-[16px] font-medium text-[var(--navy)]">
              Active predictions
            </h2>

            <p className="mt-1 text-xs text-[var(--text-muted)]">
              Ranked by forecast probability
            </p>
          </div>

          {predictions.map((prediction) => {
            const isSelected =
              selectedPrediction.id === prediction.id;

            return (
              <button
                key={prediction.id}
                type="button"
                onClick={() =>
                  setSelectedPrediction(prediction)
                }
                className={`group flex w-full flex-col items-start gap-4 border-b border-[var(--border)] px-6 py-6 text-left transition last:border-0 sm:flex-row sm:items-center ${
                  isSelected
                    ? "bg-[var(--gold-soft)]/35"
                    : "hover:bg-[var(--surface-soft)]"
                }`}
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl transition ${
                    isSelected
                      ? "bg-[var(--gold)] text-white"
                      : "bg-[var(--gold-soft)] text-[var(--gold)]"
                  }`}
                >
                  <BrainCircuit size={18} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
                    <p className="text-sm font-medium text-[var(--navy)]">
                      {prediction.prediction}
                    </p>

                    <span className="text-[10px] text-[var(--text-muted)]">
                      {prediction.id}
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-[var(--text-muted)]">
                    {prediction.zone} · {prediction.window}
                  </p>
                </div>

                <div className="w-full sm:w-32">
  <div className="flex justify-between text-xs">
    <span className="text-[var(--text-muted)]">
      Probability
    </span>

    <span className="font-medium text-[var(--navy)]">
      {prediction.probability}%
    </span>
  </div>

  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[var(--surface-soft)]">
    <div
      className="h-full rounded-full bg-[var(--gold)] transition-all duration-700"
      style={{
        width: `${prediction.probability}%`,
      }}
    />
  </div>
</div>

<div className="self-end sm:self-auto">
  <ArrowUpRight
    size={16}
    className={`text-[var(--text-muted)] transition ${
      isSelected
        ? "opacity-100"
        : "opacity-0 group-hover:opacity-100"
    }`}
  />
</div>

</button>
);
})}
</div>

{/* AI Trust Engine */}

        <aside className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 xl:sticky xl:top-24">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
            <Sparkles
              size={16}
              className="text-[var(--gold)]"
            />

            <span className="text-xs font-medium text-[var(--gold)]">
              AI Trust Engine
            </span>
          </div>

          <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]">
            {selectedPrediction.id}
          </p>

          <h2 className="mt-1 text-[22px] font-medium tracking-[-0.03em] text-[var(--navy)]">
            Prediction quality
          </h2>

          <p className="mt-2 text-xs text-[var(--text-muted)]">
            {selectedPrediction.zone}
          </p>

          <div className="mt-7 flex items-center justify-center">
            <div className="flex h-32 w-32 sm:h-40 sm:w-40 items-center justify-center rounded-full border-[14px] border-[var(--gold-soft)]">
              <div className="text-center">
                <p className="text-4xl font-medium tracking-[-0.05em] text-[var(--navy)]">
                  {selectedPrediction.trustScore}%
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
              score={`${selectedPrediction.dataGrounding}%`}
            />

            <TrustItem
              icon={CheckCircle2}
              label="Evidence relevance"
              score={`${selectedPrediction.evidenceRelevance}%`}
            />

            <TrustItem
              icon={AlertTriangle}
              label="Unsupported claims"
              score={`${selectedPrediction.unsupportedClaims}`}
              warning={
                selectedPrediction.unsupportedClaims > 0
              }
            />
          </div>

          <p className="mt-7 text-xs leading-5 text-[var(--text-muted)]">
            Predictions support operational review and should not be treated
            as proof of criminal activity.
          </p>
        </aside>
      </section>

      {/* Prediction Analysis */}

      <section className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
            <BrainCircuit
              size={16}
              className="text-[var(--gold)]"
            />

            <p className="text-xs font-medium text-[var(--gold)]">
              TRINETRA prediction analysis
            </p>
          </div>

          <h2 className="mt-5 text-[22px] font-medium tracking-[-0.03em] text-[var(--navy)]">
            {selectedPrediction.prediction}
          </h2>

          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            {selectedPrediction.zone} ·{" "}
            {selectedPrediction.window}
          </p>

          <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <PredictionSignal
              icon={MapPinned}
              label="Forecast zone"
              value={selectedPrediction.zone}
            />

            <PredictionSignal
              icon={Clock3}
              label="Forecast window"
              value={selectedPrediction.window}
            />

            <PredictionSignal
              icon={Database}
              label="Records analysed"
              value={selectedPrediction.records.toLocaleString()}
            />
          </div>

          <div className="mt-6 rounded-2xl bg-[var(--surface-soft)] p-5">
            <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]">
              Pattern detected
            </p>

            <p className="mt-2 text-sm font-medium text-[var(--navy)]">
              {selectedPrediction.pattern}
            </p>

            <p className="mt-4 text-sm leading-6 text-[var(--text-secondary)]">
              {selectedPrediction.reasoning}
            </p>
          </div>
        </div>

        <aside className="rounded-2xl border border-[var(--border)] bg-[var(--gold-soft)]/35 p-6 xl:sticky xl:top-24">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
            <ShieldCheck
              size={16}
              className="text-[var(--gold)]"
            />

            <p className="text-xs font-medium text-[var(--gold)]">
              Recommended action
            </p>
          </div>

          <h2 className="mt-5 text-xl font-medium tracking-[-0.03em] text-[var(--navy)]">
            Operational recommendation
          </h2>

          <p className="mt-4 text-sm leading-6 text-[var(--text-secondary)]">
            {selectedPrediction.recommendation}
          </p>

          <div className="mt-6 rounded-xl border border-[var(--border)] bg-white/60 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[var(--text-muted)]">
                Forecast probability
              </span>

              <span className="text-sm font-medium text-[var(--navy)]">
                {selectedPrediction.probability}%
              </span>
            </div>

            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white">
              <div
                className="h-full rounded-full bg-[var(--gold)] transition-all duration-700"
                style={{
                  width: `${selectedPrediction.probability}%`,
                }}
              />
            </div>
          </div>

          <button
            type="button"
            className="mt-6 w-full rounded-xl bg-[var(--navy)] px-4 py-3 text-sm text-white transition hover:opacity-90"
          >
            Review supporting evidence
          </button>
        </aside>
      </section>
    </AppShell>
  );
}

function TrustItem({
  icon: Icon,
  label,
  score,
  warning = false,
}: {
  icon: LucideIcon;
  label: string;
  score: string;
  warning?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <Icon
        size={15}
        className={
          warning
            ? "text-[var(--danger)]"
            : "text-[var(--success)]"
        }
      />

      <span className="flex-1 text-xs text-[var(--text-secondary)]">
        {label}
      </span>

      <span className="text-sm font-medium text-[var(--navy)]">
        {score}
      </span>
    </div>
  );
}

function PredictionSignal({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-[var(--border)] p-4 min-w-0">
      <Icon
        size={16}
        className="text-[var(--gold)]"
      />

      <p className="mt-4 text-[10px] text-[var(--text-muted)]">
        {label}
      </p>

      <p className="mt-1 break-words text-sm font-medium text-[var(--navy)]">
        {value}
      </p>
    </div>
  );
}