import { useMemo, useState } from 'react';
import MainLayout from '../layouts/MainLayout.jsx';
import { navigationItems } from '../config/navigation.config.js';
import DashboardModule from '../modules/dashboard/DashboardModule.jsx';
import EmployeesModule from '../modules/employees/EmployeesModule.jsx';
import PayrollModule from '../modules/payroll/PayrollModule.jsx';
import RecruitmentModule from '../modules/recruitment/RecruitmentModule.jsx';
import PerformanceModule from '../modules/performance/PerformanceModule.jsx';

const moduleRegistry = {
  dashboard: DashboardModule,
  employees: EmployeesModule,
  payroll: PayrollModule,
  recruitment: RecruitmentModule,
  performance: PerformanceModule,
};

export default function App() {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const currentNavigationItem = useMemo(
    () => navigationItems.find((item) => item.id === activeModule) ?? navigationItems[0],
    [activeModule]
  );

  const ActiveModule = moduleRegistry[activeModule] ?? DashboardModule;

  return (
    <MainLayout
      activeModule={activeModule}
      currentModuleTitle={currentNavigationItem.label}
      isSidebarCollapsed={isSidebarCollapsed}
      navigationItems={navigationItems}
      onModuleChange={setActiveModule}
      onToggleSidebar={() => setIsSidebarCollapsed((value) => !value)}
    >
      <ActiveModule />
    </MainLayout>
  );
}
