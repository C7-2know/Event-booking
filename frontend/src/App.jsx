import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AppLayout from "./layouts/AppLayout";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EventDetails from "./pages/EventDetails";
import MyBookings from "./pages/MyBookings";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/admin/Dashboard";
import ManageEvents from "./pages/admin/ManageEvents";
import EventForm from "./pages/admin/EventForm";
import Participants from "./pages/admin/Participants";
import ManageBookings from "./pages/admin/ManageBookings";
import ManageUsers from "./pages/admin/ManageUsers";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/events/:eventId" element={<EventDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/bookings" element={<MyBookings />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route element={<ProtectedRoute adminOnly />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<Dashboard />} />
              <Route path="/admin/events" element={<ManageEvents />} />
              <Route path="/admin/events/new" element={<EventForm />} />
              <Route
                path="/admin/events/:eventId/edit"
                element={<EventForm />}
              />
              <Route
                path="/admin/events/:eventId/participants"
                element={<Participants />}
              />
              <Route path="/admin/bookings" element={<ManageBookings />} />
              <Route path="/admin/users" element={<ManageUsers />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
