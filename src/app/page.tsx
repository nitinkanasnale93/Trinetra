import {
  BellRing,
  MapPinned,
  ShieldAlert,
  ScanSearch,
} from "lucide-react";

import CrimeActivityChart, {
  type CrimeActivityPoint,
} from "@/components/dashboard/CrimeActivityChart";
import IntelligenceBrief from "@/components/dashboard/IntelligenceBrief";
import KarnatakaOverview from "@/components/dashboard/KarnatakaOverview";
import MetricCard from "@/components/dashboard/MetricCard";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

import PageTransition from "@/components/motion/PageTransition";
import Reveal from "@/components/motion/Reveal";
import TiltCard from "@/components/motion/TiltCard";

import DashboardScene from "@/components/three/DashboardScene";

import Badge from "@/components/ui/Badge";
import PrimaryButton from "@/components/ui/PrimaryButton";
import SecondaryButton from "@/components/ui/SecondaryButton";

type IntelligenceOverview = {
  total_incidents: number;
  verified_incidents: number;
  districts_covered: number;
  patterns_detected: number;
  total_alerts: number;
  open_alerts: number;
  high_severity_alerts: number;
  average_data_quality: number;
};

type OverviewResponse = {
  success: boolean;
  overview: IntelligenceOverview;
};

type Alert = {
  alert_id: string;
  pattern_id: string;
  alert_title: string;
  alert_type: string;
  severity: string;
  alert_scope: string;
  alert_reason: string;
  pattern_score: number;
  incident_count: number;
  district_count: number;
  alert_status: string;
  created_at: string;
  acknowledged_by: string | null;
  acknowledged_at: string | null;
  acknowledged: boolean;
};

type AlertsResponse = {
  success: boolean;
  count: number;
  alerts: Alert[];
};

