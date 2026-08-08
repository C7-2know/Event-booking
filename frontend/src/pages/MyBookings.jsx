// pages/MyBookings.jsx
import { useEffect, useMemo, useState } from "react";
import { bookingService } from "../services/bookingService";
import BookingRow from "../components/BookingRow";
import EmptyState from "../components/EmptyState";
import { useAuth } from "../context/AuthContext";

const TABS = ["upcoming", "past", "all"];

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const { user } = useAuth();
  const [filter, setFilter] = useState("upcoming");

  useEffect(() => {
    async function fetchBookings() {
      try {
        const data = await bookingService.getUserBookings(user.id);
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    }
    fetchBookings();
  }, [user.id]);

  const now = new Date();

  const counts = useMemo(() => {
    return {
      upcoming: bookings.filter((b) => new Date(b.event.date) >= now).length,
      past: bookings.filter((b) => new Date(b.event.date) < now).length,
      all: bookings.length,
    };
  }, [bookings]);

  const result = useMemo(() => {
    return bookings
      .filter((b) => {
        if (filter === "all") return true;
        const isUpcoming = new Date(b.event.date) >= now;
        return filter === "upcoming" ? isUpcoming : !isUpcoming;
      })
      .sort((a, b) => new Date(a.event.date) - new Date(b.event.date));
  }, [bookings, filter]);

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-2xl font-semibold text-gray-900">My Bookings</h1>
      <p className="mt-1 text-sm text-gray-500">
        Manage your upcoming and past events.
      </p>

      <div className="mt-8 flex items-center justify-between border-b border-gray-100">
        <div className="flex gap-6">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`pb-3 text-md font-medium capitalize border-b-2 -mb-px ${
                filter === tab
                  ? "border-emerald-700 text-green-800"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab} {tab !== "all" && `(${counts[tab]})`}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        {result.map((booking) => (
          <BookingRow key={booking.id} booking={booking} now={now} />
        ))}
      </div>

      {!result.length && (
        <div className="mt-10">
          <EmptyState
            title="Nothing here yet"
            text={
              filter === "past"
                ? "Your past events will appear here."
                : "Your upcoming plans will appear here."
            }
          />
        </div>
      )}
    </div>
  );
}
