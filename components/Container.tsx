"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Sidebar from "./Sidebar";

export default function Container({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-100 flex justify-center py-5">
        <div className={`md:[mx-auto flex max-w-7xl gap-6 px-6 py-6]`} >
      <div className={`fixed md:hidden top-4 z-50 transition-all duration-300 ${isOpen ? "left-[240px]" : "left-4"}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md bg-zinc-200"
        >
          {isOpen ? <X className="text-black" /> : <Menu className="text-black" />}
        </button>
      </div>
      <div className={`fixed md:static z-40 h-full w-72 shrink-0 transition-transform ${isOpen ? "translate-x-0" : "-translate-x-[120%]"} md:translate-x-0`}
      >
        <Sidebar />
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
      <main className="flex-1 w-[80vw] md:w-[60vw] lg:w-[60vw] xl:w-[70vw] rounded-3xl border border-zinc-200 bg-zinc-50 p-6 md:pt-6">
        {children}
      </main>
      </div>
    </div>
  );
}
