import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ThemeToggleButton from "../components/common/ThemeToggleButton";

const links = [
  { label: "Explore", to: "/explore" },
  { label: "Events", to: "/events" },
  { label: "Competitions", to: "/competitions" }
];

const PublicLayout = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="public-root">
      <header className="public-header">
        <div className="public-header__inner">
          <Link to="/" className="public-logo">
            CampusHub
          </Link>
          <nav className="public-nav">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} className={({ isActive }) => `public-nav__item ${isActive ? "active" : ""}`}>
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="public-actions">
            <ThemeToggleButton />
            {isAuthenticated ? (
              <Link to="/dashboard" className="btn btn--primary">
                Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className="btn btn--ghost">
                  Login
                </Link>
                <Link to="/register" className="btn btn--primary">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
      <Outlet />
      <footer className="public-footer">
        <p>CampusHub helps students discover events, teams, and opportunities across campus.</p>
      </footer>
    </div>
  );
};

export default PublicLayout;
