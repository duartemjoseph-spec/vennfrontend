"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { clearToken, clearUserId, clearUsername } from "@/lib/api";

export default function Sidebar() {
  const router = useRouter();

  function handleLogout() {
    clearToken();
    clearUsername();
    clearUserId();
    router.push("/");
  }

  return (
    <aside className="w-full h-screen rounded-3xl bg-white border border-zinc-200 p-5 shadow-sm">
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <Image
            src="/venn-logo-transparent.png"
            alt="Venn logo"
            width={36}
            height={36}
            className="h-9 w-9 object-contain"
          />
          <div>
            <div className="text-xl font-bold text-zinc-900">Venn</div>
            <div className="text-sm text-zinc-600">Find overlap fast</div>
          </div>
        </div>
      </div>

      <nav className="space-y-2">
        <Link
          className="block rounded-xl px-3 py-2 text-zinc-800 hover:bg-zinc-100"
          href="/rooms"
        >
          Rooms
        </Link>

        <Link
          className="block rounded-xl px-3 py-2 text-zinc-800 hover:bg-zinc-100"
          href="/rooms/schedule"
        >
          My Schedule
        </Link>

        <Link
          className="block rounded-xl px-3 py-2 text-zinc-800 hover:bg-zinc-100"
          href="/rooms/friends"
        >
          Friends
        </Link>
      </nav>

      <div className="my-5 h-px bg-zinc-200" />

      <div className="mt-6">
        <Link
          className="block rounded-xl px-3 py-2 font-medium text-purple-600 hover:bg-purple-50"
          href="/rooms?create=true"
        >
          + New Room
        </Link>
      </div>

      <div className="my-5 h-px bg-zinc-200" />

      <div className="space-y-2 text-sm">
        <Link
          className="block rounded-xl px-3 py-2 text-zinc-800 hover:bg-zinc-100 text-[16px]"
          href="/rooms/profile"
        >
          Profile
        </Link>

        <Link
          className="block rounded-xl px-3 py-2 text-zinc-800 hover:bg-zinc-100 text-[16px]"
          href="/rooms/settings"
        >
          Settings
        </Link>

        <button
          onClick={handleLogout}
          className="w-full text-left rounded-xl px-3 py-2 text-zinc-800 hover:bg-zinc-100 text-[16px]"
        >
          Log Out
        </button>
      </div>
    </aside>
  );
}
