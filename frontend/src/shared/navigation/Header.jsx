import { Bell, Moon, Search, Sun, UserCircle } from "lucide-react";
import { useTheme } from "../../app/providers/ThemeProvider.jsx";

export default function Header({ activeModule }) {
  const { theme, toggleTheme } = useTheme();
  const ThemeIcon = theme === "light" ? Moon : Sun;

  return (
    <header className="top-header">
      <div>
        <p className="eyebrow">Current module</p>
        <h2>{activeModule.label}</h2>
      </div>

      <div className="header-actions">
        <button type="button" className="icon-button" aria-label="Search">
          <Search size={18} />
        </button>
        <button type="button" className="icon-button" aria-label="Notifications">
          <Bell size={18} />
        </button>
        <button type="button" className="icon-button" onClick={toggleTheme} aria-label="Toggle theme">
          <ThemeIcon size={18} />
        </button>
        <button type="button" className="profile-button" aria-label="Profile">
          <UserCircle size={22} />
          <span>Admin</span>
        </button>
      </div>
    </header>
  );
}
