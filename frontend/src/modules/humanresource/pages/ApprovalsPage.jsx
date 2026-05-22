import { BadgeCheck, CheckCircle2, Clock4 } from "lucide-react";

import HrModuleShell from "../components/HrModuleShell.jsx";
import { useHrBootstrap } from "../hooks/useHrBootstrap.js";
import { statusLabel } from "../utils/hrFormat.js";

export default function ApprovalsPage({ onModuleChange, onOpenSubModule }) {
  const { data } = useHrBootstrap();
  const approvals = data.approvalRequests ?? [];

  return (
    <HrModuleShell
      description="Shared approval queue for leave, attendance correction, contract stage changes, permanent conversion, employee status changes, and payroll review."
      onModuleChange={onModuleChange}
      onOpenSubModule={onOpenSubModule}
      sectionId="approvals"
      title="Approvals"
    >

        <div className="hr-overview-strip">
          <article><span>Pending</span><strong>{approvals.filter((approval) => approval.status === "PENDING").length}</strong><p>Awaiting action</p></article>
          <article><span>Approval modules</span><strong>6</strong><p>Leave, attendance, contract, payroll</p></article>
          <article><span>Workflow style</span><strong>Config</strong><p>Company-specific routing</p></article>
        </div>

        <div className="hr-two-column-layout">
          <section className="hr-data-panel">
            <div className="hr-panel-header">
              <div>
                <p className="eyebrow">Queue</p>
                <h3>Approval Requests</h3>
              </div>
              <BadgeCheck size={22} />
            </div>

            <div className="approval-list">
              {approvals.map((approval) => (
                <article className="approval-card" key={approval.id}>
                  <span className="hr-category-icon blue">
                    {approval.status === "PENDING" ? <Clock4 size={18} /> : <CheckCircle2 size={18} />}
                  </span>
                  <div>
                    <strong>{approval.title}</strong>
                    <span>{statusLabel(approval.module)} - {approval.currentStep}</span>
                    <small>Requester: {approval.requesterName ?? "System"}</small>
                  </div>
                  <span className={`record-status ${approval.status === "PENDING" ? "warning" : "success"}`}>
                    {approval.status}
                  </span>
                </article>
              ))}
            </div>
          </section>

          <section className="hr-data-panel">
            <div className="hr-panel-header">
              <div>
                <p className="eyebrow">Workflow Templates</p>
                <h3>Recommended backend setup</h3>
              </div>
            </div>

            <div className="workflow-stack">
              <article>
                <strong>Leave request</strong>
                <span>Employee to Manager to HR</span>
              </article>
              <article>
                <strong>Attendance correction</strong>
                <span>Employee/Admin to Supervisor to HR</span>
              </article>
              <article>
                <strong>Contract conversion</strong>
                <span>Manager to HR Manager to Director</span>
              </article>
              <article>
                <strong>Payroll run</strong>
                <span>Payroll Admin to HR Manager to Finance</span>
              </article>
            </div>
          </section>
        </div>
    </HrModuleShell>
  );
}
