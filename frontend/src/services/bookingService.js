import { eventService } from "./eventService";
import client from "../api/client";

const normalizeEvent = (event) => ({
  ...event,
  id: event.id || event._id,
  date: typeof event.date === "string" ? event.date.slice(0, 10) : event.date,
  time: event.time || event.startTime,
  location:
    event.location ||
    [event.locationName, event.locationCity].filter(Boolean).join(", "),
  remaining: event.remaining ?? event.availabelSeats,
  type: event.type || event.eventType,
  address: event.address || event.locationAddress,
  city: event.city || event.locationCity,
});
const MOCK_BOOKINGS = [
  {
    id: "book-01",
    user: {
      name: "Hodan Ali",
      email: "hodan@example.com",
    },
    event: {
      id: "photo-walk",
      title: "The City in Soft Light",
      category: "Creative",
      date: "2026-09-19",
      time: "16:30",
      location: "Old Town, Hargeisa",
      price: 8,
      capacity: 25,
      remaining: 13,
      image:
        "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85",
      description:
        "A guided photo walk for curious eyes. Any camera is welcome, including the one in your pocket.",
    },
    status: "confirmed",
    bookedAt: "2026-07-20",
  },
  {
    id: "book-02",
    user: {
      name: "Hodan Ali",
      email: "hodan@example.com",
    },
    event: {
      id: "archive-session",
      title: "The Archive Session",
      category: "Music",
      date: "2026-06-11",
      time: "19:30",
      location: "The Listening Room, Hargeisa",
      price: 15,
      capacity: 70,
      remaining: 0,
      image:
        "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=1200&q=85",
      description: "A past gathering from our listening series.",
    },
    status: "attended",
    bookedAt: "2026-07-18",
  },
  {
    id: "book-03",
    user: {
      name: "Hodan Ali",
      email: "hodan@example.com",
    },
    event: {
      id: "slow-morning",
      title: "The Slow Morning",
      category: "Wellness",
      date: "2026-08-15",
      time: "09:00",
      location: "The Garden, Hargeisa",
      price: 20,
      capacity: 30,
      remaining: 5,
      image:
        "https://images.unsplash.com/photo-1501854140801-69a9c3a23cdd?auto=format&fit=crop&w=1200&q=85",
      description:
        "Start your day with a gentle yoga session and a healthy breakfast.",
    },
    status: "confirmed",
    bookedAt: "2026-07-19",
  },
];
const bookedIds = ["design-week", "archive-session", "slow-morning"];
export const bookingService = {
  getUserBookings: async (userId) => {
    const response = await client.get(`/bookings/user/${userId}`);
    const normalizedBookings = response.data.map((booking) => ({
      ...booking,
      event: normalizeEvent(booking.event),
    }));
    return normalizedBookings;
  },
  checkIfUserBookedEvent: async (userId, eventId) => {
    const response = await client.get(
      `/bookings/user/${userId}/event/${eventId}`,
    );
    const normalizedBooking = response.data
      ? {
          ...response.data,
          event: normalizeEvent(response.data.event),
        }
      : null;
    return normalizedBooking;
  },
  getEventBookings: async (eventId) => {
    const response = await client.get(`/bookings/event/${eventId}`);
    const normalizedBookings = response.data.map((booking) => ({
      ...booking,
      event: normalizeEvent(booking.event),
    }));
    return normalizedBookings;
  },

  create: async (data) => {
    const response = await client.post("/bookings", data);
    return response.data;
  },
  getParticipants: async () => [
    {
      name: "Hodan Ali",
      email: "hodan@example.com",
      booked: "Jul 22, 2026",
      status: "Confirmed",
    },
    {
      name: "Abdi Samatar",
      email: "abdi@example.com",
      booked: "Jul 20, 2026",
      status: "Confirmed",
    },
    {
      name: "Safiya Osman",
      email: "safiya@example.com",
      booked: "Jul 19, 2026",
      status: "Confirmed",
    },
    {
      name: "Yusuf Aden",
      email: "yusuf@example.com",
      booked: "Jul 17, 2026",
      status: "Waitlist",
    },
  ],
  getAll: async () => {
    const response = await client.get("/bookings");
    const normalizedBookings = response.data.map((booking) => ({
      ...booking,
      event: normalizeEvent(booking.event),
    }));
    return normalizedBookings;
  },

  cancel: async (bookingId) => {
    const response = await client.delete(`/bookings/${bookingId}`);
    return response.data;
  },
};
