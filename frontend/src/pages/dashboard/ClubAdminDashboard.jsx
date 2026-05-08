import { useEffect, useState } from "react";
import StatCard from "../../components/dashboard/StatCard";
import { fetchClubAnalytics, fetchClubRegistrations } from "../../services/clubService";

const ClubAdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    Promise.all([fetchClubAnalytics(), fetchClubRegistrations()])
      .then(([analyticsRes, registrationRes]) => {
        setAnalytics(analyticsRes.analytics);
        setRegistrations(registrationRes.events || []);
      })
      .catch(() => undefined);
  }, []);

  return (
    <div className="space-y-4">
      <section className="grid gap-3 sm:grid-cols-3">
        <StatCard label="Total Events" value={analytics?.totalEvents ?? "-"} />
        <StatCard label="Participants" value={analytics?.totalParticipants ?? "-"} />
        <StatCard label="Avg/Event" value={analytics?.averageParticipation ?? "-"} />
      </section>

      <section className="card p-4">
        <h2 className="text-xl font-semibold">Registrations Overview</h2>
        <div className="mt-3 space-y-2">
          {registrations.length === 0 ? (
            <p className="text-sm" style={{ color: "var(--campus-muted)" }}>
              No event registrations yet.
            </p>
          ) : (
            registrations.map((event) => (
              <div key={event._id} className="rounded-xl border p-3" style={{ borderColor: "var(--campus-border)" }}>
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{event.title}</p>
                  <span className="text-xs" style={{ color: "var(--campus-muted)" }}>
                    {event.attendees?.length || 0} registered
                  </span>
                </div>
                <p className="mt-1 text-xs" style={{ color: "var(--campus-muted)" }}>
                  {new Date(event.date).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default ClubAdminDashboard;