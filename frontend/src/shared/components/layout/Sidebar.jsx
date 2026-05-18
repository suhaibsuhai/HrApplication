import { Menu } from 'lucide-react';

export function Sidebar({ activeModuleId, collapsed, modules, onModuleChange, onToggle }) {
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
        {modules.map(({ id, label, icon: Icon, status }) => {
          const isActive = id === activeModuleId;

          return (
            <button
              className={`nav-link${isActive ? ' active' : ''}`}
              type="button"
              key={id}
              onClick={() => onModuleChange(id)}
              aria-current={isActive ? 'page' : undefined}
              title={label}
            >
              <Icon size={21} />
              <span>{label}</span>
              {status === 'planned' && <small>Later</small>}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
