'use client'
import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import { RoomData } from '@/app/rooms/[RoomId]/page'
import { RoomDTO, UpdateRoomByRoomId } from '@/lib/api'

interface ModalProps {
    isOpen: boolean,
    onClose: () => void
    // import current room info!
    roomModel: RoomData 
    setRoomModel: React.Dispatch<React.SetStateAction<RoomData | null>>;
}

const UpdateRoomModal = ({ isOpen, onClose, roomModel, setRoomModel }: ModalProps) => {
    const [titleUpdate, setTitleUpdate] = useState<string>("")
    const [categoryUpdate, setCategoryUpdate] = useState<string>("")
    const [eventDateUpdate, setEventDateUpdate] = useState("")
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)

    useEffect(() => {
        if(isOpen){
            setTitleUpdate(roomModel.title ?? "")
            setCategoryUpdate(roomModel.category ?? "")
            setEventDateUpdate(roomModel.eventDate ?? "");
        }
        
    } , [isOpen])



    const handleUpdate = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setIsLoadingUpdate(true);
        const id = roomModel!.roomId
        console.log(titleUpdate + " : " + categoryUpdate + " : " + eventDateUpdate + " : ")
        // we will update title, category and EventDate!
        // add check if any values are empty!

        const updatedInfo: RoomDTO = {
            title: titleUpdate!,
            category: categoryUpdate!,
            eventDate: eventDateUpdate,
            isRoomActive: true
        }

        // Call endpoint to update room info!
        const updatedRoom = await UpdateRoomByRoomId(id, updatedInfo);
        if(updatedRoom.length == 0)
        {
            console.log("Error: Unable to update room!");
        }
        else {
            setRoomModel(updatedRoom);
        }
        setIsLoadingUpdate(false);
        onClose();
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>

            <form onSubmit={handleUpdate} className="space-y-4">
                <h1 className='text-zinc-900 text-2xl font-semibold'>Update {roomModel?.title}</h1>
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
                        value={titleUpdate}
                        onChange={(e) => setTitleUpdate(e.target.value)}
                        placeholder={roomModel?.title}
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
                        value={categoryUpdate}
                        onChange={(e) => setCategoryUpdate(e.target.value)}
                        placeholder={roomModel?.category}
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
                        type="date"
                        
                        value={eventDateUpdate}
                        onChange={(e) => setEventDateUpdate(e.target.value)}
                        placeholder={roomModel?.eventDate}
                        className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none focus:border-purple-500"
                    />
                </div>

                <div className="flex gap-3 pt-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 rounded-xl border border-zinc-300 bg-white px-4 py-3 font-medium text-zinc-700 hover:bg-zinc-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={isLoadingUpdate}
                        className="flex-1 rounded-xl bg-purple-500 px-4 py-3 font-semibold text-white hover:bg-purple-600 transition disabled:opacity-60"
                    >
                        {isLoadingUpdate ? "Updating..." : "Update Room"}
                    </button>
                </div>
            </form>


        </Modal>
    )
}

export default UpdateRoomModal