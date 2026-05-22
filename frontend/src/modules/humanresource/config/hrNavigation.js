import {
  BadgeCheck,
  Banknote,
  BriefcaseBusiness,
  CalendarClock,
  FileSliders,
  Home,
  Settings,
  UserRoundCog,
} from "lucide-react";

export const hrNavigationItems = [
  {
    id: "overview",
    label: "Overview",
    description: "HR dashboard and next steps",
    icon: Home,
  },
  {
    id: "hr-settings",
    label: "Settings",
    description: "Company HR rules",
    icon: Settings,
  },
  {
    id: "employee-management",
    label: "Employees",
    description: "Employee records and assignments",
    icon: UserRoundCog,
  },
  {
    id: "attendance-leave",
    label: "Time & Leave",
    description: "Attendance, absence, leave balance",
    icon: CalendarClock,
  },
  {
    id: "contract-setup",
    label: "Contract Setup",
    description: "Reusable contract rules",
    icon: FileSliders,
  },
  {
    id: "contract-pipelines",
    label: "Pipelines",
    description: "Contract job tracks",
    icon: BriefcaseBusiness,
  },
  {
    id: "approvals",
    label: "Approvals",
    description: "Requests waiting for review",
    icon: BadgeCheck,
  },
  {
    id: "payroll",
    label: "Payroll",
    description: "Payroll runs and payslips",
    icon: Banknote,
  },
];
