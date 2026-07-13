"use client";

import {
  Activity,
  Clock3,
  Database,
  Link2,
  MapPin,
  ShieldCheck,
  Sparkles,
  X,
  type LucideIcon,
} from "lucide-react";

import { Incident } from "@/types/incident";

type IncidentDrawerProps = {
  incident: Incident | null;
  onClose: () => void;
};

export default function IncidentDrawer({
  incident,
  onClose,
}: IncidentDrawerProps) {
  if (!incident) return null;

  return (
    <>
      <button
        aria-label="Close incident drawer"
        onClick={onClose}
        className="fixed inset-0 z-40 cursor-default bg-[var(--navy)]/10 backdrop-blur-[1px]"
      />

      <aside className="fixed bottom-0 right-0 top-0 z-50 w-full max-w-[520px] animate-[drawer-in_280ms_cubic-bezier(0.22,1,0.36,1)] overflow-y-auto border-l border-[var(--border)] bg-[var(--surface)] shadow-2xl">
        <div className="sticky top-0 z-10 flex h-[72px] items-center justify-between border-b border-[var(--border)] bg-[var(--surface)] px-7">
          <div>
            <p className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
              Incident intelligence
            </p>

            <p className="mt-1 text-sm font-medium text-[var(--navy)]">
              {incident.id}
            </p>
          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-soft)] hover:text-[var(--navy)]"
          >
            <X size={18} strokeWidth={1.8} />
          </button>
        </div>

        <div className="p-7">
          <div>
            <span className="rounded-full bg-[#f8e8e8] px-2.5 py-1 text-[10px] font-medium text-[var(--danger)]">
              {incident.risk} risk
            </span>

            <h2 className="mt-5 text-[28px] font-medium tracking-[-0.04em] text-[var(--navy)]">
              {incident.type}
            </h2>

            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              {incident.status}
            </p>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-[var(--border)] p-4">
              <MapPin
                size={16}
                strokeWidth={1.8}
                className="text-[var(--text-muted)]"
              />

              <p className="mt-4 text-[10px] uppercase tracking-[0.1em] text-[var(--text-muted)]">
                Location
              </p>

              <p className="mt-1 text-sm font-medium text-[var(--navy)]">
                {incident.location}
              </p>

              <p className="mt-1 text-[11px] text-[var(--text-muted)]">
                {incident.district}
              </p>
            </div>

            <div className="rounded-xl border border-[var(--border)] p-4">
              <Clock3
                size={16}
                strokeWidth={1.8}
                className="text-[var(--text-muted)]"
              />

              <p className="mt-4 text-[10px] uppercase tracking-[0.1em] text-[var(--text-muted)]">
                Recorded
              </p>

              <p className="mt-1 text-sm font-medium text-[var(--navy)]">
                {incident.date}
              </p>

              <p className="mt-1 text-[11px] text-[var(--text-muted)]">
                {incident.time}
              </p>
            </div>
          </div>

          <section className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--gold-soft)]/40 p-5">
            <div className="flex items-center gap-2">
              <Sparkles
                size={15}
                strokeWidth={1.8}
                className="text-[var(--gold)]"
              />

              <p className="text-xs font-medium text-[var(--gold)]">
                TRINETRA analysis
              </p>
            </div>

            <h3 className="mt-4 text-[17px] font-medium leading-6 tracking-[-0.02em] text-[var(--navy)]">
              Similar activity pattern detected across nearby incidents.
            </h3>

            <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
              Four incidents within a 3.2 km radius share similar time and
              location characteristics. The strongest relationship appears
              between late-evening activity patterns.
            </p>

            <div className="mt-5 flex items-center justify-between border-t border-[var(--border)] pt-4">
              <span className="text-xs text-[var(--text-muted)]">
                Confidence
              </span>

              <span className="text-sm font-medium text-[var(--navy)]">
                87%
              </span>
            </div>
          </section>

          <section className="mt-8">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-[var(--navy)]">
                Intelligence signals
              </h3>

              <span className="text-[11px] text-[var(--text-muted)]">
                4 detected
              </span>
            </div>

            <div className="mt-4 space-y-3">
              <Signal
                icon={Link2}
                title="Linked incidents"
                description="4 incidents share related characteristics"
              />

              <Signal
                icon={Activity}
                title="Temporal pattern"
                description="Activity concentrated between 9 PM and midnight"
              />

              <Signal
                icon={Database}
                title="Data grounding"
                description="Analysis based on 1,284 incident records"
              />

              <Signal
                icon={ShieldCheck}
                title="Evidence check"
                description="No unsupported claims detected"
              />
            </div>
          </section>

          <section className="mt-8 border-t border-[var(--border)] pt-7">
            <h3 className="text-sm font-medium text-[var(--navy)]">
              Investigation timeline
            </h3>

            <div className="mt-5 space-y-0">
              <TimelineItem
                title="Incident recorded"
                time={`${incident.date} · ${incident.time}`}
              />

              <TimelineItem
                title="Pattern analysis completed"
                time="2 minutes after ingestion"
              />

              <TimelineItem
                title="Intelligence signal generated"
                time="Confidence threshold exceeded"
                last
              />
            </div>
          </section>
        </div>
      </aside>
    </>
  );
}

type SignalProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

function Signal({
  icon: Icon,
  title,
  description,
}: SignalProps) {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-[var(--border)] p-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--surface-soft)]">
        <Icon
          className="h-[15px] w-[15px] text-[var(--text-secondary)]"
          strokeWidth={1.8}
        />
      </div>

      <div>
        <p className="text-sm font-medium text-[var(--navy)]">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-[var(--text-muted)]">
          {description}
        </p>
      </div>
    </div>
  );
}

type TimelineItemProps = {
  title: string;
  time: string;
  last?: boolean;
};

function TimelineItem({
  title,
  time,
  last = false,
}: TimelineItemProps) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="mt-1.5 h-2 w-2 rounded-full bg-[var(--gold)]" />

        {!last && (
          <div className="min-h-12 w-px flex-1 bg-[var(--border)]" />
        )}
      </div>

      <div className={last ? "" : "pb-6"}>
        <p className="text-sm text-[var(--navy)]">
          {title}
        </p>

        <p className="mt-1 text-[11px] text-[var(--text-muted)]">
          {time}
        </p>
      </div>
    </div>
  );
}