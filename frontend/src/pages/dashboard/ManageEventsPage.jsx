import { useEffect, useState } from "react";
import { createEvent, deleteEvent, fetchEvents, updateEvent } from "../../services/eventService";
import { fetchClubs } from "../../services/clubService";
import { useAuth } from "../../context/AuthContext";

const emptyForm = {
  title: "",
  description: "",
  category: "",
  date: "",
  venue: "",
  club: "",
  maxAttendees: 300
};

const formatDateTimeLocal = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60000);
  return localDate.toISOString().slice(0, 16);
};

const ManageEventsPage = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState("");
  const [editForm, setEditForm] = useState(emptyForm);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const loadEvents = async () => {
    const res = await fetchEvents();
    setEvents(res.events || []);
  };

  const loadClubs = async () => {
    const res = await fetchClubs();
    setClubs(res.clubs || []);
  };

  useEffect(() => {
    loadEvents().catch(() => undefined);
    if (user?.role === "super_admin") {
      loadClubs().catch(() => undefined);
    }
  }, [user?.role]);

  const notify = (type, message) => {
    setStatus({ type, message });
  };

  const clearNotice = () => {
    if (!status.message) return;
    setStatus({ type: "", message: "" });
  };

  const onCreate = async (event) => {
    event.preventDefault();
    clearNotice();
    setLoading(true);

    const payload = {
      title: form.title,
      description: form.description,
      category: form.category,
      date: form.date,
      venue: form.venue,
      maxAttendees: Number(form.maxAttendees) || 300,
      ...(user?.role === "super_admin" ? { club: form.club } : {})
    };

    try {
      await createEvent(payload);
      setForm(emptyForm);
      notify("success", "Event created successfully.");
      await loadEvents();
    } catch (requestError) {
      notify("error", requestError?.response?.data?.message || "Could not create event.");
    } finally {
      setLoading(false);
    }
  };

  const startEditing = (eventItem) => {
    setEditingId(eventItem._id);
    setEditForm({
      title: eventItem.title || "",
      description: eventItem.description || "",
      category: eventItem.category || "",
      date: formatDateTimeLocal(eventItem.date),
      venue: eventItem.venue || "",
      club: eventItem.club?._id || eventItem.club || "",
      maxAttendees: eventItem.maxAttendees || 300
    });
  };

  const cancelEditing = () => {
    setEditingId("");
    setEditForm(emptyForm);
  };

  const onSaveUpdate = async (eventId) => {
    clearNotice();
    setLoading(true);

    const payload = {
      title: editForm.title,
      description: editForm.description,
      category: editForm.category,
      date: editForm.date,
      venue: editForm.venue,
      maxAttendees: Number(editForm.maxAttendees) || 300,
      ...(user?.role === "super_admin" ? { club: editForm.club } : {})
    };

    try {
      await updateEvent(eventId, payload);
      notify("success", "Event updated successfully.");
      cancelEditing();
      await loadEvents();
    } catch (requestError) {
      notify("error", requestError?.response?.data?.message || "Could not update event.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async (eventId) => {
    clearNotice();
    setLoading(true);

    try {
      await deleteEvent(eventId);
      notify("success", "Event deleted successfully.");
      if (editingId === eventId) {
        cancelEditing();
      }
      await loadEvents();
    } catch (requestError) {
      notify("error", requestError?.response?.data?.message || "Could not delete event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <section className="card p-4">
        <h2 className="text-xl font-semibold">Event Control Center</h2>
        <p className="mt-1 text-sm" style={{ color: "var(--campus-muted)" }}>
          Create, edit, and remove events from one place.
        </p>

        {status.message ? (
          <div
            className="mt-3 rounded-xl border px-3 py-2 text-sm"
            style={{
              borderColor: status.type === "error" ? "#d84b4b" : "#2a8f64",
              background: status.type === "error" ? "rgba(216,75,75,0.08)" : "rgba(42,143,100,0.08)"
            }}
          >
            {status.message}
          </div>
        ) : null}

        <form className="mt-3 grid gap-2 md:grid-cols-2" onSubmit={onCreate}>
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
            className="rounded-lg border px-3 py-2"
            style={{ borderColor: "var(--campus-border)" }}
            required
          />
          <input
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
            className="rounded-lg border px-3 py-2"
            style={{ borderColor: "var(--campus-border)" }}
            required
          />
          <input
            type="number"
            min={1}
            placeholder="Max attendees"
            value={form.maxAttendees}
            onChange={(e) => setForm((prev) => ({ ...prev, maxAttendees: e.target.value }))}
            className="rounded-lg border px-3 py-2"
            style={{ borderColor: "var(--campus-border)" }}
          />
          <input
            type="datetime-local"
            value={form.date}
            onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))}
            className="rounded-lg border px-3 py-2"
            style={{ borderColor: "var(--campus-border)" }}
            required
          />
          <input
            placeholder="Venue"
            value={form.venue}
            onChange={(e) => setForm((prev) => ({ ...prev, venue: e.target.value }))}
            className="rounded-lg border px-3 py-2"
            style={{ borderColor: "var(--campus-border)" }}
            required
          />
          {user?.role === "super_admin" ? (
            <select
              value={form.club}
              onChange={(e) => setForm((prev) => ({ ...prev, club: e.target.value }))}
              className="rounded-lg border px-3 py-2"
              style={{ borderColor: "var(--campus-border)" }}
              required
            >
              <option value="">Select club</option>
              {clubs.map((club) => (
                <option key={club._id} value={club._id}>
                  {club.name}
                </option>
              ))}
            </select>
          ) : (
            <input
              placeholder="Auto-assigned from your club"
              value="Auto-assigned from your club"
              className="rounded-lg border px-3 py-2"
              style={{ borderColor: "var(--campus-border)", color: "var(--campus-muted)" }}
              disabled
            />
          )}
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
            className="rounded-lg border px-3 py-2 md:col-span-2"
            style={{ borderColor: "var(--campus-border)" }}
            required
          />
          <button
            type="submit"
            className="rounded-lg px-3 py-2 text-white md:col-span-2"
            style={{ background: "linear-gradient(135deg, var(--campus-accent), var(--campus-accent-strong))" }}
            disabled={loading}
          >
            {loading ? "Saving..." : "Publish Event"}
          </button>
        </form>
      </section>

      <section className="card p-4">
        <h2 className="text-xl font-semibold">Existing Events</h2>
        <div className="mt-3 space-y-2">
          {events.map((eventItem) => (
            <div
              key={eventItem._id}
              className="rounded-xl border p-3"
              style={{ borderColor: "var(--campus-border)", background: "var(--campus-surface)" }}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{eventItem.title}</p>
                  <p className="text-sm" style={{ color: "var(--campus-muted)" }}>
                    {new Date(eventItem.date).toLocaleString()} | {eventItem.venue}
                  </p>
                  <p className="text-sm" style={{ color: "var(--campus-muted)" }}>
                    Club: {eventItem.club?.name || "Unknown"} | Category: {eventItem.category}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="rounded-md px-3 py-1.5 text-xs font-semibold text-white"
                    style={{ backgroundColor: "#2f8ccf" }}
                    onClick={() => startEditing(eventItem)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="rounded-md px-3 py-1.5 text-xs font-semibold text-white"
                    style={{ backgroundColor: "#d45656" }}
                    onClick={() => onDelete(eventItem._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>

              {editingId === eventItem._id ? (
                <div className="mt-3 grid gap-2 md:grid-cols-2">
                  <input
                    placeholder="Title"
                    value={editForm.title}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, title: e.target.value }))}
                    className="rounded-lg border px-3 py-2"
                    style={{ borderColor: "var(--campus-border)" }}
                  />
                  <input
                    placeholder="Category"
                    value={editForm.category}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, category: e.target.value }))}
                    className="rounded-lg border px-3 py-2"
                    style={{ borderColor: "var(--campus-border)" }}
                  />
                  <input
                    type="datetime-local"
                    value={editForm.date}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, date: e.target.value }))}
                    className="rounded-lg border px-3 py-2"
                    style={{ borderColor: "var(--campus-border)" }}
                  />
                  <input
                    placeholder="Venue"
                    value={editForm.venue}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, venue: e.target.value }))}
                    className="rounded-lg border px-3 py-2"
                    style={{ borderColor: "var(--campus-border)" }}
                  />
                  <input
                    type="number"
                    min={1}
                    placeholder="Max attendees"
                    value={editForm.maxAttendees}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, maxAttendees: e.target.value }))}
                    className="rounded-lg border px-3 py-2"
                    style={{ borderColor: "var(--campus-border)" }}
                  />
                  {user?.role === "super_admin" ? (
                    <select
                      value={editForm.club}
                      onChange={(e) => setEditForm((prev) => ({ ...prev, club: e.target.value }))}
                      className="rounded-lg border px-3 py-2"
                      style={{ borderColor: "var(--campus-border)" }}
                    >
                      <option value="">Select club</option>
                      {clubs.map((club) => (
                        <option key={club._id} value={club._id}>
                          {club.name}
                        </option>
                      ))}
                    </select>
                  ) : null}
                  <textarea
                    placeholder="Description"
                    value={editForm.description}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, description: e.target.value }))}
                    className="rounded-lg border px-3 py-2 md:col-span-2"
                    style={{ borderColor: "var(--campus-border)" }}
                  />
                  <div className="flex gap-2 md:col-span-2">
                    <button
                      type="button"
                      className="rounded-md px-3 py-2 text-sm font-semibold text-white"
                      style={{ backgroundColor: "#2a8f64" }}
                      onClick={() => onSaveUpdate(eventItem._id)}
                      disabled={loading}
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      className="rounded-md border px-3 py-2 text-sm font-semibold"
                      style={{ borderColor: "var(--campus-border)" }}
                      onClick={cancelEditing}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ManageEventsPage;
