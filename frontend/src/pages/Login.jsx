import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
export default function Login() {
  const { login } = useAuth(),
    nav = useNavigate(),
    [loading, setLoading] = useState(false),
    [form, setForm] = useState({ email: "", password: "" });
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await login(form);
    nav(form.email.includes("admin") ? "/admin" : "/");
  };
  return (
    <AuthPage
      title="Welcome back"
      subtitle="Sign in to keep track of the things you’re looking forward to."
    >
      <form onSubmit={submit} className="mt-8 space-y-5">
        <Field
          label="Email address"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <Field
          label="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button disabled={loading} className="btn-primary mt-2 w-full">
          {loading ? "Signing in…" : "Sign in"}
        </button>
        <p className="text-center text-sm text-muted">
          New here?{" "}
          <Link to="/register" className="font-semibold text-emerald">
            Create an account
          </Link>
        </p>
        <p className="text-center text-xs text-muted">
          Tip: use an email with “admin” to see the admin area.
        </p>
      </form>
    </AuthPage>
  );
}
export function Field({ label, ...props }) {
  return (
    <label className="block text-sm font-semibold">
      {label}
      <input required className="form-input mt-2" {...props} />
    </label>
  );
}
export function AuthPage({ title, subtitle, children }) {
  return (
    <div className="grid min-h-[calc(100vh-72px)] md:grid-cols-2">
      <div className="hidden bg-emerald p-12 text-white md:flex md:flex-col">
        <Link to="/" className="text-xl font-bold tracking-[-.06em]">
          AbroHub
        </Link>
        <div className="mt-auto">
          <p className="text-sm font-semibold tracking-widest uppercase text-[#b3d5d1]">
            Gather with intention
          </p>
          <h2 className="mt-4 max-w-sm text-4xl font-bold tracking-[-.055em]">
            The best plans begin with an invitation.
          </h2>
        </div>
      </div>
      <div className="flex items-center justify-center px-6 py-14">
        <div className="w-full max-w-md">
          <Link
            to="/"
            className="font-bold tracking-[-.06em] text-xl md:hidden"
          >
            abroHub
          </Link>
          <h1 className="mt-8 text-4xl font-bold tracking-[-.06em]">{title}</h1>
          <p className="mt-3 leading-6 text-muted">{subtitle}</p>
          {children}
        </div>
      </div>
    </div>
  );
}
