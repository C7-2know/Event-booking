import { Leaf, Users, CalendarCheck, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { icon: CalendarCheck, label: "Events hosted", value: "150+" },
  { icon: Users, label: "Community members", value: "4,500+" },
  { icon: MapPin, label: "Cities covered", value: "12" },
];

const values = [
  {
    title: "Real connection",
    text: "Every event on AbroHub is a chance to meet people who share your interests — not just another listing to scroll past.",
  },
  {
    title: "Local first",
    text: "We highlight organizers and venues in your own city, so discovering something new doesn't mean traveling far to find it.",
  },
  {
    title: "Simple to use",
    text: "Finding, booking, and managing your events should take minutes, not tabs full of confusing forms.",
  },
];

export default function About() {
  return (
    <div>
      {/* Hero */}
      <div className="max-w-7xl mx-auto px-8 py-16 text-center">
        <div className="inline-flex items-center gap-2 text-sm font-medium text-green-700 bg-emerald-50 px-3 py-1 rounded-full">
          <Leaf size={24} />
          About AbroHub
        </div>
        <h1 className="mt-5 text-4xl md:text-5xl font-semibold text-green-900 max-w-2xl mx-auto">
          Discover events worth being part of.
        </h1>
        <p className="mt-4 text-gray-700 max-w-xl mx-auto leading-7">
          AbroHub connects people with the local events, workshops, and
          gatherings that make a community feel like one. We started with a
          simple idea: showing up somewhere new shouldn't be complicated.
        </p>
      </div>

      {/* Stats */}
      <div className="border-y border-gray-100 bg-[#faf9f6]">
        <div className="max-w-7xl mx-auto px-8 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {stats.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="flex items-center gap-4 justify-center sm:justify-start"
            >
              <div className="h-11 w-11 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                <Icon size={20} className="text-green-700" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-gray-900">{value}</p>
                <p className="text-sm text-gray-500">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission */}
      <div className="max-w-4xl mx-auto px-8 py-16">
        <h2 className="text-2xl font-semibold text-gray-900">Our mission</h2>
        <p className="mt-4 text-gray-600 leading-7">
          Too many good events go unnoticed, buried in group chats or lost
          between platforms that weren't built for discovery. AbroHub exists to
          fix that — a single place to find what's happening nearby, whether
          it's a tech summit, a neighborhood clean-up, or a quiet evening of
          live music. We work with organizers of every size to make their events
          easy to find, and easy to say yes to.
        </p>
      </div>

      {/* Values */}
      <div className="bg-[#faf9f6] border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-8 py-16">
          <h2 className="text-2xl font-semibold text-green-900 text-center">
            What we care about
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {values.map(({ title, text }) => (
              <div
                key={title}
                className="bg-white border border-gray-100 rounded-xl p-6"
              >
                <h3 className="font-medium text-gray-900">{title}</h3>
                <p className="mt-2 text-sm text-gray-700 leading-6">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-8 py-16 text-center">
        <h2 className="text-2xl font-semibold text-gray-900">
          Ready to find your next event?
        </h2>
        <p className="mt-3 text-gray-500">
          Browse what's happening near you, or create an account to start
          booking.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            to="/"
            className="px-5 py-2.5 rounded-lg bg-green-800 text-white text-sm font-medium hover:bg-green-900"
          >
            Explore events
          </Link>
          <Link
            to="/register"
            className="px-5 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
}
