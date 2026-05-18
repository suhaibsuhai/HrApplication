import Header from '../shared/navigation/Header.jsx';
import Sidebar from '../shared/navigation/Sidebar.jsx';

export default function MainLayout({
  activeModule,
  children,
  currentModuleTitle,
  isSidebarCollapsed,
  navigationItems,
  onModuleChange,
  onToggleSidebar,
}) {
  return (
    <div className="app-shell">
      <Header currentModuleTitle={currentModuleTitle} />

      <div className="app-body">
        <Sidebar
          activeModule={activeModule}
          isCollapsed={isSidebarCollapsed}
          items={navigationItems}
          onModuleChange={onModuleChange}
          onToggleSidebar={onToggleSidebar}
        />

        <main className="main-content">{children}</main>
      </div>
    </div>
  );
}
