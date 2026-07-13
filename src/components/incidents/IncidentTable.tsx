"use client";

import { useState } from "react";
import { ArrowUpRight, MoreHorizontal } from "lucide-react";

import IncidentDrawer from "@/components/incidents/IncidentDrawer";
import { incidents } from "@/lib/incidents";
import { Incident, IncidentRisk } from "@/types/incident";

const riskStyles: Record<IncidentRisk, string> = {
  Critical: "bg-[#f8e8e8] text-[var(--danger)]",
  Elevated: "bg-[#f8eeee] text-[var(--danger)]",
  Moderate: "bg-[var(--gold-soft)] text-[var(--warning)]",
  Low: "bg-[#e8f2ed] text-[var(--success)]",
};

type IncidentTableProps = {
  searchQuery: string;
};

export default function IncidentTable({
  searchQuery,
}: IncidentTableProps) {
  const [selectedIncident, setSelectedIncident] =
    useState<Incident | null>(null);

  const filteredIncidents = incidents.filter((incident) => {
    const query = searchQuery.toLowerCase().trim();

    return (
      incident.id.toLowerCase().includes(query) ||
      incident.type.toLowerCase().includes(query) ||
      incident.location.toLowerCase().includes(query) ||
      incident.district.toLowerCase().includes(query)
    );
  });

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="px-6 py-4 text-left text-[10px] font-medium uppercase tracking-[0.1em] text-[var(--text-muted)]">
                  Incident
                </th>

                <th className="px-6 py-4 text-left text-[10px] font-medium uppercase tracking-[0.1em] text-[var(--text-muted)]">
                  Location
                </th>

                <th className="px-6 py-4 text-left text-[10px] font-medium uppercase tracking-[0.1em] text-[var(--text-muted)]">
                  Date & time
                </th>

                <th className="px-6 py-4 text-left text-[10px] font-medium uppercase tracking-[0.1em] text-[var(--text-muted)]">
                  Risk
                </th>

                <th className="px-6 py-4 text-left text-[10px] font-medium uppercase tracking-[0.1em] text-[var(--text-muted)]">
                  Status
                </th>

                <th className="w-16 px-6 py-4" />
              </tr>
            </thead>

            <tbody>
              {filteredIncidents.map((incident) => (
                <tr
                  key={incident.id}
                  onClick={() => setSelectedIncident(incident)}
                  className="group cursor-pointer border-b border-[var(--border)] transition last:border-b-0 hover:bg-[var(--surface-soft)]"
                >
                  <td className="px-6 py-5">
                    <p className="text-sm font-medium text-[var(--navy)]">
                      {incident.type}
                    </p>

                    <p className="mt-1 text-[11px] text-[var(--text-muted)]">
                      {incident.id}
                    </p>
                  </td>

                  <td className="px-6 py-5">
                    <p className="text-sm text-[var(--text-primary)]">
                      {incident.location}
                    </p>

                    <p className="mt-1 text-[11px] text-[var(--text-muted)]">
                      {incident.district}
                    </p>
                  </td>

                  <td className="px-6 py-5">
                    <p className="text-sm text-[var(--text-primary)]">
                      {incident.date}
                    </p>

                    <p className="mt-1 text-[11px] text-[var(--text-muted)]">
                      {incident.time}
                    </p>
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${riskStyles[incident.risk]}`}
                    >
                      {incident.risk}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <p className="text-xs text-[var(--text-secondary)]">
                      {incident.status}
                    </p>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-muted)]">
                      <ArrowUpRight
                        size={15}
                        strokeWidth={1.8}
                        className="hidden group-hover:block"
                      />

                      <MoreHorizontal
                        size={16}
                        strokeWidth={1.8}
                        className="group-hover:hidden"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredIncidents.length === 0 && (
            <div className="flex min-h-[260px] flex-col items-center justify-center border-t border-[var(--border)] px-6 text-center">
              <p className="text-sm font-medium text-[var(--navy)]">
                No incidents found
              </p>

              <p className="mt-2 text-xs text-[var(--text-muted)]">
                Try searching with a different incident ID, type, or location.
              </p>
            </div>
          )}
        </div>
      </div>

      <IncidentDrawer
        incident={selectedIncident}
        onClose={() => setSelectedIncident(null)}
      />
    </>
  );
}