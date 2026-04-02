"use client";

import { useState } from "react";
import Container from "@/components/Container";

// Days shown in the day selector
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// PM time slots
const pmTimes = [
  "12 PM",
  "1 PM",
  "2 PM",
  "3 PM",
  "4 PM",
  "5 PM",
  "6 PM",
  "7 PM",
  "8 PM",
  "9 PM",
  "10 PM",
  "11 PM",
];

// AM time slots
const amTimes = [
  "12 AM",
  "1 AM",
  "2 AM",
  "3 AM",
  "4 AM",
  "5 AM",
  "6 AM",
  "7 AM",
  "8 AM",
  "9 AM",
  "10 AM",
  "11 AM",
];

// Possible states for each time slot
type SlotState = "empty" | "available" | "busy" | "maybe";

// Styling for each slot state
const stateStyles: Record<SlotState, string> = {
  empty: "bg-zinc-50 text-zinc-400 border border-zinc-200",
  available: "bg-green-500 text-white border border-green-500",
  busy: "bg-red-500 text-white border border-red-500",
  maybe: "bg-yellow-400 text-white border border-yellow-400",
};

// Icon/text for each slot state
const stateIcons: Record<SlotState, string> = {
  empty: "",
  available: "✓",
  busy: "✕",
  maybe: "?",
};

export default function SchedulePage() {
  // Track selected day tab
  const [selectedDay, setSelectedDay] = useState("Mon");

  // Track whether the user is viewing AM or PM slots
  const [period, setPeriod] = useState<"AM" | "PM">("PM");

  // Store slot states by day + time
  const [slots, setSlots] = useState<Record<string, SlotState>>({
    "Mon-12 PM": "available",
    "Mon-1 PM": "busy",
    "Mon-2 PM": "available",
    "Mon-3 PM": "available",
    "Mon-4 PM": "available",
    "Mon-5 PM": "maybe",
    "Mon-6 PM": "maybe",
    "Mon-7 PM": "available",
    "Mon-8 PM": "available",
    "Mon-9 PM": "available",
    "Mon-10 PM": "busy",
    "Mon-11 PM": "maybe",
  });

  // Choose which time list to show based on AM / PM
  const timeSlots = period === "AM" ? amTimes : pmTimes;

  // Cycle a slot through the states
  function getNextState(current: SlotState | undefined): SlotState {
    if (!current || current === "empty") return "available";
    if (current === "available") return "busy";
    if (current === "busy") return "maybe";
    return "empty";
  }

  // Update a single slot when clicked
  function toggleSlot(time: string) {
    const key = `${selectedDay}-${time}`;
    setSlots((prev) => ({
      ...prev,
      [key]: getNextState(prev[key]),
    }));
  }

  // Mark every slot in the current view as one state
  function setAllForCurrentView(state: SlotState) {
    const updates: Record<string, SlotState> = {};

    timeSlots.forEach((time) => {
      const key = `${selectedDay}-${time}`;
      updates[key] = state;
    });

    setSlots((prev) => ({
      ...prev,
      ...updates,
    }));
  }

  // Clear the current AM or PM view back to empty
  function clearCurrentView() {
    const updates: Record<string, SlotState> = {};

    timeSlots.forEach((time) => {
      const key = `${selectedDay}-${time}`;
      updates[key] = "empty";
    });

    setSlots((prev) => ({
      ...prev,
      ...updates,
    }));
  }

  return (
    <Container>
      <div className="mx-auto max-w-4xl">
        {/*  Page header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-zinc-900">My Schedule</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Mark your availability so friends know when you’re free.
          </p>
        </div>

        {/*  Help / info banner */}
        <div className="mb-4 rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
          <p className="font-semibold">How it works:</p>
          <p>
            Click on a time slot to cycle through: Available → Busy → Maybe →
            Empty. Your friends will see this when coordinating plans.
          </p>
        </div>

        {/*  Day selector tabs */}
        <div className="mb-4 rounded-2xl border border-zinc-200 bg-white p-2 shadow-sm">
          <div className="grid grid-cols-7 gap-2">
            {days.map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => setSelectedDay(day)}
                className={[
                  "rounded-xl px-3 py-2 text-sm font-medium transition",
                  selectedDay === day
                    ? "bg-zinc-100 text-zinc-900 shadow-sm"
                    : "text-zinc-500 hover:bg-zinc-50",
                ].join(" ")}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* // AM / PM toggle */}
        <div className="mb-4 flex items-center justify-center">
          <div className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setPeriod("AM")}
              className={[
                "rounded-full px-4 py-2 text-sm font-medium transition",
                period === "AM"
                  ? "bg-zinc-100 text-zinc-900"
                  : "text-zinc-500 hover:bg-zinc-50",
              ].join(" ")}
            >
              ☀️ AM
            </button>

            <button
              type="button"
              onClick={() => setPeriod("PM")}
              className={[
                "rounded-full px-4 py-2 text-sm font-medium transition",
                period === "PM"
                  ? "bg-purple-100 text-purple-700"
                  : "text-zinc-500 hover:bg-zinc-50",
              ].join(" ")}
            >
              🌙 PM
            </button>
          </div>
        </div>

        {/*  Legend for slot colors */}
        <div className="mb-4 rounded-2xl border border-zinc-200 bg-white px-4 py-3 shadow-sm">
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="inline-block h-4 w-4 rounded-full border border-zinc-300 bg-zinc-50" />
              <span className="text-zinc-700">Not Set</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-4 w-4 rounded-full bg-green-500" />
              <span className="text-zinc-700">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-4 w-4 rounded-full bg-red-500" />
              <span className="text-zinc-700">Busy</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-4 w-4 rounded-full bg-yellow-400" />
              <span className="text-zinc-700">Maybe</span>
            </div>
          </div>
        </div>

        {/*  Main slot selection card */}
        <div className="mb-4 rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-zinc-900">
            {selectedDay} - {period === "PM" ? "Afternoon/Evening" : "Morning"}
          </h2>

          <div className="grid grid-cols-4 gap-3">
            {timeSlots.map((time) => {
              const key = `${selectedDay}-${time}`;
              const state = slots[key] || "empty";

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => toggleSlot(time)}
                  className={`rounded-2xl px-4 py-4 text-center font-semibold shadow-sm transition hover:scale-[1.02] ${stateStyles[state]}`}
                >
                  <div className="text-sm">{time}</div>
                  <div className="mt-1 text-lg">{stateIcons[state]}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/*  Quick action buttons */}
        <div className="mb-4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
          <h3 className="mb-3 text-sm font-semibold text-zinc-700">
            Quick Actions
          </h3>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setAllForCurrentView("available")}
              className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
            >
              Mark All Available
            </button>

            <button
              type="button"
              onClick={() => setAllForCurrentView("busy")}
              className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
            >
              Mark All Busy
            </button>

            <button
              type="button"
              onClick={clearCurrentView}
              className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
            >
              Clear {period}
            </button>
          </div>
        </div>

        {/*  Save button */}
        <div className="flex justify-center">
          <button
            type="button"
            className="rounded-xl bg-purple-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-600"
          >
            Save Availability
          </button>
        </div>
      </div>
    </Container>
  );
}
