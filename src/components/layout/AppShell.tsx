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

      <main className="min-h-screen lg:ml-[88px] xl:ml-[240px]">
        <Topbar />

        <div className="px-4 py-6 sm:px-6 lg:px-8 xl:px-10">
          <div className="mx-auto max-w-[1400px]">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}