import DashboardModule from "../modules/dashboard/DashboardModule.jsx";
import EmployeesModule from "../modules/employees/EmployeesModule.jsx";
import PayrollModule from "../modules/payroll/PayrollModule.jsx";
import RecruitmentModule from "../modules/recruitment/RecruitmentModule.jsx";
import PerformanceModule from "../modules/performance/PerformanceModule.jsx";
import SettingsModule from "../modules/settings/SettingsModule.jsx";

export const moduleRegistry = {
  dashboard: DashboardModule,
  employees: EmployeesModule,
  payroll: PayrollModule,
  recruitment: RecruitmentModule,
  performance: PerformanceModule,
  settings: SettingsModule,
};
