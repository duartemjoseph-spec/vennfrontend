"use client";

import { ChangeEvent, useEffect, useState } from "react";
import Container from "@/components/Container";
import { Mail, UserRound, Pencil, CalendarDays, Divide, Camera } from "lucide-react";
import { getToken, getUsername, UserProfile, updateUserProfileById, getUserId, getUserByUserId } from "@/lib/api";
import BlobModal from "@/components/BlobModal";

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
  const [displayUserIcon, setDisplayUserIcon] = useState<string | undefined>(undefined)
  const [creationDate, setCreationDate] = useState<string>("")

  const [boolEditProfileMode, setBoolEditProfileMode] = useState<boolean>(false);
  const [boolInputNameError, setBoolInputNameError] = useState(false)
  const [boolInputEmailError, setBoolInputEmailError] = useState(false)
  const [isBlobModalOpen, setIsBlobModalOpen] = useState(false)
  const [inputErrorMessage, setInputErrorMessage] = useState("")
  const [errorUpdateMessage, setErrorUpdateMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [uploadedImage, setUploadedImage] = useState<string | undefined>(undefined)

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
    setBoolInputNameError(false);
  }
  const handleEmailUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailUpdate(e.target.value);
    setBoolInputEmailError(false);
  }
  const handleBioUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    setBioUpdate(e.target.value);
  }

  const handleProfileUpdate = async () => {
    // First validate user's inputted data: if name or email is empty! (create an boolInputError)
    try{

    
    if (nameUpdate == "") {
      setBoolInputNameError(true)
      setInputErrorMessage("Please Input a Name before Saving Changes")
      // update new error bool and create error message below name input in a red border with red text!
    }
    else if (emailUpdate == "") {
      setBoolInputEmailError(true)
      setInputErrorMessage("Please Input a valid Email before Saving Changes")
    }
    else {
      // lets update our profile!
      let userIcon: string | undefined = user?.userIcon;
      if (uploadedImage != undefined || uploadedImage != null) {
        if (uploadedImage.length > 2)
          userIcon = uploadedImage;
      }

      const updateUser: UserProfile = {
        username: nameUpdate,
        email: emailUpdate,
        description: bioUpdate,
        userIcon: userIcon,
        banner: null,
      }
  
      const updateResponse = await updateUserProfileById(user?.userId!, updateUser,)
      // const updateResponse = null;
      if (updateResponse != null) {
        // setUser(updateResponse);
        loadUser();
        setBoolEditProfileMode(false);
        setUploadedImage(undefined);
        setSuccessMessage("Successfully Updated Profile!")
      }
      else {
        setErrorUpdateMessage("Error: Unable to Update your Profile!")
      }

    }
  }
  catch(error)
  {
    console.log(error)
  }
  }
  const handleBlob = () => {
    if(boolEditProfileMode){
      setIsBlobModalOpen(true)
    }
  }
  async function loadUser() {
    try {
      const token = getToken();
      const username = getUsername();
      const userId = getUserId();


      if (!token || !username) {
        setErrorMessage("You need to log in first.");
        setIsLoading(false);
        return;
      }

      // const data = await getUserByUsername(username);
      const data = await getUserByUserId(parseInt(userId!));
      setUser(data);
      setNameUpdate(data?.username)
      setEmailUpdate(data.email)
      
      if(data.description == null || data.description == undefined)
        setBioUpdate("");
      else{
        setBioUpdate(data.description);
      }
      console.log(data.userIcon)
      if (data.userIcon == "" || data.userIcon != undefined || data.userIcon != null) {
        setBoolUserIcon(true);
        setDisplayUserIcon(data.userIcon)
      }
      else{
        setBoolUserIcon(false)
        // setDisplayUserIcon
      }
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

  useEffect(() => {
    loadUser();
    setDisplayUserIcon(undefined);
  }, []);


  useEffect(() => {
    if (uploadedImage != undefined || uploadedImage != null) {
      setDisplayUserIcon(uploadedImage);
    }

  }, [uploadedImage])

  if (isLoading) {
    return (
      <Container>
        <div className="mx-auto max-w-4xl px-3 sm:px-0">
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
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-zinc-900 pt-12">Profile</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Manage your account settings and preferences.
          </p>
        </div>

        {successMessage && (
          <div className="mb-4 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {successMessage}
          </div>
        )}

        {errorUpdateMessage && (
          <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorUpdateMessage}
          </div>
        )}

        
        <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
          <div className="h-18 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400" />

          <div className="px-6 pb-6">
            <div className="-mt-10 mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-end sm:gap-4">
                <div className="flex items-end">

                  <div className={`flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-zinc-100 shadow ${boolEditProfileMode ? "cursor-pointer" : "cursor-default"} `}>
                    {
                      boolUserIcon
                        ?
                        <img onClick={handleBlob} src={displayUserIcon} alt="User Icon!" />
                        :
                        <UserRound onClick={handleBlob} size={32} className="text-zinc-500" />
                    }
                  </div>
                  <div className="">
                    {
                      boolEditProfileMode ? <Camera onClick={handleBlob} className="text-gray-500 cursor-pointer" size={20}></Camera> : ""
                    }
                    
                  </div>
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
                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <button onClick={() => setBoolEditProfileMode(false)} className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-purple-500 px-3 py-2 text-xs sm:text-sm">Cancel</button>
                    <button onClick={handleProfileUpdate} className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-x1 bg-purple-600 px-3 py-2 text-xs sm:text-sm">Save Changes</button>
                  </div>
                  :
                  <button onClick={() => setBoolEditProfileMode(true)} className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-purple-500 px-3 py-2 text-xs sm:text-sm">
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
                  <div>

                    <input type="text" className={`w-full min-h-[42px] rounded-lg text-sm p-3 text-zinc-900 bg-gray-200 ${boolInputNameError ? "border border-red-500" : ""} `} value={nameUpdate} onChange={(e) => handleNameUpdate(e)} />
                    {boolInputNameError ?
                      <div>
                        <p className="text-red-500">{inputErrorMessage}</p>
                      </div> : ""}
                  </div>
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

                {
                  boolEditProfileMode ?
                    <div>
                      <input type="email" className={`w-full min-h-[42px] rounded-lg text-sm p-3 text-zinc-900 bg-gray-200 ${boolInputEmailError ? "border border-red-500" : ""} `} value={emailUpdate} onChange={(e) => handleEmailUpdate(e)} />
                      {boolInputEmailError ?
                        <div>
                          <p className="text-red-500">{inputErrorMessage} MKay?</p>
                        </div> : ""}
                    </div>

                    :
                    <div className="mt-1 flex items-center gap-2 text-zinc-900">
                      <Mail size={16} className="text-zinc-400" />
                      <span>{user?.email || "No email found"}</span>
                    </div>
                }
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Bio
                </p>
                {
                  boolEditProfileMode ?
                    <input type="text" className='w-full min-h-[42px] rounded-lg text-sm p-3 text-zinc-900 bg-gray-200 ' value={bioUpdate} onChange={(e) => handleBioUpdate(e)} />
                    :
                    <p className="mt-1 text-zinc-700">{user?.description == "" ? "No bio has been added!" : user?.description}</p>
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

      <BlobModal
        isOpen={isBlobModalOpen}
        onClose={() => setIsBlobModalOpen(false)}
        uploadImage={uploadedImage}
        setUploadImage={setUploadedImage}

      />
    </Container>
  );
}