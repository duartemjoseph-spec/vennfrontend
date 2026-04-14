"use client";

import { useState } from "react";
import Modal from "@/components/Modal";
import { createRoom, getToken, getUserId } from "@/lib/api";

type CreateRoomModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onRoomCreated: () => void;
};

export default function CreateRoomModal({
  isOpen,
  onClose,
  onRoomCreated,
}: CreateRoomModalProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function resetForm() {
    setTitle("");
    setCategory("");
    setEventDate("");
    setErrorMessage("");
  }

  async function handleCreateRoom(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      const savedUserId = getUserId();
      const token = getToken();

      if (!savedUserId) {
        throw new Error("User id not found. Please log in again.");
      }

      await createRoom(
        {
          title,
          category,
          eventDate: new Date(eventDate).toISOString(),
          isRoomActive: true,
          userId: Number(savedUserId),
        },
        token || undefined
      );

      resetForm();
      onClose();
      onRoomCreated();
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Could not create room.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  function handleClose() {
    resetForm();
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-zinc-900">Create Room</h2>
        <p className="mt-2 text-sm text-zinc-600">
          Add a new room so your group can start planning.
        </p>
      </div>

      {errorMessage && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleCreateRoom} className="space-y-4">
        <div>
          <label
            htmlFor="room-title"
            className="mb-2 block text-sm font-medium text-zinc-700"
          >
            Room Title
          </label>
          <input
            id="room-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Friday Game Night"
            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-purple-500"
          />
        </div>

        <div>
          <label
            htmlFor="room-category"
            className="mb-2 block text-sm font-medium text-zinc-700"
          >
            Category
          </label>
          <input
            id="room-category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Game Night"
            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-purple-500"
          />
        </div>

        <div>
          <label
            htmlFor="room-date"
            className="mb-2 block text-sm font-medium text-zinc-700"
          >
            Event Date
          </label>
          <input
            id="room-date"
            type="datetime-local"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none focus:border-purple-500"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 rounded-xl border border-zinc-300 bg-white px-4 py-3 font-medium text-zinc-700 hover:bg-zinc-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 rounded-xl bg-purple-500 px-4 py-3 font-semibold text-white hover:bg-purple-600 transition disabled:opacity-60"
          >
            {isLoading ? "Creating..." : "Create Room"}
          </button>
        </div>
      </form>
    </Modal>
  );
}