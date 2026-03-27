"use client";

import { useMemo, useState } from "react";
import { Search, UserPlus, Check } from "lucide-react";
import Modal from "@/components/Modal";

type AddFriendModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const friendOptions = [
  { id: 1, name: "Ava Thompson", username: "@ava", mutual: 3 },
  { id: 2, name: "James Carter", username: "@james", mutual: 2 },
  { id: 3, name: "Grandma Rose", username: "@grandma", mutual: 1 },
  { id: 4, name: "Nina Patel", username: "@nina", mutual: 4 },
  { id: 5, name: "Chris Lee", username: "@chris", mutual: 2 },
];

export default function AddFriendModal({
  isOpen,
  onClose,
}: AddFriendModalProps) {
  // // Search input state
  const [searchValue, setSearchValue] = useState("");

  // // Track selected friends
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // // Filter friends based on search
  const filteredFriends = useMemo(() => {
    return friendOptions.filter((friend) => {
      const fullText = `${friend.name} ${friend.username}`.toLowerCase();
      return fullText.includes(searchValue.toLowerCase());
    });
  }, [searchValue]);

  // // Add or remove a selected friend
  function toggleFriend(friendId: number) {
    if (selectedIds.includes(friendId)) {
      setSelectedIds(selectedIds.filter((id) => id !== friendId));
    } else {
      setSelectedIds([...selectedIds, friendId]);
    }
  }

  // // Fake add action for now
  function handleAddFriends() {
    console.log("Selected friends:", selectedIds);
    setSearchValue("");
    setSelectedIds([]);
    onClose();
  }

  // // Reset when closing
  function handleClose() {
    setSearchValue("");
    setSelectedIds([]);
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      {/* // Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-zinc-900">Add Friend</h2>
        <p className="mt-2 text-sm text-zinc-600">
          Search for friends and add them to your list.
        </p>
      </div>

      {/* // Search bar */}
      <div className="relative mb-5">
        <Search
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
        />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search by name or username..."
          className="w-full rounded-xl border border-zinc-300 bg-white py-3 pl-11 pr-4 text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-purple-500"
        />
      </div>

      {/* // Recent label */}
      <div className="mb-3 text-sm font-semibold text-zinc-700">Recent</div>

      {/* // Friend list */}
      <div className="max-h-72 space-y-3 overflow-y-auto pr-1">
        {filteredFriends.length > 0 ? (
          filteredFriends.map((friend) => {
            const isSelected = selectedIds.includes(friend.id);

            return (
              <div
                key={friend.id}
                className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-zinc-200">
                    <UserPlus size={18} className="text-zinc-700" />
                  </div>

                  <div>
                    <p className="font-medium text-zinc-900">{friend.name}</p>
                    <p className="text-sm text-zinc-500">
                      {friend.username} • {friend.mutual} mutual
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleFriend(friend.id)}
                  className={[
                    "flex h-10 w-10 items-center justify-center rounded-full border transition",
                    isSelected
                      ? "border-purple-500 bg-purple-500 text-white"
                      : "border-zinc-300 bg-white text-zinc-600 hover:bg-zinc-100",
                  ].join(" ")}
                >
                  {isSelected ? <Check size={18} /> : <UserPlus size={18} />}
                </button>
              </div>
            );
          })
        ) : (
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-6 text-center text-sm text-zinc-500">
            No friends found.
          </div>
        )}
      </div>

      {/* // Footer actions */}
      <div className="mt-6 flex items-center justify-between gap-3">
        <p className="text-sm text-zinc-500">
          {selectedIds.length} selected
        </p>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleAddFriends}
            disabled={selectedIds.length === 0}
            className="rounded-xl bg-purple-500 px-4 py-2 text-sm font-medium text-white hover:bg-purple-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Add Selected
          </button>
        </div>
      </div>
    </Modal>
  );
}