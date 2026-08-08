import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, X } from "lucide-react";
import { bookingService } from "../../services/bookingService";

const STATUS_STYLES = {
  confirmed: "bg-emerald-50 text-emerald-700",
  cancelled: "bg-red-50 text-red-600",
  pending: "bg-amber-50 text-amber-700",
};

export default function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    bookingService.getAll().then((data) => {
      setBookings(data);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    return bookings.filter((b) => {
      const matchesStatus = status === "all" || b.status === status;
      const matchesQuery =
        b.user.name.toLowerCase().includes(query.toLowerCase()) ||
        b.event.title.toLowerCase().includes(query.toLowerCase());
      return matchesStatus && matchesQuery;
    });
  }, [bookings, query, status]);

  const handleCancel = async (bookingId) => {
    const confirmed = window.confirm(
      "Cancel this booking? This can't be undone.",
    );
    if (!confirmed) return;

    // optimistic update — reflect the change immediately, don't wait on the network
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: "cancelled" } : b)),
    );

    try {
      await bookingService.cancel(bookingId);
    } catch {
      // roll back if the request actually failed
      bookingService.getAll().then(setBookings);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">Bookings</h1>
        <p className="text-sm text-gray-500">
          {filtered.length} of {bookings.length} bookings
        </p>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 flex-1 min-w-[220px] max-w-sm bg-white">
          <Search size={15} className="text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by user or event…"
            className="flex-1 text-sm outline-none"
          />
          {query && (
            <button onClick={() => setQuery("")}>
              <X size={14} className="text-gray-400" />
            </button>
          )}
        </div>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 bg-white"
        >
          <option value="all">All statuses</option>
          <option value="confirmed">Confirmed</option>
          <option value="pending">Pending</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="mt-5 bg-white border border-gray-100 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-400 text-xs uppercase bg-gray-50">
              <th className="px-5 py-3 font-medium">User</th>
              <th className="px-5 py-3 font-medium">Event</th>
              <th className="px-5 py-3 font-medium">Seats</th>
              <th className="px-5 py-3 font-medium">Booked</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-10 text-center text-gray-400"
                >
                  Loading bookings…
                </td>
              </tr>
            )}

            {!loading && filtered.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-10 text-center text-gray-400"
                >
                  No bookings match your search.
                </td>
              </tr>
            )}

            {!loading &&
              filtered.map((b) => (
                <tr key={b.id} className="border-t border-gray-50">
                  <td className="px-5 py-3">
                    <p className="text-gray-900 font-medium">{b.user.name}</p>
                    <p className="text-xs text-gray-400">{b.user.email}</p>
                  </td>
                  <td className="px-5 py-3">
                    <Link
                      to={`/events/${b.event.id}`}
                      className="text-gray-700 hover:text-emerald-700"
                    >
                      {b.event.title}
                    </Link>
                    <p className="text-xs text-gray-400">{b.event.date}</p>
                  </td>
                  <td className="px-5 py-3 text-gray-500">{b.seats ?? 1}</td>
                  <td className="px-5 py-3 text-gray-500">{b.bookedAt}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`text-xs px-2 py-1 rounded-full capitalize ${STATUS_STYLES[b.status]}`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    {b.status !== "cancelled" && (
                      <button
                        onClick={() => handleCancel(b.id)}
                        className="text-xs font-medium text-red-500 hover:text-red-700"
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
