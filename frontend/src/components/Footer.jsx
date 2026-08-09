import { Leaf, Facebook, Instagram, Twitter, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const exploreLinks = [
  { label: "All Events", to: "/" },
  { label: "Technology", to: "/?category=Technology" },
  { label: "Music", to: "/?category=Music" },
  { label: "Community", to: "/?category=Community" },
];

const companyLinks = [
  { label: "About", to: "/about" },
  { label: "Create an Event", to: "/admin/events/new" },
  { label: "My Bookings", to: "/bookings" },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-[#faf9f6] mt-16">
      <div className="max-w-7xl mx-auto px-8 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-between">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 font-semibold text-lg text-gray-900">
            <Leaf size={20} className="text-green-700" />
            AbroHub
          </div>
          <p className="mt-3 text-sm text-gray-500 max-w-xs">
            Discover events worth being part of. Find local events, connect with
            people, and create memorable experiences.
          </p>
          <div className="flex gap-3 mt-5">
            <a
              href="#"
              aria-label="Facebook"
              className="text-green-700 hover:text-green-700"
            >
              <Facebook size={18} />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="text-green-700 hover:text-green-700"
            >
              <Instagram size={18} />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="text-green-700 hover:text-green-700"
            >
              <Twitter size={18} />
            </a>
          </div>
        </div>

        {/* Explore */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-4">Explore</h4>
          <ul className="space-y-2">
            {exploreLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="text-sm text-gray-500 hover:text-emerald-700"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        {/* <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-4">AbroHub</h4>
                <ul className="space-y-2">
                    {companyLinks.map((link) => (
                    <li key={link.label}>
                        <Link to={link.to} className="text-sm text-gray-500 hover:text-emerald-700">
                        {link.label}
                        </Link>
                    </li>
                    ))}
                </ul>
            </div> */}

        {/* Contact */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-4">
            Get in touch
          </h4>
          <a
            href="mailto:hello@abrohub.com"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-700"
          >
            <Mail size={15} />
            hello@abrohub.com
          </a>
        </div>
      </div>

      <div className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-8 py flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} AbroHub. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-gray-400">
            <Link to="/privacy" className="hover:text-emerald-700">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-emerald-700">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
