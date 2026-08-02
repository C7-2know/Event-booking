import { Search, ArrowRight, Calendar } from "lucide-react";

export default function Hero({ query, setQuery }) {
  const numberOfEvents = 100; // Replace with the actual number of events from your data source
  return (
    <div className="relative h-[400px] w-full flex gap-40">
      <div className="flex flex-col justify-center">
        <h1 className="text-4xl font-semibold">
          Discover <span className="text-emerald-700">events</span> worth being part of.
        </h1>
        <p className="mt-3 text-gray-500">
          Find local events, connect with people and create memorable experiences.
        </p>
        <div className="mt-10 flex max-w-xl items-center border border-gray-200 bg-white p-1 rounded-full">
          <Search className="ml-3 text-emerald-700" size={19} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by theme, place or feeling"
            className="min-w-0 flex-1 px-3 py-2 text-sm outline-none"
          />
          <button className="flex items-center gap-1 bg-emerald-800 text-white text-sm px-5 py-2 rounded-full">
            Find <ArrowRight size={17} />
          </button>
        </div>
      </div>
      <div className="relative ">
        <span className="absolute bottom-10 right-3 bg-white text-xs font-medium px-2 py-1 rounded">
          <Calendar className="text-green-700"/> {numberOfEvents}+ events
          <p className="text-gray-500">This week</p>
        </span>
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1470&q=80"
          alt=""
          className="h-[400px] w-full object-cover"
        />
      </div>
      
    </div>
  );
}