// components/BookingRow.jsx
import { Link } from "react-router-dom";
import { MapPin, ChevronRight, Clock } from "lucide-react";

export default function BookingRow({ booking, now }) {
  const { event } = booking;
  const eventDate = new Date(event.date);
  const daysLeft = Math.ceil((eventDate - now) / 86400000);
  const isUpcoming = daysLeft >= 0;

  const month = eventDate.toLocaleDateString("en", { month: "short" }).toUpperCase();
  const day = eventDate.getDate();

  return (
    <Link
      to={`/events/${event.id}`}
      className="flex items-center gap-4 border border-gray-100 rounded-xl p-3 hover:shadow-sm transition"
    >
      <img src={event.image} alt="" className="h-28 w-28 rounded-lg object-cover shrink-0" />
        <div className="flex flex-col items-center justify-center gap-0.5 w-14 mx-2 ">
            <p className="mt-0.5 text-lg text-red-600 font-bold">
            {month}
            </p>
            <p className="text-2xl font-semibold text-gray-900">
                {day} 
            </p>
        </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{event.title}</p>
        <p className="mt-1 text-xs text-gray-500 flex items-center gap-1 truncate">
          <MapPin size={12} /> {event.location}
        </p>
        <p className="mt-1 text-xs text-gray-500 flex items-center gap-1 truncate">
            <Clock size={12} /> {event.time}
        </p>
      </div>

      {isUpcoming && (
        <div className="text-center bg-emerald-50 rounded-lg px-3 py-1.5 shrink-0">
          <p className="text-sm font-semibold text-emerald-800">{daysLeft}</p>
          <p className="text-[10px] text-emerald-700">days left</p>
        </div>
      )}

      <ChevronRight size={28} className="text-green-700 shrink-0" />
    </Link>
  );
}