import Sidebar from "./Sidebar";

export default function PageShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-100">
      <div className="mx-auto flex max-w-7xl gap-6 px-6 py-6">
        <Sidebar />
        <main className="flex-1 rounded-3xl border border-zinc-200 bg-zinc-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}