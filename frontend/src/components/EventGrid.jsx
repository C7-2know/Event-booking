import EventCard from "./EventCard";

export default function EventGrid({ events }) {
  if (events.length === 0) {
    return <p className="mt-10 text-center text-gray-400">No events match your search.</p>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6 ">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}