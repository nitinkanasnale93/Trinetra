"use client";

import { useState } from "react";
import { Download, Plus } from "lucide-react";

import IncidentFilters from "@/components/incidents/IncidentFilters";
import IncidentTable from "@/components/incidents/IncidentTable";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

export default function IncidentsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Sidebar />

      <main className="ml-[240px] min-h-screen">
        <Topbar />

        <div className="px-10 py-10">
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

                <button className="flex h-11 items-center gap-2 rounded-xl bg-[var(--navy)] px-4 text-sm text-white transition hover:opacity-90">
                  <Plus size={16} strokeWidth={1.8} />
                  New incident
                </button>
              </div>
            </div>

            <section className="mt-9">
              <IncidentFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            </section>

            <section className="mt-4">
              <IncidentTable searchQuery={searchQuery} />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}