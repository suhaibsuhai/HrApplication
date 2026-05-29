import { useMemo, useState } from "react";

import MainLayout from "../layouts/MainLayout.jsx";
import { navigationItems } from "../config/navigation.config.js";

import DashboardModule from "../modules/dashboard/DashboardModule.jsx";
import CourseManagement from "../modules/coursemanagement/CourseManagement.jsx";
import HumanResource from "../modules/humanresource/HumanResource.jsx";
import RecruitmentModule from "../modules/recruitment/RecruitmentModule.jsx";


export default function App() {
  const [activeModule, setActiveModule] = useState("dashboard");
  const [activeSubModule, setActiveSubModule] = useState(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const currentNavigationItem = useMemo(
    () =>
      navigationItems.find((item) => item.id === activeModule) ??
      navigationItems[0],
    [activeModule]
  );

  

  const moduleRegistry = {
    dashboard: DashboardModule,
    "human-resources": () => (
      <HumanResource
        onModuleChange={(moduleId) => {
          setActiveSubModule(null);
          setActiveModule(moduleId);
        }}
        onOpenSubModule={setActiveSubModule}
      />
    ),
    "course-management": CourseManagement,
    recruitment: RecruitmentModule,
  };

  const ActiveModule = moduleRegistry[activeModule] ?? DashboardModule;

  return (
    <MainLayout
      activeModule={activeModule}
      currentModuleTitle={currentNavigationItem.label}
      isSidebarCollapsed={isSidebarCollapsed}
      navigationItems={navigationItems}
      onModuleChange={(moduleId) => {
        setActiveSubModule(null);
        setActiveModule(moduleId);
      }}
      onToggleSidebar={() => setIsSidebarCollapsed((value) => !value)}
    >
      <ActiveModule />
    </MainLayout>
  );
}
