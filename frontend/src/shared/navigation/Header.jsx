import { Bell, Moon, Search, Settings, Space, Sun, UserCircle } from 'lucide-react';
import { LayoutGrid } from 'lucide-react';
import { useTheme } from '../../app/providers/ThemeProvider.jsx';

export default function Header({ currentModuleTitle }) {
  const { theme, toggleTheme } = useTheme();
  const ThemeIcon = theme === 'dark' ? Sun : Moon;

  return (
    <header className="app-header">
  <button className="header-brand home-button" onClick={() => window.location.reload()}>
    <div className="brand-mark">
  <LayoutGrid size={18} />
</div>
    <div>
      <strong>Enterprise SaaS</strong>
    </div>
  </button>

  <div className="header-search">
    <Search size={18} />
    <input type="search" placeholder="Search..." />
  </div>

  <div className="header-actions">
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
