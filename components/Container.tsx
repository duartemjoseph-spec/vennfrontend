"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Sidebar from "./Sidebar";

export default function Container({ children }: { children: React.ReactNode }) {
const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-100 flex">
      <div className={`md:hidden fixed top-4 z-50 transition-all duration-300 ${isOpen ? " left-[240px]" : "left-4"}`}>
       <button 
       onClick={() => setIsOpen(!isOpen)}
       className="p-2 rounded-md bg-zinc-200"
       >
        {isOpen ? <X /> : <Menu />}
       </button>
      </div>

      <div className={`fixed md:static z-40 h-full w-72 shrink-0 transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
       <Sidebar />
      </div>

      {isOpen && (
        <div 
        className="fixed inset-0 bg-black/50 z-30"
         onClick={() => setIsOpen(false)}
        />
      )}
        <main className="flex-1 rounded-3xl border border-zinc-200 bg-zinc-50 p-6 pt-20 md:pt-6">
          {children}
        </main>
      </div>
    
    
  );
}
