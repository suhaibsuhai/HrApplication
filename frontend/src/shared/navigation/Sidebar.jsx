export default function Sidebar({ items, activeModuleId, onModuleChange }) {
  return (
    <aside className="sidebar">
      <div className="brand-block">
        <div className="brand-mark">HR</div>
        <div>
          <h1>HR Suite</h1>
          <p>Enterprise SaaS</p>
        </div>
      </div>

      <nav className="sidebar-nav" aria-label="Main navigation">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === activeModuleId;

          return (
            <button
              key={item.id}
              type="button"
              className={`nav-item ${isActive ? "active" : ""}`}
              onClick={() => onModuleChange(item.id)}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
