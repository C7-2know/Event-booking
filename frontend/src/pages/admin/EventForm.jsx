import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { eventService } from "../../services/eventService";
import { AdminShell } from "./Dashboard";
export default function EventForm() {
  const { eventId } = useParams(),
    nav = useNavigate(),
    [form, setForm] = useState({
      title: "",
      category: "Design",
      date: "",
      startTime: "",
      endTime: "",
      event_type: "Indoor",
      locationName: "",
      address: "",
      city: "",
      price: "",
      capacity: "",
      remaining: "",
      description: "",
      image: "",
    });
  useEffect(() => {
    if (eventId) eventService.getById(eventId).then((e) => e && setForm(e));
  }, [eventId]);
  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const submit = async (e) => {
    e.preventDefault();
    eventId
      ? await eventService.update(eventId, form)
      : await eventService.create(form);
    nav("/admin/events");
  };
  return (
    <AdminShell
      title={eventId ? "Edit event" : "Create a new event"}
      subtitle="Use clear details to help people confidently make plans."
    >
      <form
        onSubmit={submit}
        className="max-w-3xl space-y-6 border border-line bg-white p-6 md:p-8"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Input
            label="Event title"
            name="title"
            value={form.title}
            onChange={change}
          />
          <label className="block text-sm font-semibold">
            Category
            <select
              name="category"
              value={form.category}
              onChange={change}
              className="form-input mt-2"
            >
              <option>Design</option>
              <option>Business</option>
              <option>Culture</option>
              <option>Wellness</option>
              <option>Food</option>
              <option>Music</option>
              <option>Community & Charity</option>
              <option>Other</option>
            </select>
          </label>
          <Input
            label="Date"
            name="date"
            type="date"
            value={form.date}
            onChange={change}
          />
          <Input
            label="Start Time"
            name="startTime"
            type="time"
            value={form.startTime}
            onChange={change}
          />
          <Input
            label="End Time"
            name="endTime"
            type="time"
            value={form.endTime}
            onChange={change}
          />
          <Input
            label="Location Name"
            name="locationName"
            value={form.locationName}
            onChange={change}
          />
          <Input label="City" name="city" value={form.city} onChange={change} />
          <Input
            label="Address"
            name="address"
            value={form.address}
            onChange={change}
          />
          <Input
            label="Ticket price ($)"
            name="price"
            type="number"
            value={form.price}
            onChange={change}
          />
          <label className="block text-sm font-semibold">
            Event Type
            <select
              name="event_type"
              value={form.event_type}
              onChange={change}
              className="form-input mt-2"
            >
              <option>Indoor</option>
              <option>Outdoor</option>
              <option>Online</option>
            </select>
          </label>
          <Input
            label="Capacity"
            name="capacity"
            type="number"
            value={form.capacity}
            onChange={change}
          />
          <Input
            label="Remaining seats"
            name="remaining"
            type="number"
            value={form.remaining}
            onChange={change}
          />
        </div>
        <Input
          label="Image URL"
          name="image"
          value={form.image}
          onChange={change}
        />
        <label className="block text-sm font-semibold">
          Description
          <textarea
            name="description"
            value={form.description}
            onChange={change}
            className="form-input mt-2 min-h-32 resize-y"
          />
        </label>
        <div className="flex gap-3 pt-2">
          <button className="btn-primary">
            {eventId ? "Save changes" : "Create event"}
          </button>
          <button
            type="button"
            onClick={() => nav("/admin/events")}
            className="btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </AdminShell>
  );
}
function Input({ label, ...props }) {
  return (
    <label className="block text-sm font-semibold">
      {label}
      <input required className="form-input mt-2" {...props} />
    </label>
  );
}
