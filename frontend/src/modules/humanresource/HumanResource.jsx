import { ArrowLeft } from "lucide-react";
import { useMemo, useState } from "react";

import { hrNavigationItems } from "./config/hrNavigation.js";
import { demoHrBootstrap } from "./data/demoHrData.js";

const progressCards = [
  {
    label: "Attendance",
    valueKey: "presentToday",
    totalKey: "activeEmployees",
    helper: "Present today",
  },
  {
    label: "Approvals",
    valueKey: "pendingApprovals",
    totalKey: "employeesInPipelines",
    helper: "Pending review",
  },
  {
    label: "Payroll",
    valueKey: "openPayrollRuns",
    totalKey: "activeEmployees",
    helper: "Open runs",
  },
];

const placeholderRows = {
  "hr-settings": ["Departments", "Locations", "Job roles", "Shifts"],
  "employee-management": ["Employee profile", "Assignments", "Personal details", "Salary details"],
  "attendance-leave": ["Attendance records", "Leave requests", "Leave balance", "Absence status"],
  "contract-setup": ["Contract categories", "Notice periods", "Probation rules", "Salary structures"],
  "contract-pipelines": ["Pipeline stages", "Contract reviews", "Permanent decisions", "Active tracks"],
  approvals: ["Leave approval", "Contract approval", "Payroll approval", "Manager review"],
  payroll: ["Payroll runs", "Payslips", "Gross pay", "Net pay"],
};

function getProgress(value, total) {
  if (!total) return 0;
  return Math.min(100, Math.round((value / total) * 100));
}

export default function HumanResource() {
  const [activePageId, setActivePageId] = useState("overview");
  const dashboard = demoHrBootstrap.dashboard;
  const activePage = hrNavigationItems.find((item) => item.id === activePageId);
  const moduleCards = hrNavigationItems.filter((item) => item.id !== "overview");

  const countCards = useMemo(
    () => [
      { label: "Active Employees", value: dashboard.activeEmployees, progress: 100 },
      { label: "Present Today", value: dashboard.presentToday, progress: getProgress(dashboard.presentToday, dashboard.activeEmployees) },
      { label: "Pending Leave", value: dashboard.pendingLeave, progress: getProgress(dashboard.pendingLeave, dashboard.activeEmployees) },
      { label: "Pending Approvals", value: dashboard.pendingApprovals, progress: getProgress(dashboard.pendingApprovals, dashboard.activeEmployees) },
    ],
    [dashboard]
  );

  if (activePageId !== "overview" && activePage) {
    const Icon = activePage.icon;
    const pageRows = placeholderRows[activePageId] ?? ["Overview", "Records", "Requests", "Reports"];

    return (
      <section className="hr-dashboard-shell">
        <div className="hr-page-header">
          <button className="hr-back-button" type="button" onClick={() => setActivePageId("overview")}>
            <ArrowLeft size={17} />
            Dashboard
          </button>
          <div className="hr-title-block">
            <span className="eyebrow">Human Resources</span>
            <h2>{activePage.label}</h2>
            <p>{activePage.description}</p>
          </div>
        </div>

        <div className="hr-simple-page-grid">
          {pageRows.map((row) => (
            <article className="hr-simple-page-card" key={row}>
              <Icon size={24} />
              <strong>{row}</strong>
              <span>Simple page placeholder</span>
            </article>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="hr-dashboard-shell">
      <div className="hr-page-header">
        <div className="hr-title-block">
          <span className="eyebrow">Human Resources</span>
          <h2>HR Dashboard</h2>
          <p>Counts, progress, and module navigation.</p>
        </div>
      </div>

      <div className="hr-count-grid">
        {countCards.map((card) => (
          <article className="hr-count-card" key={card.label}>
            <span>{card.label}</span>
            <strong>{card.value}</strong>
            <div className="hr-progress-track" aria-label={`${card.label} progress`}>
              <div style={{ width: `${card.progress}%` }} />
            </div>
            <small>{card.progress}% progress</small>
          </article>
        ))}
      </div>

      <div className="hr-progress-row">
        {progressCards.map((card) => {
          const value = dashboard[card.valueKey];
          const total = dashboard[card.totalKey];
          const progress = getProgress(value, total);

          return (
            <article className="hr-progress-card" key={card.label}>
              <div>
                <span>{card.label}</span>
                <strong>
                  {value}/{total}
                </strong>
              </div>
              <div className="hr-progress-track">
                <div style={{ width: `${progress}%` }} />
              </div>
              <small>{card.helper}</small>
            </article>
          );
        })}
      </div>

      <div className="hr-module-card-grid">
        {moduleCards.map((item) => {
          const Icon = item.icon;

          return (
            <button
              className="hr-module-card"
              key={item.id}
              type="button"
              onClick={() => setActivePageId(item.id)}
            >
              <span className="hr-module-card-icon">
                <Icon size={24} />
              </span>
              <strong>{item.label}</strong>
              <small>{item.description}</small>
            </button>
          );
        })}
      </div>
    </section>
  );
}
