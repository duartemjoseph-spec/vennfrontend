"use client";

import Image from "next/image";
import { useState } from "react";
import Modal from "@/components/Modal";
import {
  createUser,
  getUserByUsername,
  loginUser,
  saveToken,
  saveUserId,
  saveUsername,
} from "@/lib/api";

export default function Home() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [signupUsername, setSignupUsername] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function openLoginModal() {
    setAuthMode("login");
    setErrorMessage("");
    setSuccessMessage("");
    setIsAuthOpen(true);
  }

  function closeModal() {
    setIsAuthOpen(false);
    setErrorMessage("");
    setSuccessMessage("");
  }

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      const data = await loginUser(loginUsername, loginPassword);
      const token = data?.token || data?.Token;

      if (!token) {
        throw new Error("No token returned from backend.");
      }

      saveToken(token);
      saveUsername(loginUsername);

      const userInfo = await getUserByUsername(loginUsername);
      const userId =
        userInfo?.userId || userInfo?.UserId || userInfo?.id || userInfo?.Id;

      if (userId) {
        saveUserId(userId);
      }

      setSuccessMessage("Login successful.");
      setIsAuthOpen(false);
      window.location.href = "/rooms";
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Login failed.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      await createUser(signupUsername, signupEmail, signupPassword);

      setSuccessMessage("Account created. You can log in now.");
      setAuthMode("login");
      setLoginUsername(signupUsername);

      setSignupUsername("");
      setSignupEmail("");
      setSignupPassword("");
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Signup failed.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-100 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 opacity-20 blur-3xl">
          <Image
            src="/venn-logo-transparent.png"
            alt="Venn background logo"
            width={600}
            height={600}
            className="h-[320px] w-[320px] object-contain md:h-[520px] md:w-[520px]"
            priority
          />
        </div>

        <div className="absolute left-1/2 top-[58%] h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/20 blur-3xl" />
      </div>

      <header className="relative z-10 flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-3">
          <Image
            src="/venn-logo-transparent.png"
            alt="Venn logo"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
            priority
          />
          <span className="text-2xl font-bold text-zinc-900">Venn</span>
        </div>
      </header>

      <main className="relative z-10 flex items-center justify-center px-6">
        <section className="w-full max-w-4xl rounded-3xl border border-zinc-200 bg-white/90 backdrop-blur p-12 md:p-16 text-center shadow-sm">
          <div className="mx-auto mb-6 flex items-center justify-center">
            <Image
              src="/venn-logo-transparent.png"
              alt="Venn logo"
              width={72}
              height={72}
              className="h-16 w-16 object-contain md:h-[72px] md:w-[72px]"
              priority
            />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-4">
            See when everyone&apos;s free.
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-zinc-600 mb-8">
            Venn helps friends, teams, and groups find the best time to meet
            without endless texting.
          </p>

          <button
            onClick={openLoginModal}
            className="inline-flex items-center justify-center rounded-xl bg-purple-500 px-6 py-3 text-white font-semibold hover:bg-purple-600 transition"
          >
            Get Started
          </button>
        </section>
      </main>

      <Modal isOpen={isAuthOpen} onClose={closeModal}>
        {authMode === "login" ? (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-zinc-900">Log In</h2>
              <p className="mt-2 text-sm text-zinc-600">
                Welcome back. Sign in to start planning with Venn.
              </p>
            </div>

            {errorMessage && (
              <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {errorMessage}
              </div>
            )}

            {successMessage && (
              <div className="mb-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                {successMessage}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label
                  htmlFor="login-username"
                  className="mb-2 block text-sm font-medium text-zinc-700"
                >
                  Username
                </label>
                <input
                  id="login-username"
                  type="text"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label
                  htmlFor="login-password"
                  className="mb-2 block text-sm font-medium text-zinc-700"
                >
                  Password
                </label>
                <input
                  id="login-password"
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-purple-500"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-xl bg-purple-500 px-4 py-3 font-semibold text-white hover:bg-purple-600 transition disabled:opacity-60"
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            <p className="mt-4 text-center text-sm text-zinc-500">
              Don&apos;t have an account yet?{" "}
              <button
                type="button"
                onClick={() => {
                  setAuthMode("signup");
                  setErrorMessage("");
                  setSuccessMessage("");
                }}
                className="font-medium text-purple-600 hover:text-purple-700"
              >
                Create one
              </button>
            </p>
          </>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-zinc-900">
                Create an account
              </h2>
              <p className="mt-2 text-sm text-zinc-600">
                Join Venn and start planning with your group.
              </p>
            </div>

            {errorMessage && (
              <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {errorMessage}
              </div>
            )}

            {successMessage && (
              <div className="mb-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label
                  htmlFor="signup-username"
                  className="mb-2 block text-sm font-medium text-zinc-700"
                >
                  Username
                </label>
                <input
                  id="signup-username"
                  type="text"
                  value={signupUsername}
                  onChange={(e) => setSignupUsername(e.target.value)}
                  placeholder="Choose a username"
                  className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label
                  htmlFor="signup-email"
                  className="mb-2 block text-sm font-medium text-zinc-700"
                >
                  Email
                </label>
                <input
                  id="signup-email"
                  type="email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label
                  htmlFor="signup-password"
                  className="mb-2 block text-sm font-medium text-zinc-700"
                >
                  Password
                </label>
                <input
                  id="signup-password"
                  type="password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  placeholder="Create a password"
                  className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-purple-500"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-xl bg-purple-500 px-4 py-3 font-semibold text-white hover:bg-purple-600 transition disabled:opacity-60"
              >
                {isLoading ? "Creating Account..." : "Sign Up"}
              </button>
            </form>

            <p className="mt-4 text-center text-sm text-zinc-500">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setAuthMode("login");
                  setErrorMessage("");
                  setSuccessMessage("");
                }}
                className="font-medium text-purple-600 hover:text-purple-700"
              >
                Log in
              </button>
            </p>
          </>
        )}
      </Modal>
    </div>
  );
}
