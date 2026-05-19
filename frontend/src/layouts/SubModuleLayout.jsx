import Header from "../shared/navigation/Header.jsx";
import Sidebar from "../shared/navigation/Sidebar.jsx";
import { navigationItems } from "../config/navigation.config.js";

export default function SubModuleLayout({
  title,
  activeModule = "human-resources",
  children,
  onModuleChange,
}) {
  return (
    <div className="app-shell">
      <Header currentModuleTitle={title} />

      <div className="app-body">
        <Sidebar
  activeModule={activeModule}
  isCollapsed={true}
  items={navigationItems}
  onModuleChange={onModuleChange}
  onToggleSidebar={() => {}}
  hideToggle={true}
/>

        <main className="main-content">{children}</main>
      </div>
    </div>
  );
}