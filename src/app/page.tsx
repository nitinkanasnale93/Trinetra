import {
  BellRing,
  MapPinned,
  ShieldAlert,
  Users,
} from "lucide-react";

import CrimeActivityChart from "@/components/dashboard/CrimeActivityChart";
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

const metrics = [
  {
    title: "Recorded incidents",
    value: "1,284",
    change: "12.4%",
    trend: "up" as const,
    description: "Compared with the previous 30 days",
    icon: ShieldAlert,
  },
  {
    title: "Active alerts",
    value: "18",
    change: "5.2%",
    trend: "up" as const,
    description: "Five alerts require immediate review",
    icon: BellRing,
  },
  {
    title: "Priority hotspots",
    value: "24",
    change: "8.1%",
    trend: "down" as const,
    description: "Across seven monitored districts",
    icon: MapPinned,
  },
  {
    title: "Linked offenders",
    value: "342",
    change: "3.8%",
    trend: "up" as const,
    description: "Detected through relationship analysis",
    icon: Users,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Sidebar />

      <main className="ml-[240px] min-h-screen">
        <Topbar />

        <div className="px-10 py-10">
          <div className="mx-auto max-w-[1400px]">
            <PageTransition>
              <section className="relative overflow-hidden rounded-[32px] border border-[var(--border)] bg-white px-12 py-12 shadow-[var(--shadow-sm)]">
                <div className="pointer-events-none absolute right-0 top-0 h-full w-[45%]">
                  <DashboardScene />
                </div>

                <div className="relative z-10 max-w-[620px]">
                  <Badge>AI Intelligence Active</Badge>

                  <h1 className="mt-6 text-5xl font-semibold tracking-[-0.05em] text-[var(--navy)]">
                    Operational Intelligence
                  </h1>

                  <p className="mt-5 text-lg leading-8 text-[var(--text-secondary)]">
                    TRINETRA continuously analyzes incident data, hotspot activity,
                    offender relationships, and predictive intelligence across Karnataka.
                  </p>

                  <div className="mt-8 flex gap-4">
                    <PrimaryButton>
                      Review Intelligence
                    </PrimaryButton>

                    <SecondaryButton>
                      View Reports
                    </SecondaryButton>
                  </div>

                  <div className="mt-10 flex gap-10">
                    <div>
                      <p className="text-sm text-[var(--text-muted)]">
                        Active Alerts
                      </p>

                      <h3 className="mt-1 text-3xl font-semibold text-[var(--navy)]">
                        18
                      </h3>
                    </div>

                    <div>
                      <p className="text-sm text-[var(--text-muted)]">
                        Hotspots
                      </p>

                      <h3 className="mt-1 text-3xl font-semibold text-[var(--navy)]">
                        24
                      </h3>
                    </div>

                    <div>
                      <p className="text-sm text-[var(--text-muted)]">
                        Confidence
                      </p>

                      <h3 className="mt-1 text-3xl font-semibold text-[var(--navy)]">
                        94%
                      </h3>
                    </div>
                  </div>
                </div>
              </section>
            </PageTransition>

            <section className="mt-6 grid grid-cols-4 gap-4">
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
              <section className="mt-4 grid grid-cols-[minmax(0,1.8fr)_minmax(320px,0.8fr)] gap-4">
                <CrimeActivityChart />

                <IntelligenceBrief />
              </section>
            </Reveal>

            <Reveal delay={0.18}>
              <section className="mt-4">
                <KarnatakaOverview />
              </section>
            </Reveal>
          </div>
        </div>
      </main>
    </div>
  );
}