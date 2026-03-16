"use client";

import { useMemo, useState } from "react";

type AvailabilityGridProps = {
  period: "AM" | "PM";
};

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getTimeSlots(period: "AM" | "PM") {
  if (period === "AM") {
    return [
      "12:00 AM",
      "1:00 AM",
      "2:00 AM",
      "3:00 AM",
      "4:00 AM",
      "5:00 AM",
      "6:00 AM",
      "7:00 AM",
      "8:00 AM",
      "9:00 AM",
      "10:00 AM",
      "11:00 AM",
    ];
  }

  return [
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
    "9:00 PM",
    "10:00 PM",
    "11:00 PM",
  ];
}

export default function AvailabilityGrid({ period }: AvailabilityGridProps) {
  const timeSlots = useMemo(() => getTimeSlots(period), [period]);
  const [selectedCells, setSelectedCells] = useState<Record<string, boolean>>(
    {}
  );

  function toggleCell(day: string, time: string) {
    const key = `${day}-${time}`;

    setSelectedCells((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }

  return (
    <div className="overflow-x-auto">
      <div className="min-w-225 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div
          className="grid gap-2"
          style={{ gridTemplateColumns: "110px repeat(7, minmax(0, 1fr))" }}
        >
          <div />

          {days.map((day) => (
            <div
              key={day}
              className="text-center text-sm font-semibold text-zinc-700"
            >
              {day}
            </div>
          ))}

          {timeSlots.map((time) => (
            <div key={time} className="contents">
              <div className="flex items-center text-sm text-zinc-500">
                {time}
              </div>

              {days.map((day) => {
                const key = `${day}-${time}`;
                const isSelected = !!selectedCells[key];

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => toggleCell(day, time)}
                    className={[
                      "h-10 rounded-xl border transition",
                      isSelected
                        ? "border-purple-500 bg-purple-500"
                        : "border-zinc-200 bg-zinc-50 hover:bg-purple-50",
                    ].join(" ")}
                    aria-label={`${day} ${time}`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}