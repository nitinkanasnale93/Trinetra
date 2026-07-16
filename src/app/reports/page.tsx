"use client";

import { useMemo, useState } from "react";

import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Download,
  FileCheck2,
  FileText,
  MapPinned,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import AppShell from "@/components/layout/AppShell";
import MetricCard from "@/components/dashboard/MetricCard";

type ReportStatus = "Ready" | "Review";

type Report = {
  id: string;
  title: string;
  district: string;
  type: string;
  date: string;
  status: ReportStatus;
  confidence: number;
  records: number;
  summary: string;
  findings: string[];
  recommendation: string;
};

const reports: Report[] = [
  {
    id: "RPT-001",
    title: "Bengaluru Urban Hotspot Assessment",
    district: "Bengaluru Urban",
    type: "Hotspot analysis",
    date: "13 Jul 2026",
    status: "Ready",
    confidence: 94,
    records: 1284,
    summary:
      "Sustained late-evening incident concentration has been detected across selected Bengaluru Urban operational zones.",
    findings: [
      "Vehicle theft activity increased by 18% during the current monitoring window.",
      "Yelahanka North remains the highest-priority hotspot with a risk score of 92.",
      "Peak incident concentration occurs between 9 PM and 12 AM.",
    ],
    recommendation:
      "Prioritize analyst review of Yelahanka North and connected transport corridors during late-evening operational windows.",
  },
  {
    id: "RPT-002",
    title: "Tumakuru Emerging Risk Review",
    district: "Tumakuru",
    type: "Risk intelligence",
    date: "13 Jul 2026",
    status: "Ready",
    confidence: 87,
    records: 516,
    summary:
      "Tumakuru is showing a rapid increase in incident volume above the historical district baseline.",
    findings: [
      "District incident activity increased by 21% in the current analytical window.",
      "Vehicle theft is the fastest-growing category with a 24% increase.",
      "The strongest incident concentration occurs between 8 PM and 11 PM.",
    ],
    recommendation:
      "Review rapidly emerging activity zones and compare vehicle theft reports across connected locations.",
  },
  {
    id: "RPT-003",
    title: "Mysuru Spatial Pattern Analysis",
    district: "Mysuru",
    type: "Spatial intelligence",
    date: "12 Jul 2026",
    status: "Ready",
    confidence: 89,
    records: 742,
    summary:
      "Recurring spatial activity has been identified across linked Mysuru operational zones and transport corridors.",
    findings: [
      "Burglary activity increased by 16% during the current analysis window.",
      "Incident concentration is strongest between 7 PM and 11 PM.",
      "Linked locations show repeated patterns across nearby operational zones.",
    ],
    recommendation:
      "Review connected transport corridors and compare recurring burglary activity across spatially linked locations.",
  },
  {
    id: "RPT-004",
    title: "Hebbal Corridor Prediction Review",
    district: "Bengaluru Urban",
    type: "Prediction review",
    date: "12 Jul 2026",
    status: "Review",
    confidence: 84,
    records: 316,
    summary:
      "Predictive analysis indicates a possible increase in burglary activity across the Hebbal Corridor within the next 48 hours.",
    findings: [
      "Recurring residential intrusion patterns were detected across nearby zones.",
      "Evidence relevance scored 86% in the current prediction review.",
      "One unsupported analytical claim requires human review.",
    ],
    recommendation:
      "Conduct analyst validation before using the forecast for operational planning.",
  },
];

const metrics = [
  {
    title: "Generated reports",
    value: "48",
    change: "12.4%",
    trend: "up" as const,
    description: "Intelligence reports generated",
    icon: FileText,
  },
  {
    title: "Ready for review",
    value: "12",
    change: "8.1%",
    trend: "up" as const,
    description: "Reports awaiting analyst access",
    icon: FileCheck2,
  },
  {
    title: "Verified reports",
    value: "31",
    change: "6.8%",
    trend: "up" as const,
    description: "Evidence-grounded reports",
    icon: ShieldCheck,
  },
  {
    title: "Average confidence",
    value: "89%",
    change: "2.8%",
    trend: "up" as const,
    description: "Average report confidence score",
    icon: CheckCircle2,
  },
];

