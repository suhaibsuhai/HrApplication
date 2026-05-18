import { useMemo, useState } from "react";
import { moduleRegistry } from "../routes/moduleRegistry.jsx";
import { navigationItems } from "../config/navigation.js";
import Header from "../shared/navigation/Header.jsx";
import Sidebar from "../shared/navigation/Sidebar.jsx";

export default function MainLayout() {
  const [activeModuleId, setActiveModuleId] = useState("dashboard");

  const activeModule = useMemo(() => {
    return navigationItems.find((item) => item.id === activeModuleId) || navigationItems[0];
  }, [activeModuleId]);

  const ActiveModuleComponent = moduleRegistry[activeModule.id] || moduleRegistry.dashboard;

  return (
    <div className="app-layout">
      <Sidebar
        items={navigationItems}
        activeModuleId={activeModule.id}
        onModuleChange={setActiveModuleId}
      />

      <div className="main-section">
        <Header activeModule={activeModule} />

        <main className="page-content">
          <ActiveModuleComponent />
        </main>
      </div>
    </div>
  );
}
