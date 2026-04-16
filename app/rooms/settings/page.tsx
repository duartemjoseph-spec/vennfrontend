import Container from '@/components/Container'
import { Bell } from 'lucide-react'
import React from 'react'

const page = () => {
  return (
    <>
      <Container>
        <h1 className='text-3xl font-bold text-zinc-900'>Settings</h1>
        <p className='mt-1 text-sm text-zinc-500'>Customize your FreeSync experience</p>

        <div className='rounded-xl border border-zinc-200 bg-white p-5 shadow-sm flex flex-col'>
          <div className='flex gap-4 items-center'>
            <div className='gap-2 rounded-xl place-items-center bg-purple-200 p-3 pt-3 w-11 h-11 transition '>
              <Bell color='purple' size={18}></Bell>
            </div>
            <div>
              <h2 className='text-xl text-zinc-900'>Notifications</h2>
              <p className='text-zinc-500'>Manage how you receive notifications</p>
            </div>
          </div>

          <div>
            {/* insert settings for notifications, email notifications, sound effects! */}
          </div>
        </div>

      </Container>
    </>
  )
}

export default page