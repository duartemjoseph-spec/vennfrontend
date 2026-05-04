import React from 'react'
import Modal from './Modal'
import { deleteRoomByRoomId } from '@/lib/api'
import { redirect } from 'next/navigation'
import { Button } from 'flowbite-react'

interface DeleteModalProp {
    isOpen: boolean,
    onClose: () => void,
    roomId: number

}
const DeleteModal = ({ isOpen, onClose, roomId }: DeleteModalProp) => {

    const handleDelete = async () => {
        console.log(roomId);
        // call function to delete room
        // if function returns true then redirect user to /room page
        const result = await deleteRoomByRoomId(roomId);
        // const result = true;
        console.log(result)
        if (result) {
            redirect("/rooms")
        }
    }


    return (

        <Modal isOpen={isOpen} onClose={onClose}  >
            <div className='text-zinc-900'>

                <h1 className='text-2xl'>Are you sure you want to delete room?</h1>
                <div className='flex justify-around pt-5'>

                <button onClick={handleDelete} className='flex items-center gap-2 rounded-xl bg-red-500 px-6 py-2 text-sm text-white font-semibold transition hover:bg-red-600 shadow'>Yes</button>
                <button className='flex items-center gap-2 rounded-xl bg-gray-400 px-6 py-2 text-sm font-medium text-white transition hover:bg-gray-500 shadow' onClick={onClose}>No</button>
                </div>
            </div>

        </Modal>
    )
}

export default DeleteModal