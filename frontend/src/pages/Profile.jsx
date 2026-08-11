import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { userService } from "../services/userService";
export default function Profile() {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({ ...user }),
    [saved, setSaved] = useState(false);
  const save = (e) => {
    e.preventDefault();
    setUser(form);
    userService.updateProfile(user.id, form).then(() => {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  };
  return (
    <div className="page-wrap max-w-4xl py-12 md:py-16">
      <p className="eyebrow">Account</p>
      <h1 className="mt-2 text-4xl font-bold tracking-[-.06em]">
        Your profile
      </h1>
      <div className="mt-10 grid gap-10 md:grid-cols-[180px_1fr]">
        <div>
          <div className="grid h-24 w-24 place-items-center rounded-full bg-[#dcece9] text-2xl font-bold text-emerald">
            {user.avatar}
          </div>
          <p className="mt-4 text-sm text-muted">Member since {user.joined}</p>
        </div>
        <form
          onSubmit={save}
          className="max-w-lg space-y-5 border-t border-line pt-6"
        >
          <label className="block text-sm font-semibold">
            Full name
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="form-input mt-2"
            />
          </label>
          <label className="block text-sm font-semibold">
            Email address
            <input
              value={form.email}
              disabled
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="form-input mt-2"
            />
          </label>
          <label className="block text-sm font-semibold">
            Bio{" "}
            <textarea
              value={form.bio || ""}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              rows="4"
              placeholder="A few words about you"
              className="form-input mt-2 resize-none"
            />
          </label>
          <button className="btn-primary">Save changes</button>
          {saved && (
            <span className="ml-4 text-sm text-emerald">
              Saved successfully
            </span>
          )}
        </form>
      </div>
    </div>
  );
}
