import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";
import { bookingService } from "../../services/bookingService";
import { eventService } from "../../services/eventService";
import { AdminShell } from "./Dashboard";
export default function Participants() {
  const { eventId } = useParams(),
    [people, setPeople] = useState([]),
    [event, setEvent] = useState();
  useEffect(() => {
    bookingService.getParticipants().then(setPeople);
    eventService.getById(eventId).then(setEvent);
  }, [eventId]);
  return (
    <AdminShell
      title="Participants"
      subtitle={event ? event.title : "Loading event…"}
      action={
        <button className="btn-secondary">
          <Download size={16} /> Export CSV
        </button>
      }
    >
      <Link
        to="/admin/events"
        className="mb-5 inline-flex items-center gap-2 text-sm text-muted"
      >
        <ArrowLeft size={16} /> Back to events
      </Link>
      <div className="border border-line bg-white">
        <div className="flex justify-between border-b border-line p-5">
          <p className="font-bold">Registered guests</p>
          <p className="text-sm text-muted">{people.length} shown</p>
        </div>
        <div className="divide-y divide-line">
          {people.map((p, i) => (
            <div key={p.email} className="flex items-center gap-4 p-5">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[#e6f0ee] text-xs font-bold text-emerald">
                {p.name
                  .split(" ")
                  .map((x) => x[0])
                  .join("")}
              </span>
              <div className="flex-1">
                <p className="font-semibold">{p.name}</p>
                <p className="mt-1 text-xs text-muted">
                  {p.email} · booked {p.booked}
                </p>
              </div>
              <span
                className={`text-xs font-semibold ${p.status === "Confirmed" ? "text-emerald" : "text-terra"}`}
              >
                {p.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
