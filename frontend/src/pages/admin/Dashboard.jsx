// pages/admin/Dashboard.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  Ticket,
  Clock,
  Users,
  Pencil,
  Trash2,
} from "lucide-react";
import { eventService } from "../../services/eventService";
import StatCard from "../../components/StatCard";
import mockEvents from "../../data/mockEvents";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [recentEvents, setRecentEvents] = useState([]);

  const fetchStats = async () => {
    try {
      const stat_data = {
        totalEvents: 10,
        totalBookings: 50,
        upcomingEvents: 5,
        totalUsers: 100,
      };
      setStats(stat_data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const fetchRecentEvents = async () => {
    try {
      const recent_events = mockEvents.slice(0, 5);
      setRecentEvents(recent_events);
    } catch (error) {
      console.error("Error fetching recent events:", error);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchRecentEvents();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
        <Link
          to="/admin/events"
          className="text-sm text-emerald-700 hover:underline"
        >
          View all events →
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <StatCard
          icon={CalendarDays}
          label="Total Events"
          value={stats?.totalEvents}
        />
        <StatCard
          icon={Ticket}
          label="Total Bookings"
          value={stats?.totalBookings}
        />
        <StatCard
          icon={Clock}
          label="Upcoming Events"
          value={stats?.upcomingEvents}
        />
        <StatCard icon={Users} label="Total Users" value={stats?.totalUsers} />
      </div>

      <div className="mt-8 bg-white border border-gray-100 rounded-xl">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">Recent Events</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-600 text-md uppercase">
              <th className="px-5 py-3 font-medium">Event</th>
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium">Category</th>
              <th className="px-5 py-3 font-medium">Price</th>
              <th className="px-5 py-3 font-medium">Seats</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {recentEvents.map((event) => (
              <tr key={event.id} className="border-t border-gray-100 -md">
                <td className="px-5 py-3 flex items-center gap-2">
                  <img
                    src={event.image}
                    alt=""
                    text
                    className="h-14 w-14 rounded object-cover"
                  />
                  <span className="text-gray-900 font-semibold">
                    {event.title}
                  </span>
                </td>
                <td className="px-5 py-3 text-gray-600 font-semibold">
                  {event.date}
                </td>
                <td className="px-5 py-3 text-gray-600 font-semibold">
                  {event.category}
                </td>
                <td className="px-5 py-3 text-gray-600 font-semibold">
                  {event.price > 0 ? `Br ${event.price}` : "Free"}
                </td>
                <td className="px-5 py-3 text-gray-600 font-semibold">
                  {event.remaining} / {event.capacity}
                </td>
                <td className="px-5 py-3">
                  <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-emerald-700">
                    Upcoming
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex justify-end gap-3">
                    <Link
                      to={`/admin/events/${event.id}/edit`}
                      className="text-gray-800 hover:text-green-700"
                    >
                      <Pencil size={15} />
                    </Link>
                    <button className="text-red-600 hover:text-red-700">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function AdminShell({ title, subtitle, children, action }) {
  return (
    <div className="page-wrap py-10 md:py-14">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="eyebrow">Admin workspace</p>
          <h1 className="mt-2 text-3xl font-bold tracking-[-.06em] md:text-4xl">
            {title}
          </h1>
          {subtitle && <p className="mt-3 text-muted">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}
