"use client";

import NewIncidentDialog from "@/components/incidents/NewIncidentDialog";

import { useEffect, useState } from "react";
import { Download, Plus } from "lucide-react";

import IncidentFilters from "@/components/incidents/IncidentFilters";
import IncidentTable from "@/components/incidents/IncidentTable";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import type { Incident } from "@/types/incident";

type ApiIncident = {
  incident_id: string;
  fir_number: string;
  district: string;
  police_station: string;
  crime_type: string;
  incident_datetime: string;
  location: string;
  location_type: string;
  description: string;
  modus_operandi: string;
  suspect_count: number;
  weapon_type: string;
  vehicle_type: string;
  source_type: string;
  verification_status: string;
  data_quality_score: number;
};

export default function IncidentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewIncident, setShowNewIncident] = useState(false);

  useEffect(() => {
    async function loadIncidents() {
      try {
        const response = await fetch(
          "/server/trinetra_function/incidents"
        );

        const data = await response.json();

        const mapped: Incident[] = data.incidents.map(
          (incident: ApiIncident) => {
            const date = new Date(
              incident.incident_datetime.replace(" ", "T")
            );

            return {
              id: incident.incident_id,
              type: incident.crime_type.replaceAll("_", " "),
              district: incident.district,
              location: incident.location,

              date: date.toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }),

              time: date.toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              }),

              status: incident.verification_status,

              risk:
                incident.data_quality_score >= 95
                  ? "Low"
                  : incident.data_quality_score >= 90
                    ? "Moderate"
                    : "Elevated",
            };
          }
        );

        setIncidents(mapped);
      } catch (error) {
        console.error("Failed to load incidents", error);
      } finally {
        setLoading(false);
      }
    }

    loadIncidents();
  }, []);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Sidebar />

      <main className="min-h-screen lg:ml-[88px] xl:ml-[240px]">
        <Topbar />

        <div className="px-4 py-6 sm:px-6 lg:px-8 xl:px-10">
          <div className="mx-auto max-w-[1400px]">
            <div className="flex items-end justify-between">
              <div>
                <p className="mb-2 text-sm text-[var(--text-secondary)]">
                  Operational records
                </p>

                <h1 className="text-[32px] font-medium tracking-[-0.04em] text-[var(--navy)]">
                  Incidents
                </h1>

                <p className="mt-2 text-[15px] text-[var(--text-secondary)]">
                  Review, search, and investigate recorded crime incidents.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button className="flex h-11 items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 text-sm text-[var(--text-secondary)] transition hover:bg-[var(--surface-soft)]">
                  <Download size={16} strokeWidth={1.8} />
                  Export
                </button>

                <button
  onClick={() => setShowNewIncident(true)}
  className="flex h-11 items-center gap-2 rounded-xl bg-[var(--navy)] px-4 text-sm text-white transition hover:opacity-90"
>
  <Plus size={16} strokeWidth={1.8} />
  New incident
</button>
              </div>
            </div>

           {showNewIncident && (
  <div className="mb-6">
    <NewIncidentDialog />
  </div>
)}

<section className="mt-9">
  <IncidentFilters
    searchQuery={searchQuery}
    onSearchChange={setSearchQuery}
  />
</section>

<section className="mt-4 overflow-hidden">
  {loading ? (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center text-sm text-[var(--text-muted)]">
      Loading incidents...
    </div>
  ) : (
    <IncidentTable
      incidents={incidents}
      searchQuery={searchQuery}
    />
  )}
</section>
          </div>
        </div>
      </main>
    </div>
  );
}