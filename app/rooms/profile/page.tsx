"use client";

import { useEffect, useState } from "react";
import Container from "@/components/Container";
import { Mail, UserRound, Pencil, CalendarDays } from "lucide-react";
import { getProfileByUserId, getToken, getUserId, getUsername } from "@/lib/api";

type ProfileData = {
  username: string;
  email: string;
  description?: string;
  userIcon?: string;
  banner?: string;
};

export default function ProfilePage() {
  //  Page state
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadProfile() {
      try {
        const token = getToken();
        const savedUserId = getUserId();

        if (!token || !savedUserId) {
          setErrorMessage("You need to log in first.");
          setIsLoading(false);
          return;
        }

        const data = await getProfileByUserId(Number(savedUserId), token);
        setProfile(data);
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

    loadProfile();
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
        {/*  Page header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-zinc-900">Profile</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Manage your account settings and preferences.
          </p>
        </div>

        {/*  Main profile card */}
        <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
          {/* Banner */}
          <div
            className="h-28 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400"
            style={
              profile?.banner
                ? {
                    backgroundImage: `url(${profile.banner})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
                : undefined
            }
          />

          <div className="px-6 pb-6">
            {/*  Avatar row */}
            <div className="-mt-10 mb-6 flex items-center justify-between">
              <div className="flex items-end gap-4">
                <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-zinc-100 shadow">
                  {profile?.userIcon ? (
                    <img
                      src={profile.userIcon}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <UserRound size={32} className="text-zinc-500" />
                  )}
                </div>

                <div className="pb-1">
                  <p className="text-xs text-zinc-500">Logged in as</p>
                  <p className="font-semibold text-zinc-900">
                    {profile?.username || getUsername() || "User"}
                  </p>
                </div>
              </div>

              <button className="flex items-center gap-2 rounded-xl border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50">
                <Pencil size={16} />
                Edit Profile
              </button>
            </div>

            {/*  Info section */}
            <div className="space-y-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Name
                </p>
                <p className="mt-1 text-zinc-900">
                  {profile?.username || getUsername() || "No username"}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Email
                </p>
                <div className="mt-1 flex items-center gap-2 text-zinc-900">
                  <Mail size={16} className="text-zinc-400" />
                  <span>{profile?.email || "No email found"}</span>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Bio
                </p>
                <p className="mt-1 text-zinc-700">
                  {profile?.description || "No bio added yet."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/*  Stats row */}
        <div className="mt-6 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-zinc-900">Your Stats</h2>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-zinc-50 p-5 text-center">
              <p className="text-3xl font-bold text-purple-500">7</p>
              <p className="mt-1 text-sm text-zinc-500">Friends</p>
            </div>

            <div className="rounded-2xl bg-zinc-50 p-5 text-center">
              <p className="text-3xl font-bold text-purple-500">3</p>
              <p className="mt-1 text-sm text-zinc-500">Active Rooms</p>
            </div>

            <div className="rounded-2xl bg-zinc-50 p-5 text-center">
              <p className="text-3xl font-bold text-purple-500">12</p>
              <p className="mt-1 text-sm text-zinc-500">Meetups This Month</p>
            </div>
          </div>
        </div>

        {/*  Account settings card */}
        <div className="mt-6 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-zinc-900">
            Account Settings
          </h2>

          <div className="space-y-4">
            <div className="rounded-2xl bg-zinc-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Member Since
              </p>
              <div className="mt-2 flex items-center gap-2 text-zinc-700">
                <CalendarDays size={16} className="text-zinc-400" />
                <span>March 2026</span>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-zinc-50 p-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Account Type
                </p>
                <p className="mt-2 text-zinc-700">Free Plan</p>
              </div>

              <button className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100">
                Upgrade
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}