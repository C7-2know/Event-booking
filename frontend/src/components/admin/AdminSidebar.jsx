// components/admin/AdminSidebar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, CalendarDays, Ticket, Users, Tag, FileBarChart, Settings, LogOut, Leaf } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { label: "Dashboard", to: "/admin", icon: LayoutDashboard, end: true },
  { label: "Events", to: "/admin/events", icon: CalendarDays },
  { label: "Bookings", to: "/admin/bookings", icon: Ticket },
  { label: "Users", to: "/admin/users", icon: Users },
  { label: "Categories", to: "/admin/categories", icon: Tag },
  { label: "Reports", to: "/admin/reports", icon: FileBarChart },
  { label: "Settings", to: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="w-60 shrink-0 border-r border-gray-100 bg-white flex flex-col justify-between py-6 px-4 min-h-screen">
      <div>
        <div className="flex items-center gap-2 px-2 font-semibold text-gray-900">
          <Leaf size={20} className="text-emerald-700" />
          AbroHub Admin
        </div>

        <nav className="mt-8 flex flex-col gap-1">
          {navItems.map(({ label, to, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${
                  isActive
                    ? "bg-emerald-800 text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`
              }
            >
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-500 hover:text-red-600"
      >
        <LogOut size={17} />
        Log out
      </button>
    </aside>
  );
}