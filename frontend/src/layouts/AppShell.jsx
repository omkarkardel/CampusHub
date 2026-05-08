import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ThemeToggleButton from "../components/common/ThemeToggleButton";

const navByRole = {
  student: [
    { label: "Dashboard", to: "/dashboard" },
    { label: "Events", to: "/dashboard/events" },
    { label: "Teams", to: "/dashboard/teams" }
  ],
  club_admin: [
    { label: "Dashboard", to: "/dashboard" },
    { label: "Manage Events", to: "/dashboard/manage-events" },
    { label: "Announcements", to: "/dashboard/announcements" }
  ],
  super_admin: [
    { label: "Dashboard", to: "/dashboard" },
    { label: "Manage Events", to: "/dashboard/manage-events" },
    { label: "Users & Clubs", to: "/dashboard/governance" },
    { label: "Platform Activity", to: "/dashboard/activity" }
  ]
};

const AppShell = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const items = navByRole[user?.role] || navByRole.student;

  const onLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen px-4 py-4 md:px-8 md:py-6">
      <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-[250px_1fr]">
        <aside className="card p-4 fade-up">
          <div className="rounded-xl p-3" style={{ background: "var(--campus-soft-gradient)" }}>
            <Link to="/" className="text-xl font-bold tracking-tight">
              CampusHub
            </Link>
            <p className="mt-1 text-sm" style={{ color: "var(--campus-muted)" }}>
              Connected campus life
            </p>
          </div>
          <nav className="mt-6 space-y-1">
            {items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `block rounded-xl px-3 py-2 text-sm transition ${
                    isActive
                      ? "font-semibold text-white"
                      : "hover:bg-slate-400/10"
                  }`
                }
                style={({ isActive }) =>
                  isActive
                    ? {
                        background: "linear-gradient(135deg, var(--campus-accent), var(--campus-accent-strong))"
                      }
                    : undefined
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-6 rounded-xl border p-3 text-sm" style={{ borderColor: "var(--campus-border)" }}>
            <p className="font-semibold">{user?.name}</p>
            <p style={{ color: "var(--campus-muted)" }}>{user?.role?.replace("_", " ")}</p>
          </div>
          <div className="mt-4 flex gap-2">
            <ThemeToggleButton />
            <button
              type="button"
              onClick={onLogout}
              className="rounded-lg border px-3 py-2 text-xs font-semibold"
              style={{ borderColor: "var(--campus-border)" }}
            >
              Logout
            </button>
          </div>
        </aside>

        <main className="space-y-4">{children}</main>
      </div>
    </div>
  );
};

export default AppShell;
