import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash2, Users, Plus, Search } from "lucide-react";
import { eventService } from "../../services/eventService";
import { AdminShell } from "./Dashboard";
export default function ManageEvents() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    eventService.getAll().then(setEvents);
  }, []);
  const remove = async (id) => {
    if (confirm("Remove this event?")) {
      await eventService.remove(id);
      setEvents(events.filter((e) => e.id !== id));
    }
  };
  return (
    <AdminShell
      title="Manage events"
      subtitle="Create, review, and keep every gathering up to date."
      action={
        <Link to="/admin/events/new" className="btn-primary">
          <Plus size={17} /> New event
        </Link>
      }
    >
      <div className="border border-line bg-white">
        <div className="flex items-center gap-2 border-b border-line p-4">
          <Search size={17} className="text-muted" />
          <input
            placeholder="Search events"
            className="w-full text-sm outline-none"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[780px] text-left text-sm">
            <thead className="border-b border-line bg-[#fcfbf9] text-xs uppercase tracking-wider text-muted">
              <tr>
                <th className="p-4 font-semibold">Event</th>
                <th className="p-4 font-semibold">Category</th>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold">Price</th>
                <th className="p-4 font-semibold">Capacity</th>
                <th className="p-4 font-semibold"></th>
              </tr>
            </thead>
            <tbody>
              {events.map((e) => (
                <tr key={e.id} className="border-b border-line last:border-0">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={e.image}
                        className="h-10 w-12 object-cover"
                        alt=""
                      />
                      <span className="font-bold">{e.title}</span>
                    </div>
                  </td>
                  <td className="p-4 text-muted">{e.category}</td>
                  <td className="p-4 text-muted">{e.date}</td>
                  <td className="p-4 font-medium">${e.price}</td>
                  <td className="p-4 text-muted">{e.capacity}</td>
                  <td className="p-4">
                    <div className="flex gap-3">
                      <Link
                        title="Participants"
                        to={`/admin/events/${e.id}/participants`}
                        className="text-emerald"
                      >
                        <Users size={17} />
                      </Link>
                      <Link
                        title="Edit"
                        to={`/admin/events/${e.id}/edit`}
                        className="text-muted hover:text-emerald"
                      >
                        <Pencil size={17} />
                      </Link>
                      <button
                        title="Delete"
                        onClick={() => remove(e.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
