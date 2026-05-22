import { ChevronRight } from "lucide-react";

import { hrNavigationItems } from "../config/hrNavigation.js";

export default function HrWorkspaceFrame({
  actions,
  children,
  description,
  eyebrow = "Human Resources",
  meta,
  onModuleChange,
  onOpenSubModule,
  sectionId = "overview",
  title,
}) {
  function handleNavigation(targetId) {
    if (targetId === sectionId) return;

    if (targetId === "overview") {
      onModuleChange?.("human-resources");
      return;
    }

    onOpenSubModule?.(targetId);
  }

  return (
    <section className="hr-admin-shell">
      <aside className="hr-local-nav" aria-label="Human resources sections">
        <div className="hr-local-nav-heading">
          <strong>Human Resources</strong>
          <span>Admin workspace</span>
        </div>

        <div className="hr-local-nav-list">
          {hrNavigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === sectionId;

            return (
              <button
                aria-current={isActive ? "page" : undefined}
                className={`hr-local-nav-button ${isActive ? "active" : ""}`}
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                type="button"
              >
                <Icon size={17} />
                <span>
                  <strong>{item.label}</strong>
                  <small>{item.description}</small>
                </span>
                <ChevronRight size={15} />
              </button>
            );
          })}
        </div>
      </aside>

      <div className="hr-admin-content">
        <header className="hr-suite-header">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2>{title}</h2>
            {description && <p className="module-description">{description}</p>}
          </div>

          {(actions || meta) && (
            <div className="hr-suite-header-side">
              {meta}
              {actions && <div className="hr-command-bar">{actions}</div>}
            </div>
          )}
        </header>

        {children}
      </div>
    </section>
  );
}
