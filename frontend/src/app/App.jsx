import { useMemo, useState } from "react";

import MainLayout from "../layouts/MainLayout.jsx";
import { navigationItems } from "../config/navigation.config.js";

import DashboardModule from "../modules/dashboard/DashboardModule.jsx";
import HumanResource from "../modules/humanresource/HumanResource.jsx";
import CourseManagement from "../modules/coursemanagement/CourseManagement.jsx";
import RecruitmentModule from "../modules/recruitment/RecruitmentModule.jsx";

import AddEmployeePage from "../modules/humanresource/pages/AddEmployeePage.jsx";
import ContractGeneratePage from "../modules/humanresource/pages/ContractGeneratePage.jsx";
import EmployeeSupervisePage from "../modules/humanresource/pages/EmployeeSupervisePage.jsx";
import AddNewJobPage from "../modules/humanresource/pages/AddNewJobPage.jsx";

const subModuleRegistry = {
  "add-employee": AddEmployeePage,
  "contract-generate": ContractGeneratePage,
  "employee-supervise": EmployeeSupervisePage,
  "add-new-job": AddNewJobPage,
};

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

  const ActiveSubModulePage = subModuleRegistry[activeSubModule];

  if (ActiveSubModulePage) {
  return (
    <ActiveSubModulePage
      onModuleChange={(moduleId) => {
        setActiveSubModule(null);
        setActiveModule(moduleId);
      }}
    />
  );
}

  const moduleRegistry = {
    dashboard: DashboardModule,
    "human-resources": () => (
      <HumanResource onOpenSubModule={setActiveSubModule} />
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