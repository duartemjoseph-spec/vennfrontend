"use client";

import { useEffect, useState } from "react";
import Container from "@/components/Container";
import CreateRoomModal from "@/components/CreateRoomModal";
import { acceptRoomInvite, declineRoomInvite, getAcceptedFriends, getAllRooms, getPendingRoomInvites, getToken, getUserId } from "@/lib/api";
import { Calendar, UserRound, UsersRound } from "lucide-react";
import { Button } from "flowbite-react";

type RoomData = {
  roomId: number;
  title?: string;
  category?: string;
  eventDate?: string;
  isRoomActive: boolean;
  userId: number;
};

export type RoomInviteDTO = {
  roomId: number;
  roomTitle: string;
  category: string;
  eventDate: string,
  requesterId: number;
  requesterName: string;
  requesterIcon: string | undefined | null;
}

export default function RoomsPage() {
  const [rooms, setRooms] = useState<RoomData[]>([]);
  const [friends, setFriends] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isCreateRoomOpen, setIsCreateRoomOpen] = useState(false);
  const [pendingRoomInvite, setPendingRoomInvite] = useState<RoomInviteDTO[]>([]);


  async function loadRooms() {
    try {
      setErrorMessage("");
      setIsLoading(true);

      const token = getToken();
      let id = getUserId();
      let userId = Number(id);
      const data = await getAllRooms(userId, token || undefined);
      setRooms(data || []);
      const friendList = await getAcceptedFriends(userId);
      setFriends(friendList)
      const invites = await getPendingRoomInvites(userId);
      // console.log(invites);
      setPendingRoomInvite(invites)

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

  const handleAcceptRoomInvite = async (roomId: number) => {
    const userId = getUserId();
    if (userId == null || userId == "") {
      console.log("User id not saved properly, log in again.")
      return;
    }

    const result = await acceptRoomInvite(roomId, Number(userId))

    if (result) {
      // success message: ??
      // reload invite component!
      await loadRooms();
      // reload available rooms

    }
    else {
      // display error message that unable to join room at this time!
      console.log("Unable to accept room invite!")
    }
  }

  const handleRemoveRoomInvite = async (roomId: number) => {
    const userId = getUserId();
    if (userId == null || userId == "") {
      console.log("User id not saved properly, log in again.")
      return;
    }

    const result = await declineRoomInvite(roomId, Number(userId))

    if(result){
      await loadRooms();

    }
    else {
      console.log("unable to remove user!")
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
          className="rounded-xl bg-purple-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-purple-600 cursor-pointer"
        >
          + New Room
        </button>
      </div>

      {isLoading && (
        <div className="rounded-2xl border border-zinc-200 bg-white p-4 text-sm text-zinc-600 shadow-sm">
          Loading rooms...
        </div>
      )}

      {errorMessage && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      )}
      {/* test if loading is complete! Then we will map out our cards to display Active Rooms, Total Friends and FUNCTION to accept pending room invites! */}
      {!isLoading && !errorMessage && (
        <>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">

            <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
              <Calendar size={42} className="text-purple-600 bg-purple-200 border-10 border-purple-200 rounded-lg" />
              <h5 className="font-bold text-zinc-900 text-lg pt-2">{rooms.length}</h5>
              <p className="text-zinc-900 text-xs">Active Rooms</p>
            </div>

            <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
              <UsersRound size={42} className="text-green-600 bg-green-200 border-10 border-green-200 rounded-lg" />
              <h5 className="font-bold text-zinc-900 text-lg pt-2">{friends.length}</h5>
              <p className="text-zinc-900 text-xs">Friends</p>
            </div>
          </div>
          <div className="">
            {/* create boolean and check if user has pending invites */}
            <h2 className="text-zinc-500 text-sm pb-2">{pendingRoomInvite.length > 0 ? `Pending Room Invites: ${pendingRoomInvite.length}` : ""}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-4">
              {
                pendingRoomInvite.map((invite, key) => (
                  <div key={key} className="text-zinc-900 rounded-3xl border border-zinc-200 bg-white p-4 sm:p-5 shadow-sm">
                    <h5 className="text-lg sm:text-xl font-semibold leading-tight">{invite.roomTitle}</h5>
                    <h5 className="mt-1 text-xs sm:text-sm text-zinc-500">{invite.category}</h5>
                    <h5 className="mt-1 text-xs sm:text-sm text-zinc-600">{formatDate(invite.eventDate)}</h5>
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex h-10 w-10 rounded-full overflow-hidden bg-zinc-100 flex items-center justify-center">
                       
                          {invite.requesterIcon ? (
                            <img src={invite.requesterIcon} alt="User Icon" 
                            className="h-full w-full object-cover"
                            />
                        ):(
                            
                              <UserRound size={16}/>
                        )}
                          
                        
                      </div>
                      <p className="text-sm">Room Host: {invite.requesterName}</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 pt-4">
                      {/* Button will invoke endpoint to change status to accepted */}
                      <button onClick={() => handleAcceptRoomInvite(invite.roomId)} className="w-full rounded-lg bg-purple-500 px-3 py-2 sm:text-sm font-medium text-white">Accept Invitation</button>
                      {/* button will invoke endpoint to remove invitation instance from DB! */}
                      <button onClick={() => handleRemoveRoomInvite(invite.roomId)} className="w-full rounded-lg bg-red-500 px-3 py-2 sm:text-sm font-medium text-white">Decline</button>
                    </div>
                  </div>
                ))
              }

            </div>

          </div>
        </>
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
