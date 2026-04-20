"use client";

import { useEffect, useMemo, useState } from "react";
import Container from "@/components/Container";
import AddFriendModal from "@/components/AddFriendModal";
import {
  Search,
  UserPlus,
  MessageCircle,
  CalendarDays,
  UserRoundPlus,
  Check,
} from "lucide-react";
import {
  acceptFriendRequest,
  getAcceptedFriends,
  getPendingFriends,
  getUserId,
} from "@/lib/api";

type UserInfo = {
  userId?: number;
  username?: string;
  email?: string;
  userIcon?: string;
};

type FriendEntry = {
  id?: number;
  requesterId: number;
  receiverId: number;
  status: number;
  requestedAt?: string;
  acceptedAt?: string;
  requester?: UserInfo;
  receiver?: UserInfo;
};

function getOtherUser(friend: FriendEntry, currentUserId: number) {
  if (friend.requesterId === currentUserId) {
    return friend.receiver;
  }

  return friend.requester;
}

export default function FriendsPage() {
  const [acceptedFriends, setAcceptedFriends] = useState<FriendEntry[]>([]);
  const [pendingFriends, setPendingFriends] = useState<FriendEntry[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedTab, setSelectedTab] = useState<"accepted" | "pending">("accepted");
  const [isAddFriendOpen, setIsAddFriendOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentUserId, setCurrentUserId] = useState(0);

  useEffect(() => {
    setCurrentUserId(Number(getUserId() || 0));
  }, []);

  async function loadFriends(userId: number) {
    try {
      setIsLoading(true);
      setErrorMessage("");

      if (!userId) {
        throw new Error("You need to log in first.");
      }

      const accepted = await getAcceptedFriends(userId);
      const pending = await getPendingFriends(userId);

      setAcceptedFriends(accepted || []);
      setPendingFriends(pending || []);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Could not load friends.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (currentUserId) {
      loadFriends(currentUserId);
    } else {
      setIsLoading(false);
    }
  }, [currentUserId]);

  const filteredAccepted = useMemo(() => {
    return acceptedFriends.filter((friend) => {
      const otherUser = getOtherUser(friend, currentUserId);
      const text = `${otherUser?.username || ""} ${otherUser?.email || ""}`.toLowerCase();

      return text.includes(searchValue.toLowerCase());
    });
  }, [acceptedFriends, searchValue, currentUserId]);

  async function handleAcceptFriend(requesterId: number, receiverId: number) {
    try {
      await acceptFriendRequest(requesterId, receiverId);
      loadFriends(currentUserId);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Could not accept friend request.");
      }
    }
  }

  const pendingCount = pendingFriends.length;

  return (
    <Container>
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-zinc-900">Friends</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Manage your friend list and incoming requests.
          </p>
        </div>

        <div className="mb-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-green-500 p-5 text-white shadow-sm">
            <p className="text-sm opacity-90">Friends</p>
            <p className="mt-2 text-3xl font-bold">{acceptedFriends.length}</p>
          </div>

          <div className="rounded-2xl bg-orange-400 p-5 text-white shadow-sm">
            <p className="text-sm opacity-90">Pending Requests</p>
            <p className="mt-2 text-3xl font-bold">{pendingCount}</p>
          </div>

          <div className="rounded-2xl bg-blue-500 p-5 text-white shadow-sm">
            <p className="text-sm opacity-90">Current User</p>
            <p className="mt-2 text-3xl font-bold">{currentUserId || 0}</p>
          </div>
        </div>

        <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm sm:flex-row">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
            />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
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

        <div className="mb-4 flex gap-2 rounded-2xl border border-zinc-200 bg-white p-2 shadow-sm">
          <button
            onClick={() => setSelectedTab("accepted")}
            className={[
              "rounded-xl px-4 py-2 text-sm font-medium transition",
              selectedTab === "accepted"
                ? "bg-zinc-100 text-zinc-900"
                : "text-zinc-500 hover:bg-zinc-50",
            ].join(" ")}
          >
            Accepted
          </button>

          <button
            onClick={() => setSelectedTab("pending")}
            className={[
              "rounded-xl px-4 py-2 text-sm font-medium transition",
              selectedTab === "pending"
                ? "bg-zinc-100 text-zinc-900"
                : "text-zinc-500 hover:bg-zinc-50",
            ].join(" ")}
          >
            Pending
          </button>
        </div>

        {errorMessage && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </div>
        )}

        {isLoading && (
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-zinc-600 shadow-sm">
            Loading friends...
          </div>
        )}

        {!isLoading && selectedTab === "accepted" && (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredAccepted.length > 0 ? (
              filteredAccepted.map((friend) => {
                const otherUser = getOtherUser(friend, currentUserId);

                return (
                  <div
                    key={friend.id}
                    className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm"
                  >
                    <div className="mb-3 flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100">
                          <UserRoundPlus size={20} className="text-zinc-700" />
                        </div>

                        <div>
                          <h2 className="font-semibold text-zinc-900">
                            {otherUser?.username || "Friend"}
                          </h2>
                          <p className="text-xs text-zinc-500">
                            {otherUser?.email || "No email"}
                          </p>
                        </div>
                      </div>

                      <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-700">
                        Accepted
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button className="flex-1 rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white">
                        Friend
                      </button>

                      <button className="rounded-xl border border-zinc-200 px-3 py-2 text-zinc-600 hover:bg-zinc-50">
                        <MessageCircle size={16} />
                      </button>

                      <button className="rounded-xl border border-zinc-200 px-3 py-2 text-zinc-600 hover:bg-zinc-50">
                        <CalendarDays size={16} />
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-zinc-600 shadow-sm md:col-span-2 xl:col-span-3">
                No accepted friends yet.
              </div>
            )}
          </div>
        )}

        {!isLoading && selectedTab === "pending" && (
          <div className="space-y-4">
            {pendingFriends.length > 0 ? (
              pendingFriends.map((friend) => (
                <div
                  key={friend.id}
                  className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100">
                        <UserRoundPlus size={20} className="text-zinc-700" />
                      </div>

                      <div>
                        <h2 className="font-semibold text-zinc-900">
                          {friend.requester?.username || "User"}
                        </h2>
                        <p className="text-sm text-zinc-500">
                          {friend.requester?.email || "No email"}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        handleAcceptFriend(friend.requesterId, friend.receiverId)
                      }
                      className="inline-flex items-center gap-2 rounded-xl bg-purple-500 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-600"
                    >
                      <Check size={16} />
                      Accept
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-zinc-600 shadow-sm">
                No pending requests.
              </div>
            )}
          </div>
        )}
      </div>

      <AddFriendModal
        isOpen={isAddFriendOpen}
        onClose={() => setIsAddFriendOpen(false)}
        onFriendAdded={() => loadFriends(currentUserId)}
      />
    </Container>
  );
}