"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Container from "@/components/Container";
import InviteMemberModal from "@/components/InviteMemberModal";
import { getMembersByRoomId, getRoomById, getToken } from "@/lib/api";
import {
  ArrowLeft,
  CalendarDays,
  Tag,
  Users,
  CircleDot,
  UserRound,
  UserPlus,
} from "lucide-react";

type RoomData = {
  roomId: number;
  title?: string;
  category?: string;
  eventDate?: string;
  isRoomActive: boolean;
  userId: number;
};

type RoomMember = {
  roomModelId?: number;
  userModelId?: number;
  isAccepted?: boolean;
  userId?: number;
  username?: string;
  userIcon?: string;
};

export default function RoomDetailPage() {
  const params = useParams();
  const router = useRouter();

  const [room, setRoom] = useState<RoomData | null>(null);
  const [members, setMembers] = useState<RoomMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  async function loadRoomPage() {
    try {
      setErrorMessage("");
      setIsLoading(true);

      const token = getToken();
      const roomId = String(params.RoomId);

      const roomData = await getRoomById(roomId, token || undefined);
      const memberData = await getMembersByRoomId(roomId);

      setRoom(roomData);
      setMembers(memberData || []);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Could not load room details.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadRoomPage();
  }, [params.RoomId]);

  const existingMemberIds = useMemo(() => {
    return members
      .map((member) => member.userId || member.userModelId || 0)
      .filter((id) => id > 0);
  }, [members]);

  function formatDate(dateString?: string) {
    if (!dateString) return "No date set";

    const date = new Date(dateString);

    return date.toLocaleString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }

  return (
    <Container>
      <div className="mx-auto max-w-5xl">
        <div className="mb-6">
          <button
            onClick={() => router.push("/rooms")}
            className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
          >
            <ArrowLeft size={16} />
            Back to Rooms
          </button>
        </div>

        {isLoading && (
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <p className="text-zinc-600">Loading room details...</p>
          </div>
        )}

        {!isLoading && errorMessage && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
            {errorMessage}
          </div>
        )}

        {!isLoading && !errorMessage && room && (
          <>
            <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
              <div className="h-28 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400" />

              <div className="px-6 pb-6 pt-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-zinc-900">
                      {room.title || "Untitled Room"}
                    </h1>
                    <p className="mt-2 text-zinc-500">
                      Plan with your group using live room data
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={[
                        "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium",
                        room.isRoomActive
                          ? "bg-green-100 text-green-700"
                          : "bg-zinc-100 text-zinc-600",
                      ].join(" ")}
                    >
                      {room.isRoomActive ? "Active" : "Inactive"}
                    </span>

                    <button
                      onClick={() => setIsInviteOpen(true)}
                      className="inline-flex items-center gap-2 rounded-xl bg-purple-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-600"
                    >
                      <UserPlus size={16} />
                      Invite Member
                    </button>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl bg-zinc-50 p-4">
                    <div className="flex items-center gap-2 text-zinc-500">
                      <Tag size={16} />
                      <p className="text-xs font-semibold uppercase tracking-wide">
                        Category
                      </p>
                    </div>
                    <p className="mt-2 text-zinc-900">
                      {room.category || "No category"}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-zinc-50 p-4">
                    <div className="flex items-center gap-2 text-zinc-500">
                      <CalendarDays size={16} />
                      <p className="text-xs font-semibold uppercase tracking-wide">
                        Event Date
                      </p>
                    </div>
                    <p className="mt-2 text-zinc-900">
                      {formatDate(room.eventDate)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <Users size={18} className="text-zinc-600" />
                <h2 className="text-xl font-semibold text-zinc-900">
                  Room Members
                </h2>
              </div>

              {members.length === 0 ? (
                <div className="rounded-2xl bg-zinc-50 p-4 text-zinc-600">
                  No members joined yet.
                </div>
              ) : (
                <div className="grid gap-3 md:grid-cols-2">
                  {members.map((member, index) => (
                    <div
                      key={member.userId ?? member.userModelId ?? index}
                      className="flex items-center gap-3 rounded-2xl bg-zinc-50 p-4"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-zinc-200">
                        <UserRound size={18} className="text-zinc-700" />
                      </div>

                      <div>
                        <p className="font-medium text-zinc-900">
                          {member.username || "Member"}
                        </p>
                        <p className="text-sm text-zinc-500">
                          User ID: {member.userId || member.userModelId || "N/A"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-6 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <CircleDot size={18} className="text-zinc-600" />
                <h2 className="text-xl font-semibold text-zinc-900">
                  Room Info
                </h2>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-zinc-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                    Room ID
                  </p>
                  <p className="mt-2 text-zinc-900">{room.roomId}</p>
                </div>

                <div className="rounded-2xl bg-zinc-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                    Created By User
                  </p>
                  <p className="mt-2 text-zinc-900">{room.userId}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {room && (
        <InviteMemberModal
          isOpen={isInviteOpen}
          onClose={() => setIsInviteOpen(false)}
          roomId={room.roomId}
          existingMemberIds={existingMemberIds}
          onMemberInvited={loadRoomPage}
        />
      )}
    </Container>
  );
}