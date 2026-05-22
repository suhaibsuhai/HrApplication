import { useMemo, useState } from "react";

import MainLayout from "../layouts/MainLayout.jsx";
import { navigationItems } from "../config/navigation.config.js";

import DashboardModule from "../modules/dashboard/DashboardModule.jsx";
import HumanResource from "../modules/humanresource/HumanResource.jsx";
import CourseManagement from "../modules/coursemanagement/CourseManagement.jsx";
import RecruitmentModule from "../modules/recruitment/RecruitmentModule.jsx";

import EmployeeManagementPage from "../modules/humanresource/pages/EmployeeManagementPage.jsx";
import AttendanceLeavePage from "../modules/humanresource/pages/AttendanceLeavePage.jsx";
import ContractSetupPage from "../modules/humanresource/pages/ContractSetupPage.jsx";
import ContractPipelinesPage from "../modules/humanresource/pages/ContractPipelinesPage.jsx";
import ApprovalsPage from "../modules/humanresource/pages/ApprovalsPage.jsx";
import PayrollPage from "../modules/humanresource/pages/PayrollPage.jsx";
import HrSettingsPage from "../modules/humanresource/pages/HrSettingsPage.jsx";

const subModuleRegistry = {
  "hr-settings": HrSettingsPage,
  "employee-management": EmployeeManagementPage,
  "attendance-leave": AttendanceLeavePage,
  "contract-setup": ContractSetupPage,
  "contract-pipelines": ContractPipelinesPage,
  approvals: ApprovalsPage,
  payroll: PayrollPage,
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
        onOpenSubModule={setActiveSubModule}
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
