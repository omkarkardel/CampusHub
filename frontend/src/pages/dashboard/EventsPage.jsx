import { useEffect, useState } from "react";
import EventCard from "../../components/dashboard/EventCard";
import { fetchEvents, rsvpEvent } from "../../services/eventService";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({ category: "", startDate: "", endDate: "", search: "" });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [joiningId, setJoiningId] = useState("");

  const loadEvents = async (params = {}) => {
    const res = await fetchEvents(params);
    setEvents(res.events || []);
  };

  useEffect(() => {
    loadEvents().catch(() => undefined);
  }, []);

  const applyFilters = () => {
    const params = Object.fromEntries(Object.entries(filters).filter(([, value]) => value));
    loadEvents(params).catch(() => undefined);
  };

  const onRegister = async (eventId) => {
    setStatus({ type: "", message: "" });
    setJoiningId(eventId);
    try {
      await rsvpEvent(eventId);
      setStatus({ type: "success", message: "Successfully joined event." });
      await loadEvents(); // refresh to reflect latest attendee state
    } catch (error) {
      setStatus({
        type: "error",
        message: error?.response?.data?.message || "Could not join event."
      });
    } finally {
      setJoiningId("");
    }
  };

  return (
    <section className="card p-4">
      <h2 className="text-xl font-semibold">Campus Events</h2>

      {status.message ? (
        <div
          className="mt-3 rounded-lg border px-3 py-2 text-sm"
          style={{
            borderColor: status.type === "error" ? "#d84b4b" : "#2a8f64",
            background: status.type === "error" ? "rgba(216,75,75,0.08)" : "rgba(42,143,100,0.08)"
          }}
        >
          {status.message}
        </div>
      ) : null}

      <div className="mt-3 grid gap-2 md:grid-cols-4">
        <input
          placeholder="Category"
          className="rounded-lg border px-3 py-2"
          style={{ borderColor: "var(--campus-border)" }}
          value={filters.category}
          onChange={(e) => setFilters((prev) => ({ ...prev, category: e.target.value }))}
        />
        <input
          type="date"
          className="rounded-lg border px-3 py-2"
          style={{ borderColor: "var(--campus-border)" }}
          value={filters.startDate}
          onChange={(e) => setFilters((prev) => ({ ...prev, startDate: e.target.value }))}
        />
        <input
          type="date"
          className="rounded-lg border px-3 py-2"
          style={{ borderColor: "var(--campus-border)" }}
          value={filters.endDate}
          onChange={(e) => setFilters((prev) => ({ ...prev, endDate: e.target.value }))}
        />
        <input
          placeholder="Search title/description"
          className="rounded-lg border px-3 py-2"
          style={{ borderColor: "var(--campus-border)" }}
          value={filters.search}
          onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
        />
      </div>

      <button
        type="button"
        onClick={applyFilters}
        className="mt-3 rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white"
      >
        Apply Filters
      </button>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {events.map((event) => (
          <EventCard
            key={event._id}
            event={event}
            onRegister={onRegister}
            actionLabel={joiningId === event._id ? "Joining..." : "Register"}
          />
        ))}
      </div>
    </section>
  );
};

export default EventsPage;