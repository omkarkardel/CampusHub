import { useEffect, useState } from "react";
import { fetchAdminActivity } from "../../services/adminService";

const ActivityPage = () => {
  const [snapshot, setSnapshot] = useState(null);

  useEffect(() => {
    fetchAdminActivity()
      .then((res) => setSnapshot(res))
      .catch(() => undefined);
  }, []);

  return (
    <div className="space-y-4">
      <section className="card p-4">
        <h2 className="text-xl font-semibold">Recent Platform Events</h2>
        <div className="mt-3 space-y-2">
          {(snapshot?.analytics?.recentEvents || []).map((event) => (
            <div key={event._id} className="rounded-xl border p-3" style={{ borderColor: "var(--campus-border)" }}>
              <p className="font-semibold">{event.title}</p>
              <p className="text-sm" style={{ color: "var(--campus-muted)" }}>
                {new Date(event.date).toLocaleString()} | {event.club?.name}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ActivityPage;