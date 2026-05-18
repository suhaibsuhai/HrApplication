import {
  BarChart3,
  BriefcaseBusiness,
  ClipboardList,
  Gauge,
  Settings,
  Users,
} from "lucide-react";

export const navigationItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: Gauge,
  },
  {
    id: "employees",
    label: "Employees",
    icon: Users,
  },
  {
    id: "payroll",
    label: "Payroll",
    icon: BarChart3,
  },
  {
    id: "recruitment",
    label: "Recruitment",
    icon: BriefcaseBusiness,
  },
  {
    id: "performance",
    label: "Performance",
    icon: ClipboardList,
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
  },
];
