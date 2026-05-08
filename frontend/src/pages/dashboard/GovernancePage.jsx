import { useEffect, useState } from "react";
import { fetchAllUsers, updateRole } from "../../services/adminService";

const GovernancePage = () => {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const res = await fetchAllUsers();
    setUsers(res.users || []);
  };

  useEffect(() => {
    loadUsers().catch(() => undefined);
  }, []);

  const onRoleChange = async (userId, role) => {
    await updateRole(userId, role);
    await loadUsers();
  };

  return (
    <section className="card p-4">
      <h2 className="text-xl font-semibold">User & Club Governance</h2>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr style={{ color: "var(--campus-muted)" }}>
              <th className="pb-2">Name</th>
              <th className="pb-2">Email</th>
              <th className="pb-2">Role</th>
              <th className="pb-2">Update</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t" style={{ borderColor: "var(--campus-border)" }}>
                <td className="py-2">{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
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
    </section>
  );
};

export default GovernancePage;