import {
  Menu,
  X,
  CalendarDays,
  ChevronDown,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Bell, Leaf } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
const linkClass = ({ isActive }) =>
  `text-sm font-medium transition ${isActive ? "text-emerald" : "text-muted hover:text-ink"}`;
const navItems = [
  { label: "Explore", path: "/" },
  { label: "My Bookings", path: "/bookings" },
  { label: "Profile", path: "/profile" },
  { label: "Admin", path: "/admin", adminOnly: true },
  { label: "About", path: "/about" },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <header className="flex items-center justify-between px-8 py-4 border-b border-gray-100">
      <div className="flex items-center gap-2 font-bold text-lg">
        <Leaf size={20} className="text-green-700" />
        AbroHub
      </div>

      <nav className="flex gap-8">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `pb-1 text-md font-bold ${
                isActive
                  ? "text-green-700 border-b-2 border-green-700"
                  : "text-gray-900 hover:text-gray-800"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <Bell size={18} className="text-gray-500" />
        <button className="flex items-center gap-2 bg-green-800 text-white text-sm px-4 py-2 rounded-lg">
          <span>{user?.name || "User"}</span>
        </button>
        <LogOut
          size={18}
          className="text-green-200 cursor-pointer"
          onClick={logout}
        />
      </div>
    </header>
  );
}
