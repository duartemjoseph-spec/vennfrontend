import Link from "next/link";


export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100">
      <main className="w-full max-w-3xl bg-white border border-zinc-200 rounded-3xl p-10 text-center">
        <div className="mx-auto mb-6 h-12 w-12 rounded-2xl bg-purple-500" />
        <h1 className="text-black text-4xl font-bold mb-3">Welcome to Venn</h1>
        <p className="text-zinc-600 mb-8">
          Find the perfect time for game nights, meetings, and dinners.
        </p>

        <Link
          href="/rooms"
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-purple-500 text-white font-semibold hover:bg-purple-600"
        >
          Log In To Start
        </Link>
      </main>
    </div>
  );
}
