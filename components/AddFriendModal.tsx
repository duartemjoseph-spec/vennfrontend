"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, UserPlus, Check } from "lucide-react";
import Modal from "@/components/Modal";
import { getAllUsers, getUserId, sendFriendRequest } from "@/lib/api";

type AddFriendModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onFriendAdded: () => void;
};

type UserItem = {
  userId?: number;
  username?: string;
  email?: string;
  userIcon?: string;
};

export default function AddFriendModal({
  isOpen,
  onClose,
  onFriendAdded,
}: AddFriendModalProps) {
  const [searchValue, setSearchValue] = useState("");
  const [users, setUsers] = useState<UserItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successId, setSuccessId] = useState<number | null>(null);
  const [currentUserId, setCurrentUserId] = useState(0);

  useEffect(() => {
    setCurrentUserId(Number(getUserId() || 0));
  }, []);

  useEffect(() => {
    async function loadUsers() {
      if (!isOpen) return;

      try {
        setIsLoading(true);
        setErrorMessage("");
        const data = await getAllUsers();
        setUsers(data || []);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("Could not load users.");
        }
      } finally {
        setIsLoading(false);
      }
    }

    loadUsers();
  }, [isOpen]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const id = user.userId || 0;
      const text = `${user.username || ""} ${user.email || ""}`.toLowerCase();

      if (id === currentUserId) return false;

      return text.includes(searchValue.toLowerCase());
    });
  }, [users, searchValue, currentUserId]);

  async function handleAddFriend(receiverId: number) {
    try {
      setErrorMessage("");

      if (!currentUserId) {
        throw new Error("You need to log in first.");
      }

      await sendFriendRequest(currentUserId, receiverId);
      setSuccessId(receiverId);
      onFriendAdded();
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Could not send friend request.");
      }
    }
  }

  function handleClose() {
    setSearchValue("");
    setErrorMessage("");
    setSuccessId(null);
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-zinc-900">Add Friend</h2>
        <p className="mt-2 text-sm text-zinc-600">
          Search for users and send a friend request.
        </p>
      </div>

      {errorMessage && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      <div className="relative mb-5">
        <Search
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
        />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search by username or email..."
          className="w-full rounded-xl border border-zinc-300 bg-white py-3 pl-11 pr-4 text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-purple-500"
        />
      </div>

      {isLoading && (
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-6 text-center text-sm text-zinc-500">
          Loading users...
        </div>
      )}

      {!isLoading && (
        <div className="max-h-72 space-y-3 overflow-y-auto pr-1">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => {
              const id = user.userId || 0;
              const sent = successId === id;

              return (
                <div
                  key={id}
                  className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-zinc-200">
                      <UserPlus size={18} className="text-zinc-700" />
                    </div>

                    <div>
                      <p className="font-medium text-zinc-900">
                        {user.username || "User"}
                      </p>
                      <p className="text-sm text-zinc-500">
                        {user.email || "No email"}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAddFriend(id)}
                    className={[
                      "flex h-10 min-w-24 items-center justify-center rounded-xl px-3 text-sm font-medium transition",
                      sent
                        ? "bg-green-500 text-white"
                        : "bg-purple-500 text-white hover:bg-purple-600",
                    ].join(" ")}
                  >
                    {sent ? (
                      <span className="flex items-center gap-1">
                        <Check size={16} />
                        Sent
                      </span>
                    ) : (
                      "Add"
                    )}
                  </button>
                </div>
              );
            })
          ) : (
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-6 text-center text-sm text-zinc-500">
              No users found.
            </div>
          )}
        </div>
      )}
    </Modal>
  );
}