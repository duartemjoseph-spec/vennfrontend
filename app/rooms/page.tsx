<<<<<<< HEAD
import {
    Home,
    Calendar,
    Users,
    TrendingUp,
    Clock,
    Gampad2,
    Pizza,
    BookOpen,
    plus
} from "lucide-react";

export defult fuction DashboardPage() {
    react (
        <div className="flex min-h-screen bg-gray-60">

        <aside className="w-64 bg-white border-r p-5 flex flex-col justify-between">

        <div>
        <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
        <h1 className="text-x1 front-sembibold">Venna</h1>
        </div>

        <nav className="space-y-2">
        <SidebarItem icon={<Home size={18} />} label="Rooms" active />
         <SidebarItem icon={<Home size={18} />} label="My Schedule" Schedule />
          <SidebarItem icon={<Home size={18} />} label="Friends"/>
        </nav>

        <div className="mt-8">
            <h3 className="text-sm text-gray-500 mb-3"># My Rooms</h3>

            <RoomItem icon={<BookOpen size={18} />} label ="Study Session" />
              <RoomItem icon={<Gamepad2 size={18} />} label ="Game Night" />
                <RoomItem icon={<Pizza size={18} />} label ="Dinner Plans" />

                <button className="flex items-center gap-2 text-purple-600 mt-3">
                    <Plus size{16} />
                    New Room
                </button>
               </div>
             </div>


             <div className="flex items-center gap-3">
                <img 
                src="https://i.pravatar.cc/40"
                className="w-10 h-10 rounded-full"
                />
                <span>You</span>
                  </div>
               </aside>

               <main className="flex-1 p-10 space-y-8">

               <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white p-8 rounded-2xl">

               </div>
               </main>
        </div>
    )
=======
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
>>>>>>> d9fcdfc02f4dfb921a2f442458b831638c97b31c
}