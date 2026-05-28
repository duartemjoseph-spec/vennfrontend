"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Container from "@/components/Container";
import InviteMemberModal from "@/components/InviteMemberModal";
import {
  createWeeklyAvailability,
  getMembersByRoomId,
  getRoomById,
  getToken,
  getUserId,
  getWeeklyAvailability,
} from "@/lib/api";
import {
  ArrowLeft,
  CalendarDays,
  Tag,
  Users,
  CircleDot,
  UserRound,
  UserPlus,
  Save,
} from "lucide-react";
import UpdateRoomModal from "@/components/UpdateRoomModal";
import DeleteModal from "@/components/DeleteModal";
import { limitString } from "@/lib/helperFunctions";

type AvailabilityItem = {
  day: number | string;
  hour: number;
  status: number;
};

export type RoomData = {
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
  email?: string;
  userIcon?: string | null;
  availability?: AvailabilityItem[];
};
type HostData = {
  userId: number,
  username: string,
  description: string,
  userIcon: string,
  availability?: AvailabilityItem[];
}

type SlotState = "empty" | "busy" | "maybe" | "available";

const timeSlots = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

export default function RoomDetailPage() {
  const params = useParams();
  const router = useRouter();

  const [room, setRoom] = useState<RoomData | null>(null);
  const [members, setMembers] = useState<RoomMember[]>([]);
  const [hostData, setHostData] = useState<HostData | null>(null)
  const [currentUserId, setCurrentUserId] = useState(0);

  const [mySlots, setMySlots] = useState<Record<number, SlotState>>({});
  const [isSavingAvailability, setIsSavingAvailability] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [hostId, setHostId] = useState(0)

  useEffect(() => {
    setCurrentUserId(Number(getUserId() || 0));
  }, []);

  async function loadRoomPage() {
    try {
      setErrorMessage("");
      setSuccessMessage("");
      setIsLoading(true);

      const token = getToken();
      const roomId = String(params.RoomId);

      const roomData = await getRoomById(roomId, token || undefined);
      const memberData = await getMembersByRoomId(roomId);
      setRoom(roomData);
      setHostData(roomData.userModel)
      setMembers(memberData || []);
      setHostId(roomData.userId)

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
  console.log(hostData)
  useEffect(() => {
    loadRoomPage();
  }, [params.RoomId]);

  const existingMemberIds = useMemo(() => {
    return members
      .map((member) => member.userId || member.userModelId || 0)
      .filter((id) => id > 0);
  }, [members]);

  const myMember = useMemo(() => {
    return members.find(
      (member) =>
        Number(member.userId || member.userModelId || 0) === Number(currentUserId)
    );
  }, [members, currentUserId]);

  useEffect(() => {
    if (!myMember) return;

    const nextSlots: Record<number, SlotState> = {};

    timeSlots.forEach((hour) => {
      nextSlots[hour] = "empty";
    });

    (myMember.availability || []).forEach((slot) => {
      nextSlots[slot.hour] = backendStatusToSlotState(slot.status);
    });

    setMySlots(nextSlots);
  }, [myMember]);

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

  function formatHour(hour: number) {
    if (hour === 12) return "12 PM";
    return `${hour - 12} PM`;
  }

  function getRoomDayNumber() {
    if (!room?.eventDate) return null;
    return new Date(room.eventDate).getDay();
  }

  function getRoomDayLabel() {
    if (!room?.eventDate) return "Selected Day";

    return new Date(room.eventDate).toLocaleString("en-US", {
      weekday: "long",
    });
  }

  function getStatusForHour(member: RoomMember, hour: number) {
    const memberId = Number(member.userId || member.userModelId || 0);

    if (memberId === currentUserId) {
      return slotStateToBackendStatus(mySlots[hour] || "empty");
    }

    return member.availability?.find((slot) => slot.hour === hour)?.status;
  }

  function getStatusClass(status?: number) {
    if (status === 2) return "bg-green-100 border border-green-300";
    if (status === 1) return "bg-yellow-100 border border-yellow-300";
    if (status === 0) return "bg-red-100 border border-red-300";
    return "bg-white border border-zinc-200";
  }

  function getNextSlotState(current: SlotState) {
    if (current === "empty") return "available";
    if (current === "available") return "busy";
    if (current === "busy") return "maybe";
    return "empty";
  }

  function handleMySlotClick(hour: number) {
    setMySlots((prev) => ({
      ...prev,
      [hour]: getNextSlotState(prev[hour] || "empty"),
    }));
  }

  async function handleSaveMyAvailability() {
    try {
      setErrorMessage("");
      setSuccessMessage("");
      setIsSavingAvailability(true);

      const userId = Number(currentUserId);
      const roomDayNumber = getRoomDayNumber();

      if (!userId) {
        throw new Error("You need to log in first.");
      }

      if (roomDayNumber === null) {
        throw new Error("Room day could not be found.");
      }

      const existingWeeklyAvailability = await getWeeklyAvailability(userId);

      const availabilityWithoutRoomDay = (existingWeeklyAvailability || []).filter(
        (item: AvailabilityItem) => {
          const dayNumber =
            typeof item.day === "number" ? item.day : Number(item.day);

          return dayNumber !== roomDayNumber;
        }
      );

      const updatedRoomDayAvailability = timeSlots
        .filter((hour) => (mySlots[hour] || "empty") !== "empty")
        .map((hour) => ({
          day: roomDayNumber,
          hour,
          status: slotStateToBackendStatus(mySlots[hour] || "empty"),
        }));

      const finalPayload = [
        ...availabilityWithoutRoomDay.map((item: AvailabilityItem) => ({
          day: typeof item.day === "number" ? item.day : Number(item.day),
          hour: item.hour,
          status: item.status,
        })),
        ...updatedRoomDayAvailability,
      ];

      await createWeeklyAvailability(userId, finalPayload);
      setSuccessMessage("Your room availability was updated.");
      await loadRoomPage();
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Could not save availability.");
      }
    } finally {
      setIsSavingAvailability(false);
    }
  }

  return (
    <Container>
      <div className="mx-auto max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-6xl ">
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
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
            {errorMessage}
          </div>
        )}

        {!isLoading && successMessage && (
          <div className="mb-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-green-700">
            {successMessage}
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

                  <div className="flex flex-wrap items-center justify-end gap-3">
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
                    {
                      room.userId == currentUserId ? <button onClick={() => setIsUpdateOpen(true)} className="inline-flex items-center gap-2 rounded-xl bg-purple-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-600">Update Room</button> : ""
                    }
                    {
                      room.userId == currentUserId ? <button onClick={() => setIsDeleteOpen(true)} className="inline-flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600">Delete Room</button> : ""
                    }
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
                      <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-zinc-200">
                        {member.userIcon ? (
                          <img
                            src={member.userIcon}
                            alt={member.username || "User"}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <UserRound size={18} className="text-zinc-700" />
                        )}
                      </div>

                      <div>
                        <p className="font-medium text-zinc-900">
                          {limitString(member.username) || "Member"}
                        </p>
                        <p className="text-sm text-zinc-500">
                          {member.email || `User ID: ${member.userId ?? member.userModelId ?? "N/A"}`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-6 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-zinc-900">
                    Compare Availability
                  </h2>
                  <p className="mt-1 text-sm text-zinc-500">
                    Showing availability for{" "}
                    <span className="font-medium text-zinc-800">
                      {getRoomDayLabel()}
                    </span>
                    . Click your own time blocks to update them.
                  </p>
                </div>

                <button
                  onClick={handleSaveMyAvailability}
                  disabled={isSavingAvailability}
                  className="inline-flex items-center gap-2 rounded-xl bg-purple-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-600 disabled:opacity-60"
                >
                  <Save size={16} />
                  {isSavingAvailability ? "Saving..." : "Save My Availability"}
                </button>
              </div>

              <div className="mb-4 rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
                Only your own column is editable. Click a block to cycle:
                Available → Busy → Maybe → Empty.
              </div>

              {members.length === 0 ? (
                <div className="rounded-2xl bg-zinc-50 p-4 text-zinc-600">
                  No availability found for this room yet.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <div className="min-w-[900px] rounded-2xl border border-zinc-200">
                    <div
                      className="grid border-b border-zinc-200 bg-white"
                      style={{
                        gridTemplateColumns: `80px repeat(${members.length}, minmax(180px, 1fr))`,
                      }}
                    >
                      <div className="p-4" />
                      {/* <div className="flex flex-col items-center gap-2 p-4">
                        <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-zinc-200">
                          {
                            hostData?.userIcon ? (
                              <img className="h-full w-full object-cover" src={hostData?.userIcon} alt={hostData?.username || "User"} />
                            ) : (
                              <UserRound size={18} className="text-zinc-700" />
                            )
                          }
                        </div>
                        <p className="text-sm font-medium text-zinc-700">{hostData?.username}</p>
                      </div> */}
                      {members.map((member, index) => (
                        <div
                          key={member.userId ?? member.userModelId ?? index}
                          className="flex flex-col items-center gap-2 p-4"
                        >
                          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-zinc-200">
                            {member.userIcon ? (
                              <img
                                src={member.userIcon}
                                alt={member.username || "User"}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <UserRound size={18} className="text-zinc-700" />
                            )}
                          </div>
                          <p className="text-sm font-medium text-zinc-900">
                            {limitString(member.username) || "Member"}
                          </p>
                        </div>
                      ))}
                    </div>

                    {timeSlots.map((hour) => (
                      <div
                        key={hour}
                        className="grid border-b border-zinc-100"
                        style={{
                          gridTemplateColumns: `80px repeat(${members.length}, minmax(180px, 1fr))`,
                        }}
                      >
                        <div className="p-4 text-sm font-medium text-zinc-700">
                          {formatHour(hour)}
                        </div>
                        {/* {
                          <div
                            key={`${hostData?.userId ?? 1}-${hour}`}
                            className="p-2"
                          >
                            <div
                              className={`h-10 rounded-xl ${getStatusClass()}`} />
                          </div>
                        } */}

                        {members.map((member, index) => {
                          const memberId = Number(
                            member.userId || member.userModelId || 0
                          );
                          const status = getStatusForHour(member, hour);
                          const isMyColumn = memberId === currentUserId;

                          return (
                            <div
                              key={`${member.userId ?? member.userModelId ?? index}-${hour}`}
                              className="p-2"
                            >
                              {isMyColumn ? (
                                <button
                                  type="button"
                                  onClick={() => handleMySlotClick(hour)}
                                  className={`h-10 w-full rounded-xl transition hover:scale-[1.02] ${getStatusClass(
                                    status
                                  )}`}
                                />
                              ) : (
                                <div
                                  className={`h-10 rounded-xl ${getStatusClass(status)}`}
                                />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
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
                    Host Name
                  </p>
                  <p className="mt-2 text-zinc-900">{hostData?.username ?? "Name not found"}</p>
                </div>
                <div className="rounded-2xl bg-zinc-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                    Room Title
                  </p>
                  <p className="mt-2 text-zinc-900">{room.title}</p>
                </div>

                <div className="rounded-2xl bg-zinc-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                    Users Joined
                  </p>
                  <p className="mt-2 text-zinc-900">{members.length}</p>
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
          hostId={hostId}
        />
      )}

      <UpdateRoomModal  
        isOpen={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        roomModel={room!}
        setRoomModel={(setRoom)}
      />

      <DeleteModal
        roomId={room?.roomId!}
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
      />

    </Container>
  );
}

function backendStatusToSlotState(status?: number): SlotState {
  if (status === 0) return "busy";
  if (status === 1) return "maybe";
  if (status === 2) return "available";
  return "empty";
}

function slotStateToBackendStatus(state: SlotState) {
  if (state === "busy") return 0;
  if (state === "maybe") return 1;
  if (state === "available") return 2;
  return -1;
}