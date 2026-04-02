"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Home,
  CalendarDays,
  Users,
  Settings,
  LogOut,
  Plus,
  BookOpen,
  Gamepad2,
  Pizza,
  UserRound,
} from "lucide-react";
import { clearToken, clearUsername, clearUserId } from "@/lib/api";

const rooms = [
  { id: "study", name: "Study Session", icon: BookOpen },
  { id: "game", name: "Game Night", icon: Gamepad2 },
  { id: "dinner", name: "Dinner Plans", icon: Pizza },
];

export default function Sidebar() {
  const router = useRouter();

  function handleLogout() {
    clearToken();
    clearUsername();
    clearUserId();
    router.push("/");
  }

  return (
    <aside className="w-72 rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="mb-6">
        <div className="text-xl font-bold text-zinc-900">Venn</div>
        <div className="text-sm text-zinc-600">Find overlap fast</div>
      </div>

      <nav className="space-y-2">
        <Link
          className="flex items-center gap-3 rounded-xl px-3 py-2 text-zinc-800 hover:bg-zinc-100"
          href="/rooms"
        >
          <Home size={18} />
          <span>Rooms</span>
        </Link>

        <Link
          className="flex items-center gap-3 rounded-xl px-3 py-2 text-zinc-800 hover:bg-zinc-100"
          href="/rooms/schedule"
        >
          <CalendarDays size={18} />
          <span>My Schedule</span>
        </Link>

        <Link
          className="flex items-center gap-3 rounded-xl px-3 py-2 text-zinc-800 hover:bg-zinc-100"
          href="/rooms/friends"
        >
          <Users size={18} />
          <span>Friends</span>
        </Link>
      </nav>

      <div className="my-5 h-px bg-zinc-200" />

      <div className="mb-2 text-sm font-semibold text-zinc-700">My Rooms</div>

      <div className="space-y-1">
        {rooms.map((room) => {
          const RoomIcon = room.icon;

          return (
            <Link
              key={room.id}
              href={`/rooms/${room.id}`}
              className="flex items-center gap-3 rounded-xl px-3 py-2 text-zinc-800 hover:bg-zinc-100"
            >
              <RoomIcon size={16} />
              <span className="text-sm">{room.name}</span>
            </Link>
          );
        })}
      </div>

      <div className="mt-6">
        <Link
          className="flex items-center gap-3 rounded-xl px-3 py-2 font-medium text-purple-600 hover:bg-purple-50"
          href="/rooms/new"
        >
          <Plus size={18} />
          <span>New Room</span>
        </Link>
      </div>

      <div className="my-5 h-px bg-zinc-200" />

      <div className="space-y-2 text-sm">
        <Link
          className="flex items-center gap-3 rounded-xl px-3 py-2 text-zinc-800 hover:bg-zinc-100"
          href="/rooms/profile"
        >
          <UserRound size={18} />
          <span>Profile</span>
        </Link>

        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-zinc-800 hover:bg-zinc-100"
        >
          <LogOut size={18} />
          <span>Log Out</span>
        </button>

        <Link
          className="flex items-center gap-3 rounded-xl px-3 py-2 text-zinc-800 hover:bg-zinc-100"
          href="/rooms/settings"
        >
          <Settings size={18} />
          <span>Settings</span>
        </Link>
      </div>
    </aside>
  );
}