type Incident = {
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

type IncidentsResponse = {
  success: boolean;
  count: number;
  incidents: Incident[];
};

type PatternIncident = Incident & {
  association: {
    structured_score: number;
    mo_score: number;
    temporal_score: number;
    geographic_score: number;
    match_score: number;
    match_reasons: string;
    association_status: string;
    analysis_version: string;
  };
};

type CrimePattern = {
  pattern_id: string;
  pattern_name: string;
  crime_type: string;
  pattern_score: number;
  structured_score: number;
  mo_score: number;
  temporal_score: number;
  geographic_score: number;
  analysis_confidence: string;
  why_linked: string;
  pattern_scope: string;
  pattern_status: string;
  incident_count: number;
  district_count: number;
  districts: string[];
  incidents: PatternIncident[];
};

type PatternsResponse = {
  success: boolean;
  count: number;
  patterns: CrimePattern[];
};

type DistrictActivity = {
  district: string;
  incidentCount: number;
  linkedPatternCount: number;
  risk: "Elevated" | "Moderate" | "Low";
};

const API_BASE_URL =
  process.env.TRINETRA_API_BASE_URL ??
  "https://trinetra-60073522764.development.catalystserverless.in/server/trinetra_function";


async function getIntelligenceOverview(): Promise<IntelligenceOverview> {
  const response = await fetch(
    `${API_BASE_URL}/intelligence-overview`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to load intelligence overview: ${response.status}`
    );
  }

  const data: OverviewResponse = await response.json();

  if (!data.success) {
    throw new Error("TRINETRA overview API returned an error");
  }

  return data.overview;
}

async function getAlerts(): Promise<Alert[]> {
  const response = await fetch(`${API_BASE_URL}/alerts`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `Failed to load intelligence alerts: ${response.status}`
    );
  }

  const data: AlertsResponse = await response.json();

  if (!data.success) {
    throw new Error("TRINETRA alerts API returned an error");
  }

  return data.alerts;
}

async function getIncidents(): Promise<Incident[]> {
  const response = await fetch(`${API_BASE_URL}/incidents`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `Failed to load incidents: ${response.status}`
    );
  }

  const data: IncidentsResponse = await response.json();

  if (!data.success) {
    throw new Error("TRINETRA incidents API returned an error");
  }

  return data.incidents;
}

async function getPatterns(): Promise<CrimePattern[]> {
  const response = await fetch(`${API_BASE_URL}/patterns`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `Failed to load crime patterns: ${response.status}`
    );
  }

  const data: PatternsResponse = await response.json();

  if (!data.success) {
    throw new Error("TRINETRA patterns API returned an error");
  }

  return data.patterns;
}

export default async function Home() {
  const [overview, alerts, incidents, patterns] =
    await Promise.all([
      getIntelligenceOverview(),
      getAlerts(),
      getIncidents(),
      getPatterns(),
    ]);

  const highestPriorityAlert = alerts
    .filter((alert) => alert.alert_status === "OPEN")
    .sort(
      (first, second) =>
        second.pattern_score - first.pattern_score
    )[0];

  const linkedIncidentIds = new Set(
    patterns.flatMap((pattern) =>
      pattern.incidents.map(
        (incident) => incident.incident_id
      )
    )
  );

  const districtIncidentCounts = incidents.reduce<
    Record<string, number>
  >((counts, incident) => {
    counts[incident.district] =
      (counts[incident.district] || 0) + 1;

    return counts;
  }, {});

  const districtActivity: DistrictActivity[] = Object.entries(
    districtIncidentCounts
  )
    .map(([district, incidentCount]) => {
      const linkedPatternCount = incidents.filter(
        (incident) =>
          incident.district === district &&
          linkedIncidentIds.has(incident.incident_id)
      ).length;

      let risk: DistrictActivity["risk"] = "Low";

      if (linkedPatternCount > 0) {
        risk = "Elevated";
      } else if (incidentCount > 1) {
        risk = "Moderate";
      }

      return {
        district,
        incidentCount,
        linkedPatternCount,
        risk,
      };
    })
    .sort((first, second) => {
      if (
        second.linkedPatternCount !== first.linkedPatternCount
      ) {
        return (
          second.linkedPatternCount -
          first.linkedPatternCount
        );
      }

      return second.incidentCount - first.incidentCount;
    });

  const crimeActivityMap = incidents.reduce<
    Record<string, number>
  >((activity, incident) => {
    const date = incident.incident_datetime.slice(0, 10);

    activity[date] = (activity[date] || 0) + 1;

    return activity;
  }, {});

  const crimeActivity: CrimeActivityPoint[] = Object.entries(
    crimeActivityMap
  )
    .sort(([firstDate], [secondDate]) =>
      firstDate.localeCompare(secondDate)
    )
    .map(([date, incidentCount]) => {
      const parsedDate = new Date(`${date}T00:00:00`);

      return {
        date,
        label: parsedDate.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
        }),
        incidents: incidentCount,
      };
    });

  const metrics = [
    {
      title: "Verified incidents",
      value: overview.verified_incidents.toLocaleString(),
      change: `${overview.total_incidents}`,
      trend: "up" as const,
      description: `${overview.total_incidents} incident records available for analysis`,
      icon: ShieldAlert,
    },
    {
      title: "Open intelligence alerts",
      value: overview.open_alerts.toString(),
      change: `${overview.high_severity_alerts}`,
      trend: "up" as const,
      description: `${overview.high_severity_alerts} high-severity alert requires review`,
      icon: BellRing,
    },
    {
      title: "Districts covered",
      value: overview.districts_covered.toString(),
      change: `${overview.districts_covered}`,
      trend: "up" as const,
      description:
        "Jurisdictions represented in the current intelligence dataset",
      icon: MapPinned,
    },
    {
      title: "Detected patterns",
      value: overview.patterns_detected.toString(),
      change: `${highestPriorityAlert?.pattern_score || 0}%`,
      trend: "up" as const,
      description: highestPriorityAlert
        ? `Highest detected pattern confidence: ${highestPriorityAlert.pattern_score}%`
        : "No qualifying intelligence pattern detected",
      icon: ScanSearch,
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Sidebar />

      <main className="min-h-screen lg:ml-[88px] xl:ml-[240px]">
        <Topbar />

        <div className="px-4 py-6 sm:px-6 lg:px-8 xl:px-10">
          <div className="mx-auto max-w-[1400px]">
            <PageTransition>
              <section className="relative overflow-hidden rounded-[32px] border border-[var(--border)] bg-white px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12 xl:px-12 xl:py-12 shadow-[var(--shadow-sm)]">
                <div className="pointer-events-none absolute right-0 top-0 hidden h-full w-[45%] xl:block">
                  <DashboardScene />
                </div>

                <div className="relative z-10 max-w-[620px]">
                  <Badge>
                    {overview.open_alerts > 0
                      ? "Intelligence Alert Active"
                      : "AI Intelligence Active"}
                  </Badge>

                  <h1 className="mt-6 text-3xl font-semibold tracking-[-0.05em] text-[var(--navy)] sm:text-4xl lg:text-5xl">
                    Operational Intelligence
                  </h1>

                  <p className="mt-5 text-base leading-7 text-[var(--text-secondary)] lg:text-lg lg:leading-8">
                    TRINETRA analyzes verified incident records to
                    identify explainable cross-jurisdiction crime
                    patterns and surface actionable intelligence
                    alerts.
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <PrimaryButton>
                      Review Intelligence
                    </PrimaryButton>

                    <SecondaryButton>
                      View Reports
                    </SecondaryButton>
                  </div>

                  <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
                    <div>
                      <p className="text-sm text-[var(--text-muted)]">
                        Open Alerts
                      </p>

                      <h3 className="mt-1 text-3xl font-semibold text-[var(--navy)]">
                        {overview.open_alerts}
                      </h3>
                    </div>

                    <div>
                      <p className="text-sm text-[var(--text-muted)]">
                        Patterns
                      </p>

                      <h3 className="mt-1 text-3xl font-semibold text-[var(--navy)]">
                        {overview.patterns_detected}
                      </h3>
                    </div>

                    <div>
                      <p className="text-sm text-[var(--text-muted)]">
                        Data Quality
                      </p>

                      <h3 className="mt-1 text-3xl font-semibold text-[var(--navy)]">
                        {overview.average_data_quality}%
                      </h3>
                    </div>
                  </div>
                </div>
              </section>
            </PageTransition>

            <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {metrics.map((metric, index) => (
                <TiltCard
                  key={metric.title}
                  delay={0.08 + index * 0.07}
                >
                  <MetricCard {...metric} />
                </TiltCard>
              ))}
            </section>

            <Reveal delay={0.12}>
              <section className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1.8fr)_minmax(320px,0.8fr)]">
                <CrimeActivityChart data={crimeActivity} />

                <IntelligenceBrief
                  alert={highestPriorityAlert}
                  analysedIncidentCount={overview.verified_incidents}
                />
              </section>
            </Reveal>

            <Reveal delay={0.18}>
              <section className="mt-4 overflow-hidden">
                <KarnatakaOverview
                  districts={districtActivity}
                  monitoredDistrictCount={overview.districts_covered}
                />
              </section>
            </Reveal>
          </div>
        </div>
      </main>
    </div>
  );
}