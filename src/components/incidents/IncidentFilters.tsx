"use client";

import {
  CalendarDays,
  ChevronDown,
  Filter,
  Search,
} from "lucide-react";

type IncidentFiltersProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
};

export default function IncidentFilters({
  searchQuery,
  onSearchChange,
}: IncidentFiltersProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="relative w-full max-w-[420px]">
        <Search
          size={16}
          strokeWidth={1.8}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
        />

        <input
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          type="text"
          placeholder="Search incident ID, type, or location..."
          className="h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] pl-10 pr-4 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--gold)]"
        />
      </div>

      <div className="flex items-center gap-2">
        <button className="flex h-11 items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 text-xs text-[var(--text-secondary)] transition hover:bg-[var(--surface-soft)]">
          <CalendarDays size={15} strokeWidth={1.8} />
          Last 30 days
          <ChevronDown size={13} />
        </button>

        <button className="flex h-11 items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 text-xs text-[var(--text-secondary)] transition hover:bg-[var(--surface-soft)]">
          <Filter size={15} strokeWidth={1.8} />
          Filters
        </button>
      </div>
    </div>
  );
}