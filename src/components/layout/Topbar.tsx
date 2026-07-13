"use client";

import {
  Bell,
  Command,
  Search,
} from "lucide-react";

export default function Topbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-white/80 backdrop-blur-xl">
      <div className="flex h-[72px] items-center justify-between px-10">

        {/* Search */}

        <div className="relative w-[420px]">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
          />

          <input
            placeholder="Search incidents, offenders, reports..."
            className="h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] pl-11 pr-16 text-sm outline-none transition focus:border-[var(--gold)]"
          />

          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 rounded-md border border-[var(--border)] bg-white px-2 py-1 text-[10px] text-[var(--text-muted)]">
            <Command size={12} />
            K
          </div>
        </div>

        {/* Right */}

        <div className="flex items-center gap-4">

          <button className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] bg-white transition hover:bg-[var(--surface-soft)]">
            <Bell size={18} />

            <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-[var(--danger)]" />
          </button>

          <div className="flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-white px-3 py-2 shadow-[var(--shadow-sm)]">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--gold-soft)] font-semibold text-[var(--gold)]">
              NK
            </div>

            <div>
              <p className="text-sm font-medium text-[var(--navy)]">
                Nitin Kanasnale
              </p>

              <p className="text-xs text-[var(--text-muted)]">
                Intelligence Analyst
              </p>
            </div>

          </div>

        </div>

      </div>
    </header>
  );
}