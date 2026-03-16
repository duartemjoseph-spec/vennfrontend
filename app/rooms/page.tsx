
import Link from "next/link";
import Container from "@/components/Container";

const fakeRooms = [
  {
    id: "friday-game-night",
    title: "🎮 Friday Game Night",
    time: "Friday, Jan 23 • 6:00 PM - 11:00 PM",
    members: "4/6 users",
  },
  {
    id: "monday-meeting",
    title: "📅 Monday Meeting",
    time: "Monday, Jan 26 • 6:00 PM - 11:00 PM",
    members: "4/4 users",
  },
  {
    id: "taco-tuesday",
    title: "🌮 Taco Tuesday",
    time: "Tuesday, Jan 27 • 6:00 PM - 9:00 PM",
    members: "3/5 users",
  },
];

export default function RoomsPage() {
  return (
    <Container>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Rooms</h1>
          <p className="mt-1 text-sm text-zinc-500">
            View your rooms and jump into scheduling.
          </p>
        </div>

        <button className="rounded-xl bg-purple-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-600">
          + New Room
        </button>
      </div>

      <div className="space-y-4">
        {fakeRooms.map((room) => (
          <div
            key={room.id}
            className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-zinc-900">
                  {room.title}
                </h2>
                <p className="mt-1 text-sm text-zinc-500">{room.time}</p>
                <p className="mt-2 text-sm text-zinc-600">{room.members}</p>
              </div>

              <Link
                href={`/rooms/${room.id}`}
                className="inline-flex items-center justify-center rounded-xl bg-purple-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-600"
              >
                Go To Room
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );

}