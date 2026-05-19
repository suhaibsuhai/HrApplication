import { Menu } from 'lucide-react';

export default function Sidebar({
  activeModule,
  isCollapsed,
  items,
  onModuleChange,
  onToggleSidebar,
  hideToggle = false,
}) {
  return (
    <aside className={`sidebar ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
      <div className="sidebar-header">
        {!isCollapsed && <span>Main Navigation</span>}

        {!hideToggle && (
          <button
            className="sidebar-toggle"
            type="button"
            aria-label="Toggle sidebar"
            onClick={onToggleSidebar}
          >
            <Menu size={22} />
          </button>
        )}
      </div>

      <nav className="module-nav" aria-label="Main navigation">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeModule === item.id;

          return (
            <button
              className={`nav-item ${isActive ? 'active' : ''}`}
              key={item.id}
              type="button"
              title={item.label}
              onClick={() => onModuleChange(item.id)}
            >
              <Icon size={21} />
              {!isCollapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}