import { Sparkles } from "lucide-react";

type Props = {
  insight: string;
  confidence: number;
};

export default function AIInsight({
  insight,
  confidence,
}: Props) {
  return (
    <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--gold-soft)]/40 p-5">
      <div className="flex items-center gap-2">
        <Sparkles
          size={16}
          className="text-[var(--gold)]"
        />

        <span className="text-xs font-semibold text-[var(--gold)]">
          TRINETRA AI Insight
        </span>
      </div>

      <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
        {insight}
      </p>

      <div className="mt-5 flex items-center justify-between border-t border-[var(--border)] pt-4">
        <span className="text-xs text-[var(--text-muted)]">
          Confidence
        </span>

        <span className="font-semibold text-[var(--navy)]">
          {confidence}%
        </span>
      </div>
    </div>
  );
}