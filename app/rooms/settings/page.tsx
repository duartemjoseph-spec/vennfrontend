'use client'
import Container from '@/components/Container'
import { Dropdown, DropdownItem, ToggleSwitch } from 'flowbite-react'
import { Bell, Check, ChevronDown, CircleQuestionMark, Globe, Lock, Moon, Shield } from 'lucide-react'

import React, { useState } from 'react'

const page = () => {

  const [boolNotification, setBoolNotification] = useState(true);
  const [boolEmailNotification, setBoolEmailNotification] = useState(false);
  const [boolSoundNotification, setBoolSoundNotification] = useState(false);
  const [isDark, setIsDark] = useState(false)

  const handleNotification = () => {
    setBoolNotification(!boolNotification);
  }
  const handleEmailNotification = () => {
    setBoolEmailNotification(!boolEmailNotification);
  }

  const handleSoundNotification = () => {
    setBoolSoundNotification(!boolSoundNotification);
  }

  const handleDark = () => {
    setIsDark(!isDark);
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
                <ToggleSwitch color='black' checked={boolNotification} onChange={handleNotification} ></ToggleSwitch>
              </div>
            </div>
            <hr className='pt-5 mt-5' />

            <div className='flex justify-between'>
              <div>
                <h2 className='text-lg text-zinc-900 font-semibold'>Email Notifications</h2>
                <p className='text-zinc-500'>Receive updates via email</p>
              </div>
              
                <div className='flex items-center'>
                
                  <ToggleSwitch color='dark' checked={boolEmailNotification} onChange={handleEmailNotification} ></ToggleSwitch>
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
                <ToggleSwitch color='dark' checked={boolSoundNotification} onChange={handleSoundNotification} ></ToggleSwitch>
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

          <div className='pt-8 pb-2 hidden'>

            <div className='flex justify-between'>
              <div>
                <h2 className='text-lg text-zinc-900 font-semibold'>Dark Mode</h2>
                <p className='text-zinc-500'>Switch to dark theme</p>
              </div>
              <div className='flex items-center'>
                {/* radio button */}
                <ToggleSwitch color='dark' checked={isDark} onChange={handleDark} ></ToggleSwitch>
              </div>
            </div>

          </div>
          <hr className='pt-5 mt-5' />

          <div>
            <h2 className='text-lg text-zinc-900 font-semibold pb-3'>Language</h2>
            {/* Add ternary to dropdown to indicate selected Item  */}
            <Dropdown className='text-black rounded-xl' label="" renderTrigger={() =>
            (
              <div className='p-4 py-3 border shadow-black rounded-lg hover:bg-gray-300 flex justify-between gap-3'>
                <h2 className='text-gray-800 font-semibold'>English</h2>
                <ChevronDown size={20} color='black' />
              </div>
            )
            } inline>
              <DropdownItem className='hover:bg-gray-300 rounded-xl'>
                <div className='flex flex-row justify-between w-full '>
                  {/* This will display what language is currently toggled! */}
                  <p>English</p>
                  <Check className='' aria-label='English settings toggled!' size={16}></Check>
                </div>
              </DropdownItem>
              <DropdownItem className='hover:bg-gray-300 rounded-xl'>
                
                <div className='flex flex-row justify-between w-full '>
                  <p>Spanish</p>
                  <Check className='hidden' aria-label='English settings toggled!' size={16}></Check>
                </div>
              </DropdownItem>
              <DropdownItem className='hover:bg-gray-300 rounded-xl'>
           
                <div className='flex flex-row justify-between w-full '>
                  <p>Francis</p>
                  <Check className='hidden' aria-label='English settings toggled!' size={16}></Check>
                </div>
              </DropdownItem>
              <DropdownItem className='hover:bg-gray-300 rounded-xl'>
                
                <div className='flex flex-row justify-between w-full '>
                  <p>Deutsch</p>
                  <Check className='hidden' aria-label='English settings toggled!' size={16}></Check>
                </div>
              </DropdownItem>
            </Dropdown>
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
            <h2 className='text-lg text-zinc-900 font-semibold pb-3'>Timezone</h2>
            {/* insert toggle  */}
            <Dropdown className='text-black rounded-xl' label="" renderTrigger={() =>
            (
              <div className='p-4 py-3 border shadow-black rounded-lg hover:bg-gray-300 flex justify-between gap-3'>
                <h2 className='text-gray-800 font-semibold'>Pacific Time (PST)</h2>
                <ChevronDown size={20} color='black' />
              </div>
            )
            } inline>
              <DropdownItem className='hover:bg-gray-300 rounded-xl'>
                {/* Pacific Time (PST) */}
                <div className='flex flex-row justify-between w-full '>
                  <p>Pacific Time (PST)</p>
                  <Check className='' aria-label='English settings toggled!' size={16}></Check>
                </div>
              </DropdownItem>
              <DropdownItem className='hover:bg-gray-300 rounded-xl'>
                {/* Mountain Time (MST) */}
                <div className='flex flex-row justify-between w-full '>
                  <p>Mountain Time (MST)</p>
                  <Check className='hidden' aria-label='English settings toggled!' size={16}></Check>
                </div>
              </DropdownItem>
              <DropdownItem className='hover:bg-gray-300 rounded-xl'>
                {/* Central Time (CST) */}
                <div className='flex flex-row justify-between w-full '>
                  <p>Central Time (CST)</p>
                  <Check className='hidden' aria-label='English settings toggled!' size={16}></Check>
                </div>
              </DropdownItem>
              <DropdownItem className='hover:bg-gray-300 rounded-xl'>
                {/* Eastern Time (EST) */}
                <div className='flex flex-row justify-between w-full '>
                  <p>Eastern Time (EST)</p>
                  <Check className='hidden' aria-label='English settings toggled!' size={16}></Check>
                </div>
              </DropdownItem>
            </Dropdown>

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