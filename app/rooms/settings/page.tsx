'use client'
import Container from '@/components/Container'
import { Button, ToggleSwitch } from 'flowbite-react'
import { Bell, CircleQuestionMark, Globe, Lock, Moon, Shield } from 'lucide-react'
import React, { useState } from 'react'

const page = () => {

  const [boolNotification, setBoolNotification] = useState(true);

  const handleNotification = () => {
    setBoolNotification(!boolNotification);
  }


  return (
    <>
      <Container>
        <h1 className='text-3xl font-bold text-zinc-900'>Settings</h1>
        <p className='mt-1 text-sm text-zinc-500'>Customize your FreeSync experience</p>

        <div className='mt-5 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm '>
          <div className='flex gap-4 items-center'>
            <div className='gap-2 rounded-xl place-items-center bg-purple-200 p-3 pt-3 w-11 h-11 transition '>
              <Bell aria-label='Notification Settings' color='purple' size={18}></Bell>
            </div>
            <div>
              <h2 className='text-xl text-zinc-900 font-bold'>Notifications</h2>
              <p className='text-zinc-500'>Manage how you receive notifications</p>
            </div>
          </div>
          {/* Notification Settings Here */}
          <div className='pt-8 pb-2'>
            {/* insert settings for notifications, email notifications, sound effects! */}
            <div className='flex justify-between'>
              <div>
                <h2 className='text-lg text-zinc-900 font-semibold'>Push Notifications</h2>
                <p className='text-zinc-500'>Receive push notifications on this device</p>
              </div>
              <div className='flex items-center'>
                {/* radio button */}
                <ToggleSwitch color='dark' checked={true} onChange={handleNotification} ></ToggleSwitch>
              </div>
            </div>
            <hr className='pt-5 mt-5' />

            <div className='flex justify-between'>
              <div>
                <h2 className='text-lg text-zinc-900 font-semibold'>Email Notifications</h2>
                <p className='text-zinc-500'>Receive updates via email</p>
              </div>
              <div className='flex items-center'>
                {/* radio button */}
                <ToggleSwitch color='dark' checked={true} onChange={handleNotification} ></ToggleSwitch>
              </div>
            </div>

            <hr className='pt-5 mt-5' />

            <div className='flex justify-between'>
              <div>
                <h2 className='text-lg text-zinc-900 font-semibold'>Sound Effects</h2>
                <p className='text-zinc-500'>Play sounds for notifications and actions</p>
              </div>
              <div className='flex items-center'>
                {/* radio button */}
                <ToggleSwitch color='dark' checked={boolNotification} onChange={handleNotification} ></ToggleSwitch>
              </div>
            </div>
          </div>
        </div>

        {/* Appearance Settings (Dark Mode) */}
        <div className='mt-5 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm '>
          <div className='flex gap-4 items-center'>
            <div className='gap-2 rounded-xl place-items-center bg-blue-100 p-3 w-11 h-11 transition '>

              <Moon aria-label='Settings to toggle dark mode!' color='#2F80ED' size={22}></Moon>
            </div>
            <div>
              <h2 className='text-xl text-zinc-900 font-bold'>Appearance</h2>
              <p className='text-zinc-500'>Customize the look and feel</p>
            </div>
          </div>

          <div className='pt-8 pb-2'>

            <div className='flex justify-between'>
              <div>
                <h2 className='text-lg text-zinc-900 font-semibold'>Dark Mode</h2>
                <p className='text-zinc-500'>Switch to dark theme</p>
              </div>
              <div className='flex items-center'>
                {/* radio button */}
                <ToggleSwitch color='dark' checked={boolNotification} onChange={handleNotification} ></ToggleSwitch>
              </div>
            </div>

          </div>
          <hr className='pt-5 mt-5' />

          <div>
            <h2 className='text-lg text-zinc-900 font-semibold'>Language</h2>
            {/* insert toggle  */}
          </div>

        </div>

        {/* Time and Region */}
        <div className='mt-5 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm '>
          <div className='flex gap-4 items-center'>
            <div className='gap-2 rounded-xl place-items-center bg-sky-100 p-3 w-11 h-11 transition '>

              {/* <Moon aria-label='Settings to toggle dark mode!' color='#2F80ED' size={22}></Moon> */}
              <Globe size={21} color='#2F80ED'></Globe>
            </div>
            <div>
              <h2 className='text-xl text-zinc-900 font-bold'>Time & Region</h2>
              <p className='text-zinc-500'>Configure timezone and regional settings</p>
            </div>
          </div>
        <hr className='pt-5 mt-5' />

          <div>
            <h2 className='text-lg text-zinc-900 font-semibold'>Timezone</h2>
            {/* insert toggle  */}

          </div>

        </div>
        {/* Privacy & Security */}
        <div className='mt-5 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm '>
          <div className='flex gap-4 items-center'>
            <div className='gap-2 rounded-xl place-items-center bg-[#E8F8F0] p-3 w-11 h-11 transition '>
              {/* <Bell aria-label='Notification Settings' color='purple' size={18}></Bell> */}
              {/* <Moon aria-label='Settings to toggle dark mode!' color='#2F80ED' size={22}></Moon> */}
              <Shield color='#27AE60'></Shield>
            </div>
            <div>
              <h2 className='text-xl text-zinc-900 font-bold'>Privacy Settings</h2>
              <p className='text-zinc-500'>Manage your privacy and security settings</p>
            </div>
          </div>
          <hr className='pt-5 mt-5' />

          <div className='flex flex-col gap-5'>
            <div className='p-4 py-3 border shadow-black rounded-lg hover:bg-gray-300 flex items-center gap-3'>
              <Lock size={20} color='black' />
              <h2 className='text-gray-800 font-semibold'>Change Password</h2>
            </div>
            <div className='p-4 py-3 border shadow-black rounded-lg hover:bg-gray-300 flex items-center gap-3'>
              <Shield size={20} color='black' />
              <h2 className='text-gray-800 font-semibold'>Privacy Settings</h2>
            </div>
            <div className='p-4 py-3 border shadow-black rounded-lg hover:bg-gray-300 flex items-center gap-3'>
              <CircleQuestionMark size={20} color='black' />
              <h2 className='text-gray-800 font-semibold'>Data & Privacy</h2>
            </div>
            {/* insert toggle  */}
          </div>

        </div>



      </Container>
    </>
  )
}

export default page