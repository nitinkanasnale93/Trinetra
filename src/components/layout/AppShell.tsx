import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

type AppShellProps = {
  children: React.ReactNode;
};

export default function AppShell({
  children,
}: AppShellProps) {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Sidebar />

      <main className="ml-[240px] min-h-screen">
        <Topbar />

        <div className="px-10 py-10">
          <div className="mx-auto max-w-[1400px]">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}