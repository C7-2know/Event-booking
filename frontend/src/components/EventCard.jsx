import { Calendar, MapPin, Tag, Bookmark } from "lucide-react";
import { Link } from "react-router-dom";

export default function EventCard({ event }) {
  return (
    <Link to={`/events/${event.id}`} className="block border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
      <div className="relative">
        <img src={event.image} alt={event.title} className="h-40 w-full object-cover" />
        <span className="absolute top-3 left-3 bg-white text-xs font-medium px-2 py-1 rounded">
          $ {event.price} 
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-medium">{event.title}</h3>
        <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
          <Calendar size={13} /> {event.date} · {event.time}
        </p>
        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
          <MapPin size={13} /> {event.location}
        </p>
        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
          <Tag size={13} /> {event.category}
        </p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-gray-600">
            {event.seatsLeft} / {event.totalSeats} seats left
          </span>
          <Bookmark size={16} className="text-gray-400" />
        </div>
      </div>
    </Link>
  );
}