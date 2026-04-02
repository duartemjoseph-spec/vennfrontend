"use client";

import { useState } from "react";
import Container from "@/components/Container";
import AddFriendModal from "@/components/AddFriendModal";
import {
  Search,
  UserPlus,
  MessageCircle,
  CalendarDays,
  Send,
  UserRoundPlus,
} from "lucide-react";

const friendStats = [
  { title: "Online Now", value: 5, color: "bg-green-500 text-white" },
  { title: "Favorites", value: 4, color: "bg-orange-400 text-white" },
  { title: "Available", value: 2, color: "bg-blue-500 text-white" },
];

const friendTabs = [
  { label: "All Friends", count: 8 },
  { label: "Online", count: 5 },
  { label: "Favorites", count: 4 },
  { label: "Available Now", count: 2 },
];

const friends = [
  {
    id: 1,
    name: "You",
    status: "online",
    availability: "Free all evening",
    badge: "In Room",
    buttonText: "In Room",
    buttonStyle: "bg-zinc-400 text-white",
    avatarColor: "bg-red-100",
  },
  {
    id: 2,
    name: "Alex Chen",
    status: "online",
    availability: "Free at 7 PM",
    badge: "In Room",
    buttonText: "In Room",
    buttonStyle: "bg-zinc-400 text-white",
    avatarColor: "bg-yellow-100",
  },
  {
    id: 3,
    name: "Sarah Martinez",
    status: "online",
    availability: "Available now",
    badge: "In Room",
    buttonText: "In Room",
    buttonStyle: "bg-zinc-400 text-white",
    avatarColor: "bg-blue-100",
  },
  {
    id: 4,
    name: "Jordan Lee",
    status: "busy",
    availability: "Busy until 5 PM",
    badge: "",
    buttonText: "Invite",
    buttonStyle: "bg-zinc-900 text-white",
    avatarColor: "bg-orange-100",
  },
  {
    id: 5,
    name: "Emma Wilson",
    status: "online",
    availability: "Free later",
    badge: "",
    buttonText: "Invite",
    buttonStyle: "bg-zinc-900 text-white",
    avatarColor: "bg-pink-100",
  },
  {
    id: 6,
    name: "Marcus Brown",
    status: "2 hours ago",
    availability: "",
    badge: "",
    buttonText: "Invite",
    buttonStyle: "bg-zinc-900 text-white",
    avatarColor: "bg-zinc-200",
  },
  {
    id: 7,
    name: "Priya Patel",
    status: "online",
    availability: "Free after 8 PM",
    badge: "",
    buttonText: "Invite",
    buttonStyle: "bg-zinc-900 text-white",
    avatarColor: "bg-indigo-100",
  },
  {
    id: 8,
    name: "Tyler Johnson",
    status: "1 day ago",
    availability: "",
    badge: "",
    buttonText: "Invite",
    buttonStyle: "bg-zinc-900 text-white",
    avatarColor: "bg-stone-200",
  },
];

function getStatusColor(status: string) {
  if (status === "online") return "text-green-500";
  if (status === "busy") return "text-yellow-500";
  return "text-zinc-400";
}

export default function FriendsPage() {
  //  Add Friend modal state
  const [isAddFriendOpen, setIsAddFriendOpen] = useState(false);

  return (
    <Container>
      <div className="mx-auto max-w-5xl">
        {/*  Page header */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-zinc-900">Friends</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Connect with friends and see who&apos;s available to hang out.
          </p>
        </div>

        {/*  Top stat cards */}
        <div className="mb-4 grid gap-4 md:grid-cols-3">
          {friendStats.map((stat) => (
            <div
              key={stat.title}
              className={`rounded-2xl p-5 shadow-sm ${stat.color}`}
            >
              <p className="text-sm opacity-90">{stat.title}</p>
              <p className="mt-2 text-3xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/*  Search row */}
        <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm sm:flex-row">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
            />
            <input
              type="text"
              placeholder="Search friends..."
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-3 pl-11 pr-4 text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-purple-500"
            />
          </div>

          <button
            onClick={() => setIsAddFriendOpen(true)}
            className="flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
          >
            <UserPlus size={16} />
            Add Friend
          </button>
        </div>

        {/*  Filter tabs */}
        <div className="mb-4 grid grid-cols-2 gap-2 rounded-2xl border border-zinc-200 bg-white p-2 shadow-sm md:grid-cols-4">
          {friendTabs.map((tab, index) => (
            <button
              key={tab.label}
              className={[
                "rounded-xl px-3 py-2 text-sm font-medium transition",
                index === 0
                  ? "bg-zinc-100 text-zinc-900"
                  : "text-zinc-500 hover:bg-zinc-50",
              ].join(" ")}
            >
              {tab.label}
              <span className="ml-1 rounded-full bg-zinc-200 px-2 py-0.5 text-xs text-zinc-700">
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/*  Friend cards */}
        <div className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {friends.map((friend) => (
            <div
              key={friend.id}
              className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm"
            >
              <div className="mb-3 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full ${friend.avatarColor}`}
                  >
                    <UserRoundPlus size={20} className="text-zinc-700" />
                  </div>

                  <div>
                    <h2 className="font-semibold text-zinc-900">
                      {friend.name}
                    </h2>
                    <p className={`text-xs ${getStatusColor(friend.status)}`}>
                      {friend.status}
                    </p>
                  </div>
                </div>

                {friend.badge && (
                  <span className="rounded-full bg-zinc-100 px-2 py-1 text-xs text-zinc-600">
                    {friend.badge}
                  </span>
                )}
              </div>

              <p className="mb-4 text-sm text-zinc-500">
                {friend.availability || "No availability set"}
              </p>

              <div className="flex items-center gap-2">
                <button
                  className={`flex-1 rounded-xl px-4 py-2 text-sm font-medium ${friend.buttonStyle}`}
                >
                  {friend.buttonText}
                </button>

                <button className="rounded-xl border border-zinc-200 px-3 py-2 text-zinc-600 hover:bg-zinc-50">
                  <MessageCircle size={16} />
                </button>

                <button className="rounded-xl border border-zinc-200 px-3 py-2 text-zinc-600 hover:bg-zinc-50">
                  <CalendarDays size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/*  Bottom invite banner */}
        <div className="flex flex-col items-start justify-between gap-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 px-5 py-5 text-white shadow-sm sm:flex-row sm:items-center">
          <div>
            <h3 className="text-lg font-semibold">Invite More Friends</h3>
            <p className="mt-1 text-sm text-white/90">
              The more friends you add, the easier it is to coordinate plans.
            </p>
          </div>

          <button className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-100">
            <Send size={16} />
            Send Invite Link
          </button>
        </div>
      </div>

      {/*  Add Friend modal */}
      <AddFriendModal
        isOpen={isAddFriendOpen}
        onClose={() => setIsAddFriendOpen(false)}
      />
    </Container>
  );
}
