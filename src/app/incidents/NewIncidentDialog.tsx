"use client";

export default function NewIncidentDialog() {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
      <h2 className="text-xl font-semibold text-[var(--navy)]">
        Register New Incident
      </h2>

      <p className="mt-2 text-sm text-[var(--text-secondary)]">
        Upload or manually enter FIR details for AI analysis.
      </p>

      <div className="mt-6 grid gap-4">
        <input
          type="text"
          placeholder="FIR Number"
          className="rounded-xl border p-3"
        />

        <input
          type="text"
          placeholder="Crime Type"
          className="rounded-xl border p-3"
        />

        <input
          type="text"
          placeholder="District"
          className="rounded-xl border p-3"
        />

        <textarea
          placeholder="Incident Description"
          className="rounded-xl border p-3"
          rows={4}
        />

        <button className="rounded-xl bg-[var(--navy)] p-3 text-white">
          Save Incident
        </button>
      </div>
    </div>
  );
}