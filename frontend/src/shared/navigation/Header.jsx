import { Bell, Moon, Search, Settings, Sun, UserCircle } from 'lucide-react';
import { useTheme } from '../../app/providers/ThemeProvider.jsx';

export default function Header({ currentModuleTitle }) {
  const { theme, toggleTheme } = useTheme();
  const ThemeIcon = theme === 'dark' ? Sun : Moon;

  return (
    <header className="app-header">
      <button
      className="header-brand home-button"
      onClick={() => window.location.reload()}
      >
        <div className="brand-mark">HR</div>
        <div>
          <strong>HR Suite</strong>
          <span>Enterprise SaaS</span>
        </div>
      </button>

      <div className="header-actions">
        <button className="icon-button" type="button" aria-label="Search">
          <Search size={22} />
        </button>
        <button className="icon-button" type="button" aria-label="Notifications">
          <Bell size={22} />
        </button>
        <button className="icon-button" type="button" aria-label="Toggle theme" onClick={toggleTheme}>
          <ThemeIcon size={22} />
        </button>
        <button className="icon-button" type="button" aria-label="Settings">
          <Settings size={22} />
        </button>
        <button className="profile-button" type="button" aria-label="Admin profile">
          <UserCircle size={24} />
          <span>Admin</span>
        </button>
      </div>
    </header>
  );
}
