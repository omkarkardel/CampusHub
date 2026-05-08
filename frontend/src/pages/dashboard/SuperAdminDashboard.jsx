import { useEffect, useMemo, useState } from "react";
import StatCard from "../../components/dashboard/StatCard";
import { fetchAdminActivity, fetchAllUsers, updateRole } from "../../services/adminService";

const roleColorMap = {
  student: "#2f8ccf",
  club_admin: "#2a8f64",
  super_admin: "#9163d8"
};

const SuperAdminDashboard = () => {
  const [snapshot, setSnapshot] = useState(null);
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState("");

  const loadSnapshot = async () => {
    const res = await fetchAdminActivity();
    setSnapshot(res);
  };

  const loadUsers = async () => {
    const res = await fetchAllUsers();
    setUsers(res.users || []);
  };

  useEffect(() => {
    Promise.all([loadSnapshot(), loadUsers()]).catch(() => undefined);
  }, []);

  const totals = snapshot?.analytics?.totals;
  const participation = snapshot?.analytics?.participation || [];

  const recentUsers = useMemo(() => users.slice(0, 8), [users]);

  const onRoleChange = async (userId, role) => {
    setStatus("Updating role...");
    try {
      await updateRole(userId, role);
      setStatus("Role updated.");
      await loadUsers();
    } catch {
      setStatus("Failed to update role.");
    }
  };

  return (
    <div className="space-y-4">
      <section className="admin-hero-card">
        <p className="admin-hero-card__eyebrow">Platform Control</p>
        <h2>Super Admin Dashboard</h2>
        <p>Monitor platform health, manage roles, and take action on events from one place.</p>
      </section>

      <section className="grid gap-3 sm:grid-cols-4">
        <StatCard label="Users" value={totals?.users ?? "-"} />
        <StatCard label="Clubs" value={totals?.clubs ?? "-"} />
        <StatCard label="Events" value={totals?.events ?? "-"} />
        <StatCard label="Teams" value={totals?.teams ?? "-"} />
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
        <div className="card p-4">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-lg font-semibold">Registered Users</h3>
            <span className="text-sm" style={{ color: "var(--campus-muted)" }}>
              Total: {users.length}
            </span>
          </div>
          {status ? (
            <p className="mt-2 text-sm" style={{ color: "var(--campus-muted)" }}>
              {status}
            </p>
          ) : null}
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr style={{ color: "var(--campus-muted)" }}>
                  <th className="pb-2">Name</th>
                  <th className="pb-2">Email</th>
                  <th className="pb-2">Role</th>
                  <th className="pb-2">Change</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((user) => (
                  <tr key={user._id} className="border-t" style={{ borderColor: "var(--campus-border)" }}>
                    <td className="py-2">{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span
                        className="rounded-full px-2 py-1 text-xs font-semibold text-white"
                        style={{ backgroundColor: roleColorMap[user.role] || "#506584" }}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <select
                        className="rounded-md border px-2 py-1"
                        style={{ borderColor: "var(--campus-border)" }}
                        defaultValue={user.role}
                        onChange={(e) => onRoleChange(user._id, e.target.value)}
                      >
                        <option value="student">student</option>
                        <option value="club_admin">club_admin</option>
                        <option value="super_admin">super_admin</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card p-4">
          <h3 className="text-lg font-semibold">Engagement Trends</h3>
          <div className="mt-3 space-y-2">
            {participation.map((item) => (
              <div key={item._id} className="admin-trend-item">
                <div className="flex items-center justify-between">
                  <span>{item._id}</span>
                  <span className="text-sm" style={{ color: "var(--campus-muted)" }}>
                    {item.totalParticipants} participants
                  </span>
                </div>
              </div>
            ))}
            {!participation.length ? (
              <p className="text-sm" style={{ color: "var(--campus-muted)" }}>
                No activity data available yet.
              </p>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SuperAdminDashboard;
