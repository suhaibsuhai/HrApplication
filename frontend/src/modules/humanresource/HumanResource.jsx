import {
  BadgeCheck,
  Banknote,
  CalendarClock,
  ClipboardCheck,
  Plus,
  Settings,
  UserRoundCog,
} from "lucide-react";

import HrWorkspaceFrame from "./components/HrWorkspaceFrame.jsx";
import { hrNavigationItems } from "./config/hrNavigation.js";
import { useHrBootstrap } from "./hooks/useHrBootstrap.js";

const quickActions = [
  { id: "employee-management", label: "Add employee", icon: Plus },
  { id: "attendance-leave", label: "Record attendance", icon: CalendarClock },
  { id: "payroll", label: "Run payroll", icon: Banknote },
];

const setupSteps = [
  {
    id: "hr-settings",
    title: "Set company rules",
    text: "Departments, roles, shifts, attendance rules, leave policies, pay cycles.",
    icon: Settings,
  },
  {
    id: "contract-setup",
    title: "Define contract categories",
    text: "Reusable employment rules for permanent, probation, contract, intern, or part-time staff.",
    icon: BadgeCheck,
  },
  {
    id: "employee-management",
    title: "Create employees",
    text: "Map each employee to role, manager, shift, leave, contract pipeline, and salary.",
    icon: UserRoundCog,
  },
];

export default function HumanResource({ onModuleChange, onOpenSubModule }) {
  const { data, isLoading, source } = useHrBootstrap();
  const dashboard = data.dashboard ?? {};
  const pendingApprovals = data.approvalRequests ?? [];
  const payrollRuns = data.payrollRuns ?? [];

  const metrics = [
    { label: "Employees", value: dashboard.activeEmployees ?? 0, hint: "Active profiles" },
    { label: "Present today", value: dashboard.presentToday ?? 0, hint: "Time records" },
    { label: "Pending", value: dashboard.pendingApprovals ?? 0, hint: "Approvals" },
    { label: "Payroll", value: dashboard.openPayrollRuns ?? 0, hint: "Open runs" },
  ];

  const meta = (
    <div className={`hr-api-pill ${source === "api" ? "connected" : ""}`}>
      <ClipboardCheck size={16} />
      <span>{isLoading ? "Loading" : source === "api" ? "Backend connected" : "Demo data"}</span>
    </div>
  );

  const actions = quickActions.map((action) => {
    const Icon = action.icon;

    return (
      <button
        className="submit-employee-button"
        key={action.id}
        onClick={() => onOpenSubModule(action.id)}
        type="button"
      >
        <Icon size={16} />
        {action.label}
      </button>
    );
  });

  return (
    <HrWorkspaceFrame
      actions={actions}
      description="Manage employee setup, attendance, leave, contracts, approvals, payroll, and payslips from one company-ready HR workspace."
      meta={meta}
      onModuleChange={onModuleChange}
      onOpenSubModule={onOpenSubModule}
      sectionId="overview"
      title="Overview"
    >
      <div className="hr-kpi-row">
        {metrics.map((metric) => (
          <article key={metric.label}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
            <small>{metric.hint}</small>
          </article>
        ))}
      </div>

      <div className="hr-admin-grid">
        <section className="hr-primary-panel">
          <div className="hr-panel-header">
            <div>
              <p className="eyebrow">Recommended Order</p>
              <h3>Start with setup, then employees</h3>
            </div>
          </div>

          <div className="hr-next-steps">
            {setupSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <button
                  className="hr-next-step"
                  key={step.id}
                  onClick={() => onOpenSubModule(step.id)}
                  type="button"
                >
                  <span className="hr-step-number">{index + 1}</span>
                  <span className="hr-category-icon blue">
                    <Icon size={18} />
                  </span>
                  <span>
                    <strong>{step.title}</strong>
                    <small>{step.text}</small>
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="hr-side-panel">
          <div className="hr-panel-header">
            <div>
              <p className="eyebrow">Needs Attention</p>
              <h3>Work queue</h3>
            </div>
          </div>

          <div className="hr-attention-list">
            <button type="button" onClick={() => onOpenSubModule("approvals")}>
              <BadgeCheck size={18} />
              <span>
                <strong>{pendingApprovals.length} approvals</strong>
                <small>Leave, contract, attendance, and payroll decisions</small>
              </span>
            </button>
            <button type="button" onClick={() => onOpenSubModule("payroll")}>
              <Banknote size={18} />
              <span>
                <strong>{payrollRuns.length} payroll runs</strong>
                <small>Calculated or draft payslips waiting for review</small>
              </span>
            </button>
            <button type="button" onClick={() => onOpenSubModule("attendance-leave")}>
              <CalendarClock size={18} />
              <span>
                <strong>{dashboard.pendingLeave ?? 0} leave requests</strong>
                <small>Balances and requests connected to employee policies</small>
              </span>
            </button>
          </div>
        </section>
      </div>

      <section className="hr-primary-panel hr-full-panel">
        <div className="hr-panel-header">
          <div>
            <p className="eyebrow">Workspace</p>
            <h3>HR areas</h3>
          </div>
        </div>

        <div className="hr-section-list">
          {hrNavigationItems
            .filter((item) => item.id !== "overview")
            .map((item) => {
              const Icon = item.icon;

              return (
                <button key={item.id} onClick={() => onOpenSubModule(item.id)} type="button">
                  <Icon size={19} />
                  <span>
                    <strong>{item.label}</strong>
                    <small>{item.description}</small>
                  </span>
                </button>
              );
            })}
        </div>
      </section>
    </HrWorkspaceFrame>
  );
}
