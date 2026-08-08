import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Users,
  DollarSign,
  ArrowLeft,
  Heart,
  Share2,
  Check,
} from "lucide-react";
import { eventService } from "../services/eventService";
import { bookingService } from "../services/bookingService";
import { useAuth } from "../context/AuthContext";

export default function EventDetails({ event: initialEvent = null }) {
  const { eventId } = useParams();
  const { user } = useAuth();

  const [event, setEvent] = useState(initialEvent);
  const [booked, setBooked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    if (!event) {
      eventService.getById(eventId).then(setEvent);
    }

    async function checkBooking() {
      if (user) {
        const booking = await bookingService.checkIfUserBookedEvent(
          user.id,
          eventId,
        );
        setBooking(booking);
        setBooked(!!booking);
      }
    }

    checkBooking();
  }, [eventId, event]);

  if (!event) {
    return (
      <div className="max-w-7xl mx-auto py-24 text-center text-gray-400">
        Loading event…
      </div>
    );
  }

  const register = async () => {
    if (!user) {
      window.location.href = "/login";
      return;
    }
    await bookingService.create({ event: event.id });
    setBooked(true);
  };

  const cancelBooking = async () => {
    const cancelled = await bookingService.cancel(booking._id);
    setBooked(false);
    setBooking(null);
  };

  const date = new Date(`${event.date}T12:00`).toLocaleDateString("en", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="max-w-7xl mx-auto py-6">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800"
      >
        <ArrowLeft size={16} /> Back to events
      </Link>

      <div className="relative mt-4">
        <img
          src={event.image}
          alt=""
          className="h-[270px] md:h-[420px] w-full object-cover rounded-xl"
        />
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => setSaved((s) => !s)}
            aria-label="Save event"
            className="h-9 w-9 rounded-full bg-white/90 flex items-center justify-center shadow"
          >
            <Heart
              size={16}
              className={
                saved ? "fill-emerald-700 text-emerald-700" : "text-gray-600"
              }
            />
          </button>
          <button
            aria-label="Share event"
            className="h-9 w-9 rounded-full bg-white/90 flex items-center justify-center shadow"
          >
            <Share2 size={16} className="text-gray-600" />
          </button>
        </div>
      </div>

      <div className="grid gap-12 p-10 lg:grid-cols-[1.25fr_.75fr] lg:items-center">
        {/* Left column */}
        <article>
          <div className="flex gap-2">
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-orange-50 text-green-800">
              {event.category}
            </span>
            {event.type && (
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-green-600">
                {event.type}
              </span>
            )}
          </div>

          <h1 className="mt-4 text-3xl md:text-4xl font-semibold text-gray-900">
            {event.title}
          </h1>
          <p className="mt-4 max-w-2xl text-gray-600 leading-7">
            {event.description}
          </p>

          <div className="mt-10 border-t border-gray-100 pt-6">
            <div className="grid gap-5 sm:grid-cols-1">
              <Info icon={CalendarDays} label="Date" text={date} />
              <Info icon={Clock3} label="Time" text={`${event.time} onwards`} />
              <Info icon={MapPin} label="Location" text={event.location} />
              <Info
                icon={DollarSign}
                label="Price"
                text={`$${event.price.toFixed(2)}`}
              />
              <Info
                icon={Users}
                label="Seats Left"
                text={`${event.remaining} / ${event.capacity}`}
              />
            </div>
          </div>

          <div className="bg-green-50/50 mt-10 rounded-xl p-5">
            <div className="mt-8 rounded-xl bg-emerald-50/60 p-5">
              <h2 className="text-sm font-semibold text-gray-900">
                About this event
              </h2>
              <p className="mt-2 text-sm text-gray-600 leading-6">
                {event.about ?? event.description}
              </p>
            </div>

            {event.organizer && (
              <div className="mt-8">
                <h2 className="text-sm font-semibold text-gray-900 mb-3">
                  Organizer
                </h2>
                <div className="flex items-center gap-3">
                  <img
                    src={event.organizer.avatar}
                    alt={event.organizer.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {event.organizer.name}
                    </p>
                    <Link
                      to={`/organizers/${event.organizer.id}`}
                      className="text-xs text-green-700 hover:underline"
                    >
                      View organizer profile
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </article>

        {/* Right column */}
        <aside className="relative h-fit border border-gray-100 rounded-xl bg-white p-6 lg:sticky lg:top-24 shadow-sm">
          <div className="flex flex-col gap-3">
            <button
              disabled={booked || !event.remaining}
              onClick={register}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-green-800 text-white py-2.5 text-md font-medium disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              {booked ? (
                <>
                  <Check size={16} /> You're registered
                </>
              ) : event.remaining ? (
                "Register Now"
              ) : (
                "Sold out"
              )}
            </button>

            {booked && (
              <button
                onClick={cancelBooking}
                className="w-full rounded-lg border border-red-200 py-2.5 text-md font-medium text-red-700 hover:bg-red-50"
              >
                Cancel Booking
              </button>
            )}

            <button
              onClick={() => setSaved((s) => !s)}
              className="w-full rounded-lg border border-gray-200 py-2.5 text-md font-medium text-gray-700 hover:bg-green-50"
            >
              {saved ? "Saved" : "Save Event"}
            </button>
          </div>

          <p className="mt-4 text-center text-xs text-green-600 leading-5">
            You'll receive a confirmation email with all the details.
          </p>
        </aside>
      </div>
    </div>
  );
}

function Info({ icon: Icon, label, text }) {
  return (
    <div className="flex gap-3">
      <Icon size={18} className="mt-0.5 text-green-700" />
      <div className="flex flex-col">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-600">
          {label}
        </p>
        <p className="mt-1 text-md font-medium text-gray-900">{text}</p>
      </div>
    </div>
  );
}
