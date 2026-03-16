"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

const rooms = [
  { id: "study", name: "Study Session", icon: "📚" },
  { id: "game", name: "Game Night", icon: "🎮" },
  { id: "dinner", name: "Dinner Plans", icon: "🍕" },
];

export default function Sidebar() {
  const router = useRouter();

  function handleLogout() {
    router.push("/");
  }

  return (
    <aside className="w-72 rounded-3xl bg-white border border-zinc-200 p-5 shadow-sm">
      <div className="mb-6">
        <div className="text-xl font-bold text-zinc-900">Venn</div>
        <div className="text-sm text-zinc-600">Find overlap fast</div>
      </div>

      <nav className="space-y-2">
        <Link
          className="block rounded-xl px-3 py-2 text-zinc-800 hover:bg-zinc-100"
          href="/rooms"
        >
          🏠 Rooms
        </Link>

        <Link
          className="block rounded-xl px-3 py-2 text-zinc-800 hover:bg-zinc-100"
          href="/rooms/schedule"
        >
          🗓️ My Schedule
        </Link>

        <Link
          className="block rounded-xl px-3 py-2 text-zinc-800 hover:bg-zinc-100"
          href="/rooms/friends"
        >
          👥 Friends
        </Link>
      </nav>

      <div className="my-5 h-px bg-zinc-200" />

      <div className="mb-2 text-sm font-semibold text-zinc-700">My Rooms</div>

      <div className="space-y-1">
        {rooms.map((room) => (
          <Link
            key={room.id}
            href={`/rooms/${room.id}`}
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-zinc-800 hover:bg-zinc-100"
          >
            <span>{room.icon}</span>
            <span className="text-sm">{room.name}</span>
          </Link>
        ))}
      </div>

      <div className="mt-6">
        <Link
          className="block rounded-xl px-3 py-2 font-medium text-purple-600 hover:bg-purple-50"
          href="/rooms/new"
        >
          ➕ New Room
        </Link>
      </div>

      <div className="my-5 h-px bg-zinc-200" />

      <div className="space-y-2 text-sm">
        <button
          onClick={handleLogout}
          className="w-full text-left rounded-xl px-3 py-2 text-zinc-800 hover:bg-zinc-100"
        >
          🚪 Log Out
        </button>

        <Link
          className="block rounded-xl px-3 py-2 text-zinc-800 hover:bg-zinc-100"
          href="/settings"
        >
          ⚙️ Settings
        </Link>
      </div>
    </aside>
  );
}