const reportTypes = [
  "All reports",
  "Hotspot analysis",
  "Risk intelligence",
  "Spatial intelligence",
  "Prediction review",
];

export default function ReportsPage() {
  const [search, setSearch] = useState("");
  const [reportType, setReportType] =
    useState("All reports");

  const [selectedReport, setSelectedReport] =
    useState<Report>(reports[0]);

  const filteredReports = useMemo(() => {
    const query = search.trim().toLowerCase();

    return reports.filter((report) => {
      const matchesSearch =
        report.title.toLowerCase().includes(query) ||
        report.id.toLowerCase().includes(query) ||
        report.district.toLowerCase().includes(query);

      const matchesType =
        reportType === "All reports" ||
        report.type === reportType;

      return matchesSearch && matchesType;
    });
  }, [search, reportType]);

  const exportReport = () => {
    const reportContent = `
TRINETRA INTELLIGENCE REPORT

Report ID: ${selectedReport.id}
Title: ${selectedReport.title}
District: ${selectedReport.district}
Report Type: ${selectedReport.type}
Generated: ${selectedReport.date}
Status: ${selectedReport.status}
Confidence: ${selectedReport.confidence}%
Records Analysed: ${selectedReport.records}

EXECUTIVE SUMMARY

${selectedReport.summary}

KEY FINDINGS

${selectedReport.findings
  .map(
    (finding, index) =>
      `${index + 1}. ${finding}`
  )
  .join("\n")}

ANALYST RECOMMENDATION

${selectedReport.recommendation}

DISCLAIMER

This prototype report represents a demonstration intelligence workflow.
Predictions and analytical findings require authorized human review before
operational use.

Generated by TRINETRA Intelligence Platform
    `.trim();

    const blob = new Blob([reportContent], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = `${selectedReport.id}-${selectedReport.district
      .toLowerCase()
      .replaceAll(" ", "-")}.txt`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <AppShell>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mb-2 text-sm text-[var(--text-secondary)]">
            Intelligence records
          </p>

          <h1 className="text-3xl font-medium tracking-[-0.04em] text-[var(--navy)] sm:text-[32px]">
            Reports
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--text-secondary)] sm:text-[15px]">
            Generate and review operational intelligence reports.
          </p>
        </div>

        <button
          type="button"
          onClick={exportReport}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[var(--navy)] px-4 text-sm font-medium text-white transition hover:opacity-90 sm:w-auto"
        >
          <Download size={16} />

          Export selected report
        </button>
      </div>

      {/* Metrics */}

      <section className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.title}
            {...metric}
          />
        ))}
      </section>

      {/* Reports Workspace */}

      <section className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(420px,0.9fr)]">
        {/* Report Library */}

        <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
          <div className="border-b border-[var(--border)] p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-[16px] font-medium text-[var(--navy)]">
                  Intelligence report library
                </h2>

                <p className="mt-1 text-xs text-[var(--text-muted)]">
                  Search and review generated analytical reports
                </p>
              </div>

              <span className="text-xs text-[var(--text-muted)]">
                {filteredReports.length} reports
              </span>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex h-10 flex-1 items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--background)] px-3">
                <Search
                  size={15}
                  className="text-[var(--text-muted)]"
                />

                <input
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search report..."
                  className="w-full bg-transparent text-sm text-[var(--navy)] outline-none placeholder:text-[var(--text-muted)]"
                />
              </div>

              <select
                value={reportType}
                onChange={(event) =>
                  setReportType(event.target.value)
                }
                className="h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 text-xs text-[var(--navy)] outline-none sm:w-auto"
              >
                {reportTypes.map((type) => (
                  <option
                    key={type}
                    value={type}
                  >
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {filteredReports.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <FileText
                size={24}
                className="mx-auto text-[var(--text-muted)]"
              />

              <p className="mt-4 text-sm font-medium text-[var(--navy)]">
                No reports found
              </p>

              <p className="mt-2 text-xs text-[var(--text-muted)]">
                Try another report ID, district, or report type.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[var(--border)]">
              {filteredReports.map((report) => {
                const isSelected =
                  selectedReport.id === report.id;

                return (
                  <button
                    key={report.id}
                    type="button"
                    onClick={() =>
                      setSelectedReport(report)
                    }
                    className={`w-full px-5 py-5 text-left transition ${
                      isSelected
                        ? "bg-[var(--gold-soft)]/35"
                        : "hover:bg-[var(--surface-soft)]"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)]">
                        <FileText
                          size={16}
                          className="text-[var(--gold)]"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                          <p className="truncate text-sm font-medium text-[var(--navy)]">
                            {report.title}
                          </p>

                          <span
                            className={`shrink-0 rounded-full px-2 py-1 text-[9px] font-medium ${
                              report.status === "Ready"
                                ? "bg-[#e8f5ee] text-[var(--success)]"
                                : "bg-[#fff4dd] text-[var(--gold)]"
                            }`}
                          >
                            {report.status}
                          </span>
                        </div>

                        <p className="mt-2 text-[11px] text-[var(--text-muted)]">
                          {report.id} · {report.district}
                        </p>

                        <div className="mt-3 flex flex-wrap items-center gap-3 text-[10px] text-[var(--text-muted)]">
                          <span className="flex items-center gap-1">
                            <CalendarDays size={12} />

                            {report.date}
                          </span>

                          <span>
                            {report.type}
                          </span>

                          <span>
                            {report.confidence}% confidence
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Selected Report */}

        <aside className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 xl:sticky xl:top-24">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <Sparkles
                size={16}
                className="text-[var(--gold)]"
              />

              <p className="text-xs font-medium text-[var(--gold)]">
                TRINETRA intelligence report
              </p>
            </div>

            <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]">
              {selectedReport.id}
            </span>
          </div>

          <h2 className="mt-6 break-words text-2xl font-medium leading-8 tracking-[-0.04em] text-[var(--navy)] sm:text-[23px]">
            {selectedReport.title}
          </h2>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[var(--gold-soft)] px-3 py-1.5 text-[10px] font-medium text-[var(--gold)]">
              {selectedReport.type}
            </span>

            <span
              className={`rounded-full px-3 py-1.5 text-[10px] font-medium ${
                selectedReport.status === "Ready"
                  ? "bg-[#e8f5ee] text-[var(--success)]"
                  : "bg-[#fff4dd] text-[var(--gold)]"
              }`}
            >
              {selectedReport.status}
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <ReportStat
              icon={MapPinned}
              label="District"
              value={selectedReport.district}
            />

            <ReportStat
              icon={ShieldCheck}
              label="Confidence"
              value={`${selectedReport.confidence}%`}
            />

            <ReportStat
              icon={Clock3}
              label="Records"
              value={selectedReport.records.toLocaleString()}
            />
          </div>

          <div className="mt-7 border-t border-[var(--border)] pt-6">
            <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]">
              Executive summary
            </p>

            <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
              {selectedReport.summary}
            </p>
          </div>

          <div className="mt-7">
            <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]">
              Key findings
            </p>

            <div className="mt-4 space-y-3">
              {selectedReport.findings.map(
                (finding, index) => (
                  <div
                    key={finding}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--gold-soft)] text-[9px] font-medium text-[var(--gold)]">
                      {index + 1}
                    </div>

                    <p className="text-sm leading-6 text-[var(--text-secondary)]">
                      {finding}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="mt-7 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] p-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <ShieldCheck
                size={15}
                className="text-[var(--gold)]"
              />

              <p className="text-xs font-medium text-[var(--navy)]">
                Analyst recommendation
              </p>
            </div>

            <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
              {selectedReport.recommendation}
            </p>
          </div>

          <button
            type="button"
            onClick={exportReport}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--navy)] px-4 py-3 text-sm font-medium text-white transition hover:opacity-90"
          >
            <Download size={15} />

            Export {selectedReport.id}
          </button>
        </aside>
      </section>
    </AppShell>
  );
}

function ReportStat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MapPinned;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-[var(--border)] p-3 min-w-0">
      <Icon
        size={14}
        className="text-[var(--gold)]"
      />

      <p className="mt-3 text-[9px] uppercase tracking-[0.1em] text-[var(--text-muted)]">
        {label}
      </p>

      <p className="mt-1 break-words text-xs font-medium text-[var(--navy)]">
        {value}
      </p>
    </div>
  );
}