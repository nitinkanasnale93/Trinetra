"use client";

import {
  Bell,
  ChartNoAxesColumnIncreasing,
  FileText,
  Flame,
  LayoutDashboard,
  Map,
  Network,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  {
    label: "Overview",
    items: [
      {
        name: "Dashboard",
        icon: LayoutDashboard,
        href: "/",
      },
      {
        name: "Incidents",
        icon: ShieldCheck,
        href: "/incidents",
      },
      {
        name: "Hotspots",
        icon: Flame,
        href: "/hotspots",
      },
      {
        name: "Geospatial",
        icon: Map,
        href: "/geospatial",
      },
    ],
  },
  {
    label: "Intelligence",
    items: [
      {
        name: "Networks",
        icon: Network,
        href: "/networks",
      },
      {
        name: "Predictions",
        icon: Sparkles,
        href: "/predictions",
      },
      {
        name: "Analytics",
        icon: ChartNoAxesColumnIncreasing,
        href: "/analytics",
      },
      {
        name: "Reports",
        icon: FileText,
        href: "/reports",
      },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="
        fixed
        left-0
        top-0
        z-40
        hidden
        h-screen
        border-r
        border-[var(--border)]
        bg-[var(--surface)]
        lg:flex
        lg:w-[88px]
        xl:w-[240px]
        flex-col
      "
    >
      {/* Logo */}
      <div className="flex h-[72px] items-center justify-center xl:justify-start xl:px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--navy)] text-white">
            <span className="text-xs font-semibold">T</span>
          </div>

          <div className="hidden xl:block">
            <h1 className="text-[15px] font-semibold tracking-[-0.02em] text-[var(--navy)]">
              TRINETRA
            </h1>

            <p className="text-[10px] text-[var(--text-muted)]">
              Intelligence Platform
            </p>
          </div>
        </Link>
      </div>

      {/* Search */}
      <div className="hidden xl:block px-4">
        <button className="flex h-10 w-full items-center gap-3 rounded-lg border border-[var(--border)] px-3 text-left text-sm text-[var(--text-secondary)] transition hover:bg-[var(--surface-soft)]">
          <Search size={16} strokeWidth={1.8} />

          <span className="flex-1">Search</span>

          <span className="text-[11px] text-[var(--text-muted)]">
            ⌘ K
          </span>
        </button>
      </div>

      <nav className="mt-7 flex-1 overflow-y-auto px-2 xl:px-3">
        {navigation.map((section) => (
          <div key={section.label} className="mb-7">
            <p className="mb-2 hidden px-3 text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--text-muted)] xl:block">
              {section.label}
            </p>

            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;

                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    title={item.name}
                    className={`flex h-10 items-center rounded-lg transition
                      lg:justify-center lg:px-0
                      xl:justify-start xl:gap-3 xl:px-3
                      ${
                        active
                          ? "bg-[var(--surface-soft)] font-medium text-[var(--navy)]"
                          : "text-[var(--text-secondary)] hover:bg-[var(--surface-soft)] hover:text-[var(--navy)]"
                      }`}
                  >
                    <Icon size={17} strokeWidth={1.8} />

                    <span className="hidden xl:inline">
                      {item.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-[var(--border)] p-2 xl:p-3">
        <Link
          href="/settings"
          title="Settings"
          className={`flex h-10 items-center rounded-lg transition
            lg:justify-center lg:px-0
            xl:justify-start xl:gap-3 xl:px-3
            ${
              pathname.startsWith("/settings")
                ? "bg-[var(--surface-soft)] font-medium text-[var(--navy)]"
                : "text-[var(--text-secondary)] hover:bg-[var(--surface-soft)] hover:text-[var(--navy)]"
            }`}
        >
          <Settings size={17} strokeWidth={1.8} />

          <span className="hidden xl:inline">
            Settings
          </span>
        </Link>

        <div className="mt-3 flex items-center justify-center xl:justify-start xl:gap-3 xl:px-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--gold-soft)] text-xs font-semibold text-[var(--gold)]">
            NK
          </div>

          <div className="hidden min-w-0 flex-1 xl:block">
            <p className="truncate text-sm font-medium text-[var(--text-primary)]">
              Nitin Kanasnale
            </p>

            <p className="truncate text-[11px] text-[var(--text-muted)]">
              Intelligence Analyst
            </p>
          </div>

          <Bell
            size={16}
            strokeWidth={1.8}
            className="hidden text-[var(--text-muted)] xl:block"
          />
        </div>
      </div>
    </aside>
  );
}