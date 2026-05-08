import { useTheme } from "../../context/ThemeContext";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-toggle-btn"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      {isDark ? (
        <svg aria-hidden viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.8v2.5M12 18.7v2.5M4.7 4.7l1.8 1.8M17.5 17.5l1.8 1.8M2.8 12h2.5M18.7 12h2.5M4.7 19.3l1.8-1.8M17.5 6.5l1.8-1.8" />
        </svg>
      ) : (
        <svg aria-hidden viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M20.2 14.8A8.8 8.8 0 1 1 9.2 3.8a7.2 7.2 0 0 0 11 11z" />
        </svg>
      )}
    </button>
  );
};

export default ThemeToggleButton;
