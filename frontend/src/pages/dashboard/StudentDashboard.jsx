import { useEffect, useMemo, useState } from "react";
import StatCard from "../../components/dashboard/StatCard";
import EventCard from "../../components/dashboard/EventCard";
import NotificationPanel from "../../components/dashboard/NotificationPanel";
import {
  fetchEventRecommendations,
  fetchEvents,
  fetchJoinedEvents,
  rsvpEvent
} from "../../services/eventService";
import { fetchNotifications, markNotificationRead } from "../../services/notificationService";

const StudentDashboard = () => {
  const [events, setEvents] = useState([]);
  const [joined, setJoined] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const loadData = async () => {
    const [eventsRes, joinedRes, recommendRes, notificationRes] = await Promise.all([
      fetchEvents(),
      fetchJoinedEvents(),
      fetchEventRecommendations(),
      fetchNotifications()
    ]);

    setEvents(eventsRes.events || []);
    setJoined(joinedRes.events || []);
    setRecommendations(recommendRes.recommendations || []);
    setNotifications(notificationRes.notifications || []);
  };

  useEffect(() => {
    loadData().catch(() => undefined);
  }, []);

  const registeredCount = useMemo(() => joined.length, [joined]);

  const onRegister = async (eventId) => {
    await rsvpEvent(eventId);
    await loadData();
  };

  const onRead = async (notificationId) => {
    await markNotificationRead(notificationId);
    setNotifications((prev) => prev.map((item) => (item._id === notificationId ? { ...item, isRead: true } : item)));
  };

  return (
    <div className="space-y-4">
      <section className="grid gap-3 sm:grid-cols-3">
        <StatCard label="Upcoming Events" value={events.length} />
        <StatCard label="Registered Events" value={registeredCount} />
        <StatCard label="Unread Alerts" value={notifications.filter((item) => !item.isRead).length} />
      </section>

      <section className="card p-4">
        <h2 className="text-xl font-semibold">Recommended Events</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {(recommendations.length ? recommendations : events.slice(0, 4)).map((event) => (
            <EventCard key={event._id || event.id} event={event} onRegister={onRegister} />
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <div className="card p-4">
          <h2 className="text-xl font-semibold">My Registered Events</h2>
          <div className="mt-3 space-y-2">
            {joined.length === 0 ? (
              <p className="text-sm" style={{ color: "var(--campus-muted)" }}>
                No events registered yet.
              </p>
            ) : (
              joined.map((event) => (
                <div
                  key={event._id || event.id}
                  className="rounded-xl border p-3 text-sm"
                  style={{ borderColor: "var(--campus-border)" }}
                >
                  <p className="font-semibold">{event.title}</p>
                  <p style={{ color: "var(--campus-muted)" }}>{new Date(event.date).toLocaleString()}</p>
                </div>
              ))
            )}
          </div>
        </div>
        <NotificationPanel notifications={notifications.slice(0, 6)} onRead={onRead} />
      </section>
    </div>
  );
};

export default StudentDashboard;
