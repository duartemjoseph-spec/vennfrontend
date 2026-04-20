"use client";

import { useEffect, useState } from "react";
import Container from "@/components/Container";
import CreateRoomModal from "@/components/CreateRoomModal";
import { getAllRooms, getToken, getUserId } from "@/lib/api";

type RoomData = {
  roomId: number;
  title?: string;
  category?: string;
  eventDate?: string;
  isRoomActive: boolean;
  userId: number;
};

export default function RoomsPage() {
  const [rooms, setRooms] = useState<RoomData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isCreateRoomOpen, setIsCreateRoomOpen] = useState(false);

  async function loadRooms() {
    try {
      setErrorMessage("");
      setIsLoading(true);

      const token = getToken();
      let id = getUserId();
      let userId = Number(id);
      const data = await getAllRooms(userId,token || undefined);
      setRooms(data || []);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Could not load rooms.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadRooms();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("create") === "true") {
      setIsCreateRoomOpen(true);
    }
  }, []);

  function formatDate(dateString?: string) {
    if (!dateString) return "No date set";

    const date = new Date(dateString);

    return date.toLocaleString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }

  return (
    <Container>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Rooms</h1>
          <p className="mt-1 text-sm text-zinc-500">
            View your rooms and jump into scheduling.
          </p>
        </div>

        <button
          onClick={() => setIsCreateRoomOpen(true)}
          className="rounded-xl bg-purple-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-600"
        >
          + New Room
        </button>
      </div>

      {isLoading && (
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-zinc-600 shadow-sm">
          Loading rooms...
        </div>
      )}

      {errorMessage && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      {!isLoading && !errorMessage && rooms.length === 0 && (
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-zinc-600 shadow-sm">
          No rooms yet. Create one to get started.
        </div>
      )}

      {!isLoading && !errorMessage && rooms.length > 0 && (
        <div className="space-y-4">
          {rooms.map((room) => (
            <div
              key={room.roomId}
              className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-zinc-900">
                    {room.title || "Untitled Room"}
                  </h2>
                  <p className="mt-1 text-sm text-zinc-500">
                    {room.category || "No category"}
                  </p>
                  <p className="mt-2 text-sm text-zinc-600">
                    {formatDate(room.eventDate)}
                  </p>
                </div>

                <a
                  href={`/rooms/${room.roomId}`}
                  className="inline-flex items-center justify-center rounded-xl bg-purple-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-600"
                >
                  Go To Room
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      <CreateRoomModal
        isOpen={isCreateRoomOpen}
        onClose={() => setIsCreateRoomOpen(false)}
        onRoomCreated={loadRooms}
      />
    </Container>
  );
}
