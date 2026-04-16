"use client";

import { useEffect, useState } from "react";
import Container from "@/components/Container";
import {
  createWeeklyAvailability,
  getUserId,
  getWeeklyAvailability,
} from "@/lib/api";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

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

type SlotState = "empty" | "available" | "busy" | "maybe";

type AvailabilityItem = {
  day: number | string;
  hour: number;
  status: number;
};

const stateStyles: Record<SlotState, string> = {
  empty: "bg-zinc-50 text-zinc-400 border border-zinc-200",
  available: "bg-green-500 text-white border border-green-500",
  busy: "bg-red-500 text-white border border-red-500",
  maybe: "bg-yellow-400 text-white border border-yellow-400",
};

const stateIcons: Record<SlotState, string> = {
  empty: "",
  available: "✓",
  busy: "✕",
  maybe: "?",
};

const dayToNumber: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

const numberToDay: Record<number, string> = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat",
};

export default function SchedulePage() {
  const [selectedDay, setSelectedDay] = useState("Mon");
  const [period, setPeriod] = useState<"AM" | "PM">("PM");
  const [slots, setSlots] = useState<Record<string, SlotState>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const timeSlots = period === "AM" ? amTimes : pmTimes;

  useEffect(() => {
    async function loadAvailability() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const userId = Number(getUserId() || 0);

        if (!userId) {
          throw new Error("You need to log in first.");
        }

        const data = await getWeeklyAvailability(userId);
        const loadedSlots: Record<string, SlotState> = {};

        (data || []).forEach((item: AvailabilityItem) => {
          const dayNumber =
            typeof item.day === "number"
              ? item.day
              : Number(item.day);

          const dayLabel = numberToDay[dayNumber];
          const timeLabel = hourToLabel(item.hour);

          if (!dayLabel || !timeLabel) return;

          let state: SlotState = "empty";

          if (item.status === 0) state = "busy";
          if (item.status === 1) state = "maybe";
          if (item.status === 2) state = "available";

          loadedSlots[`${dayLabel}-${timeLabel}`] = state;
        });

        setSlots(loadedSlots);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("Could not load availability.");
        }
      } finally {
        setIsLoading(false);
      }
    }

    loadAvailability();
  }, []);

  function getNextState(current: SlotState | undefined): SlotState {
    if (!current || current === "empty") return "available";
    if (current === "available") return "busy";
    if (current === "busy") return "maybe";
    return "empty";
  }

  function toggleSlot(time: string) {
    const key = `${selectedDay}-${time}`;
    setSlots((prev) => ({
      ...prev,
      [key]: getNextState(prev[key]),
    }));
  }

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

  async function handleSaveAvailability() {
    try {
      setIsSaving(true);
      setErrorMessage("");
      setSuccessMessage("");

      const userId = Number(getUserId() || 0);

      if (!userId) {
        throw new Error("You need to log in first.");
      }

      const payload = Object.entries(slots)
        .filter(([, state]) => state !== "empty")
        .map(([key, state]) => {
          const [dayLabel, timeLabel] = key.split("-");
          return {
            day: dayToNumber[dayLabel],
            hour: timeLabelToHour(timeLabel),
            status: slotStateToStatus(state),
          };
        });

      await createWeeklyAvailability(userId, payload);
      setSuccessMessage("Availability saved.");
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Could not save availability.");
      }
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Container>
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-zinc-900">My Schedule</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Mark your availability so friends know when you’re free.
          </p>
        </div>

        {errorMessage && (
          <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="mb-4 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {successMessage}
          </div>
        )}

        <div className="mb-4 rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
          <p className="font-semibold">How it works:</p>
          <p>
            Click on a time slot to cycle through: Available → Busy → Maybe →
            Empty. Save to send your weekly availability to the backend.
          </p>
        </div>

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

        {isLoading ? (
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-zinc-600 shadow-sm">
            Loading availability...
          </div>
        ) : (
          <>
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

            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleSaveAvailability}
                disabled={isSaving}
                className="rounded-xl bg-purple-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-600 disabled:opacity-60"
              >
                {isSaving ? "Saving..." : "Save Availability"}
              </button>
            </div>
          </>
        )}
      </div>
    </Container>
  );
}

function timeLabelToHour(label: string) {
  if (label === "12 AM") return 0;
  if (label === "12 PM") return 12;

  const number = Number(label.split(" ")[0]);
  const period = label.split(" ")[1];

  if (period === "AM") return number;

  return number + 12;
}

function hourToLabel(hour: number) {
  if (hour === 0) return "12 AM";
  if (hour === 12) return "12 PM";
  if (hour < 12) return `${hour} AM`;
  return `${hour - 12} PM`;
}

function slotStateToStatus(state: SlotState) {
  if (state === "busy") return 0;
  if (state === "maybe") return 1;
  if (state === "available") return 2;
  return 0;
}