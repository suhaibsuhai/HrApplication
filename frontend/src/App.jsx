import { useState } from 'react';
import {
  Bell,
  BookOpen,
  BriefcaseBusiness,
  Home,
  Menu,
  Settings,
  UserRound,
  UsersRound,
} from 'lucide-react';
import './styles.css';

const navItems = [
  { label: 'Home', icon: Home },
  { label: 'HR', icon: UsersRound },
  { label: 'Operations', icon: BriefcaseBusiness },
  { label: 'Courses', icon: BookOpen },
];

function Header() {
  return (
    <header className="app-header">
      <div className="brand" aria-label="HR Application">
        <div className="brand-mark">HR</div>
        <span>HR Application</span>
      </div>

      <div className="header-actions">
        <button className="icon-button" type="button" aria-label="Settings" title="Settings">
          <Settings size={20} />
        </button>
        <button className="icon-button" type="button" aria-label="Notifications" title="Notifications">
          <Bell size={20} />
        </button>
        <button className="profile-button" type="button" aria-label="Profile" title="Profile">
          <UserRound size={20} />
        </button>
      </div>
    </header>
  );
}

function Sidebar({ collapsed, onToggle }) {
  return (
    <aside className={`sidebar${collapsed ? ' collapsed' : ''}`} aria-label="Module navigation">
      <button
        className="nav-toggle"
        type="button"
        onClick={onToggle}
        aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'}
        aria-expanded={!collapsed}
        title={collapsed ? 'Expand navigation' : 'Collapse navigation'}
      >
        <Menu size={22} />
      </button>

      <nav className="module-nav">
        {navItems.map(({ label, icon: Icon }, index) => (
          <a className={`nav-link${index === 0 ? ' active' : ''}`} href="#" key={label} title={label}>
            <Icon size={21} />
            <span>{label}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
}

function App() {
  const [navCollapsed, setNavCollapsed] = useState(false);

  return (
    <div className={`app-shell${navCollapsed ? ' nav-collapsed' : ''}`}>
      <Header />
      <div className="app-body">
        <Sidebar collapsed={navCollapsed} onToggle={() => setNavCollapsed((value) => !value)} />
        <main className="main-content">
          <section className="page-heading">
            <p>Dashboard</p>
            <h1>Home</h1>
          </section>

          <section className="welcome-panel" aria-label="Home overview">
            <div>
              <h2>Welcome to the HR Application</h2>
              <p>
                The shared header and module navigation are ready for the rest of the application
                screens.
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
