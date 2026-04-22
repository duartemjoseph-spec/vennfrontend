"use client";

import { ChangeEvent, useEffect, useState } from "react";
import Container from "@/components/Container";
import { Mail, UserRound, Pencil, CalendarDays, Divide } from "lucide-react";
import { getToken, getUsername, getUserByUsername } from "@/lib/api";

type UserData = {
  userId?: number;
  username?: string;
  email?: string;
  description?: string;
  userIcon?: string
  accountCreated: Date
};

export default function ProfilePage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [boolUserIcon, setBoolUserIcon] = useState<boolean>(user?.userIcon != null)
  const [creationDate, setCreationDate] = useState<string>("")

  const [boolEditProfileMode, setBoolEditProfileMode] = useState(false);
  
  const [nameUpdate, setNameUpdate] = useState("")
  const [emailUpdate, setEmailUpdate] = useState("")
  const [bioUpdate, setBioUpdate] = useState("")


  const formatMonthYear = (date: string) => {

    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      month: 'long',
      year: "numeric"
    })
  }

  const handleNameUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    setNameUpdate(e.target.value);
  }
  const handleEmailUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailUpdate(e.target.value);
  }
  const handleBioUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    setBioUpdate(e.target.value);
  }

  const handleProfileUpdate = async () => {
    // First validate user's inputted data: if name or email is empty! (create an boolInputError)
    if(nameUpdate == "")
    {
      // update new error bool and create error message below name input in a red border with red text!
    }

  }

  useEffect(() => {
    async function loadUser() {
      try {
        const token = getToken();
        const username = getUsername();

        if (!token || !username) {
          setErrorMessage("You need to log in first.");
          setIsLoading(false);
          return;
        }

        const data = await getUserByUsername(username);
        console.log(data);
        setUser(data);
        setNameUpdate(data?.username)
        setEmailUpdate(data.email)
        setBioUpdate(data.description)

        if (data.userIcon != null) setBoolUserIcon(true);

        setCreationDate(data.accountCreated)

      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("Could not load profile.");
        }
      } finally {
        setIsLoading(false);
      }
    }

    loadUser();
  }, []);

  if (isLoading) {
    return (
      <Container>
        <div className="mx-auto max-w-4xl">
          <p className="text-zinc-600">Loading profile...</p>
        </div>
      </Container>
    );
  }

  if (errorMessage) {
    return (
      <Container>
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
            {errorMessage}
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-zinc-900">Profile</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Manage your account settings and preferences.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
          <div className="h-28 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400" />

          <div className="px-6 pb-6">
            <div className="-mt-10 mb-6 flex items-center justify-between">
              <div className="flex items-end gap-4">
                <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-zinc-100 shadow">
                  {
                    boolUserIcon ? <img src={user?.userIcon} alt="User Icon!" /> : <UserRound size={32} className="text-zinc-500" />
                  }
                </div>

                <div className="pb-1">
                  <p className="text-lg font-semibold text-zinc-900">
                    {user?.username || getUsername() || "User"}
                  </p>
                </div>
              </div>
              {/* EDIT PROFILE HERE */}
              {
                boolEditProfileMode ?
                  <div className="flex gap-2 flex-row flex-wrap justify-end">
                    <button onClick={() => setBoolEditProfileMode(false)} className="flex items-center gap-2 rounded-xl bg-gray-100 px-4 py-2 text-sm font-medium text-black transition hover:bg-gray-200 shadow">Cancel</button>
                    <button className="flex items-center gap-2 rounded-xl bg-purple-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-purple-600">Save Changes</button>
                  </div>
                  :
                  <button onClick={() => setBoolEditProfileMode(true)} className="flex items-center gap-2 rounded-xl bg-purple-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-purple-600">
                    <Pencil size={16} />
                    Edit Profile
                  </button>
              }
            </div>

            <div className="space-y-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Name
                </p>
                {boolEditProfileMode ?
                  <input type="text" className="bg-gray-200 w-full h-8 rounded-lg text-zinc-900 text-sm p-3" value={nameUpdate} onChange={(e) => handleNameUpdate(e)} />
                  :
                  <p className="mt-1 text-zinc-900">
                    {user?.username || getUsername() || "No username"}
                  </p>
                }
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Email
                </p>
                <div className="mt-1 flex items-center gap-2 text-zinc-900">
                  {
                    boolEditProfileMode ?
                      <input type="email" className="bg-gray-200 w-full h-8 rounded-lg text-zinc-900 text-sm p-3" value={emailUpdate} onChange={(e) => handleEmailUpdate(e)} />
                      :
                      <div className="mt-1 flex items-center gap-2 text-zinc-900">
                        <Mail size={16} className="text-zinc-400" />
                        <span>{user?.email || "No email found"}</span>
                      </div>
                  }

                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Bio
                </p>
                {
                  boolEditProfileMode ?
                    <input type="text" className="bg-gray-200 w-full h-8 rounded-lg text-zinc-900 text-sm p-3" value={bioUpdate} onChange={(e) => handleBioUpdate(e)} />

                    :
                    <p className="mt-1 text-zinc-700">{user?.description ?? "No bio has been added!"}</p>
                }
                {/* <p className="mt-1 text-zinc-700">{user?.description ?? "No bio has been added!"}</p> */}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-zinc-900">
            Account Settings
          </h2>

          <div className="rounded-2xl bg-zinc-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Member Since
            </p>
            <div className="mt-2 flex items-center gap-2 text-zinc-700">
              <CalendarDays size={16} className="text-zinc-400" />
              <span>{`${formatMonthYear(creationDate)}`}</span>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}