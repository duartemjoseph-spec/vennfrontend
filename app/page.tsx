"use client";

import Link from "next/link";
import { useState } from "react";
import Modal from "@/components/Modal";

export default function Home() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  function handleFakeLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // front-end only for now
    setIsLoginOpen(false);
    window.location.href = "/rooms";
  }

  return (
    <div className="min-h-screen bg-zinc-100 relative overflow-hidden">
      {/* soft background shapes */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="h-72 w-72 rounded-full bg-purple-300/30 blur-3xl absolute -translate-x-24 -translate-y-10" />
        <div className="h-72 w-72 rounded-full bg-cyan-300/30 blur-3xl absolute translate-x-24 translate-y-10" />
      </div>

      {/* top bar */}
      <header className="relative z-10 flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-purple-500" />
          <span className="text-2xl font-bold text-zinc-900">Venn</span>
        </div>
      </header>

      {/* hero */}
      <main className="relative z-10 flex items-center justify-center px-6">
        <section className="w-full max-w-4xl rounded-3xl border border-zinc-200 bg-white/90 backdrop-blur p-12 md:p-16 text-center shadow-sm">
          <div className="mx-auto mb-6 h-12 w-12 rounded-2xl bg-purple-500" />

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-4">
            See when everyone’s free.
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-zinc-600 mb-8">
            Venn helps friends, teams, and groups find the best time to meet
            without endless texting.
          </p>

          <button
            onClick={() => setIsLoginOpen(true)}
            className="inline-flex items-center justify-center rounded-xl bg-purple-500 px-6 py-3 text-white font-semibold hover:bg-purple-600 transition"
          >
            Get Started
          </button>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-sm text-zinc-600">
            <span className="rounded-full bg-zinc-100 px-4 py-2">
              Create a room
            </span>
            <span className="rounded-full bg-zinc-100 px-4 py-2">
              Share availability
            </span>
            <span className="rounded-full bg-zinc-100 px-4 py-2">
              Find overlap
            </span>
          </div>
        </section>
      </main>

      <Modal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)}>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-zinc-900">Log In</h2>
          <p className="mt-2 text-sm text-zinc-600">
            Welcome back. Sign in to start planning with Venn.
          </p>
        </div>

        <form onSubmit={handleFakeLogin} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-zinc-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-zinc-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-purple-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-purple-500 px-4 py-3 font-semibold text-white hover:bg-purple-600 transition"
          >
            Sign In
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-zinc-500">
          Don’t have an account yet?{" "}
          <button className="font-medium text-purple-600 hover:text-purple-700">
            Create one
          </button>
        </p>
      </Modal>
    </div>
  );
}