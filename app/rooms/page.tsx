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
}