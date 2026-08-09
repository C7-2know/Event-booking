// pages/admin/ManageUsers.jsx
import { useEffect, useMemo, useState } from "react";
import { Search, X, ShieldCheck, Ban, CheckCircle2 } from "lucide-react";
import { userService } from "../../services/userService";
import { useAuth } from "../../context/AuthContext";

export default function ManageUsers() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userService.getAll().then((data) => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const matchesRole = role === "all" || u.role === role;
      const matchesQuery =
        u.name.toLowerCase().includes(query.toLowerCase()) ||
        u.email.toLowerCase().includes(query.toLowerCase());
      return matchesRole && matchesQuery;
    });
  }, [users, query, role]);

  const toggleRole = async (targetUser) => {
    const nextRole = targetUser.role === "admin" ? "user" : "admin";
    const confirmed = window.confirm(
      `${nextRole === "admin" ? "Grant admin access to" : "Remove admin access from"} ${targetUser.name}?`,
    );
    if (!confirmed) return;

    setUsers((prev) =>
      prev.map((u) => (u.id === targetUser.id ? { ...u, role: nextRole } : u)),
    );
    await userService.updateRole(targetUser.id, nextRole);
  };

  const toggleStatus = async (targetUser) => {
    const nextStatus = targetUser.status === "active" ? "suspended" : "active";
    setUsers((prev) =>
      prev.map((u) =>
        u.id === targetUser.id ? { ...u, status: nextStatus } : u,
      ),
    );
    await userService.updateStatus(targetUser.id, nextStatus);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">Users</h1>
        <p className="text-sm text-gray-500">
          {filtered.length} of {users.length} users
        </p>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 flex-1 min-w-[220px] max-w-sm bg-white">
          <Search size={15} className="text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or email…"
            className="flex-1 text-sm outline-none"
          />
          {query && (
            <button onClick={() => setQuery("")}>
              <X size={14} className="text-gray-400" />
            </button>
          )}
        </div>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 bg-white"
        >
          <option value="all">All roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </div>

      <div className="mt-5 bg-white border border-gray-100 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-400 text-xs uppercase bg-gray-50">
              <th className="px-5 py-3 font-medium">User</th>
              <th className="px-5 py-3 font-medium">Role</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Joined</th>
              <th className="px-5 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td
                  colSpan={5}
                  className="px-5 py-10 text-center text-gray-400"
                >
                  Loading users…
                </td>
              </tr>
            )}

            {!loading && filtered.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-5 py-10 text-center text-gray-400"
                >
                  No users match your search.
                </td>
              </tr>
            )}

            {!loading &&
              filtered.map((u) => {
                const isSelf = u.id === currentUser?.id;
                return (
                  <tr key={u.id} className="border-t border-gray-50">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center justify-center shrink-0">
                          {u.name
                            .split(" ")
                            .map((x) => x[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                        </div>
                        <div>
                          <p className="text-gray-900 font-medium">
                            {u.name}
                            {isSelf && " (you)"}
                          </p>
                          <p className="text-xs text-gray-400">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`text-xs px-2 py-1 rounded-full capitalize ${
                          u.role === "admin"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`text-xs px-2 py-1 rounded-full capitalize ${
                          u.status === "active"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        {u.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-gray-500">{u.joined}</td>
                    <td className="px-5 py-3">
                      <div className="flex justify-end gap-4">
                        <button
                          disabled={isSelf}
                          onClick={() => toggleRole(u)}
                          title={isSelf ? "You can't change your own role" : ""}
                          className="flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-emerald-700 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <ShieldCheck size={14} />
                          {u.role === "admin" ? "Demote" : "Make admin"}
                        </button>
                        <button
                          disabled={isSelf}
                          onClick={() => toggleStatus(u)}
                          className="flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-red-600 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          {u.status === "active" ? (
                            <Ban size={14} />
                          ) : (
                            <CheckCircle2 size={14} />
                          )}
                          {u.status === "active" ? "Suspend" : "Activate"}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
