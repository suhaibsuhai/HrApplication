import { BookOpen, BriefcaseBusiness, Home, UsersRound } from 'lucide-react';
import { DashboardModule } from '../../features/dashboard/DashboardModule.jsx';
import { HrModule } from '../../features/hr/HrModule.jsx';
import { OperationsModule } from '../../features/operations/OperationsModule.jsx';
import { CoursesModule } from '../../features/courses/CoursesModule.jsx';

export const moduleRegistry = [
  {
    id: 'dashboard',
    label: 'Home',
    group: 'Workspace',
    description: 'Executive overview for the HR SaaS application.',
    icon: Home,
    component: DashboardModule,
    status: 'active',
  },
  {
    id: 'hr',
    label: 'HR',
    group: 'People',
    description: 'Future home for employees, attendance, payroll, leave, and compliance workflows.',
    icon: UsersRound,
    component: HrModule,
    status: 'planned',
  },
  {
    id: 'operations',
    label: 'Operations',
    group: 'Business',
    description: 'Future home for operating workflows, approvals, assets, and internal requests.',
    icon: BriefcaseBusiness,
    component: OperationsModule,
    status: 'planned',
  },
  {
    id: 'courses',
    label: 'Courses',
    group: 'Learning',
    description: 'Future home for employee learning, training programs, certifications, and course progress.',
    icon: BookOpen,
    component: CoursesModule,
    status: 'planned',
  },
];
