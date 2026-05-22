import { useMemo, useState } from "react";
import { Banknote, FileText, PlayCircle } from "lucide-react";

import { createPayrollRun } from "../api/hrApi.js";
import HrModuleShell from "../components/HrModuleShell.jsx";
import { useHrBootstrap } from "../hooks/useHrBootstrap.js";
import { formatCurrency } from "../utils/hrFormat.js";

const payrollDefaults = {
  name: "June 2026 Payroll",
  periodStart: "2026-06-01",
  periodEnd: "2026-06-30",
  payDate: "2026-06-28",
};

export default function PayrollPage({ onModuleChange, onOpenSubModule }) {
  const { data, setData } = useHrBootstrap();
  const [form, setForm] = useState(payrollDefaults);
  const salaryStructures = data.salaryStructures ?? data.settings?.salaryStructures ?? [];

  const payrollSummary = useMemo(() => {
    return (data.payrollRuns ?? []).reduce(
      (summary, run) => ({
        gross: summary.gross + Number(run.grossPay ?? 0),
        net: summary.net + Number(run.netPay ?? 0),
      }),
      { gross: 0, net: 0 }
    );
  }, [data.payrollRuns]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  }

  async function runPayroll(event) {
    event.preventDefault();

    try {
      const run = await createPayrollRun(form);
      setData((previous) => ({
        ...previous,
        payrollRuns: [run, ...(previous.payrollRuns ?? [])],
      }));
    } catch {
      const grossPay = (data.employees ?? []).reduce(
        (total, employee) => total + Number(employee.salaryAmount ?? 0),
        0
      );
      const run = {
        id: crypto.randomUUID(),
        ...form,
        status: "CALCULATED",
        grossPay,
        totalDeductions: 0,
        netPay: grossPay,
      };
      setData((previous) => ({
        ...previous,
        payrollRuns: [run, ...(previous.payrollRuns ?? [])],
        payslips: [
          ...(previous.employees ?? []).map((employee) => ({
            id: crypto.randomUUID(),
            payrollRunName: run.name,
            employeeName: employee.fullName,
            grossPay: Number(employee.salaryAmount ?? 0),
            totalDeductions: 0,
            netPay: Number(employee.salaryAmount ?? 0),
            status: "DRAFT",
          })),
          ...(previous.payslips ?? []),
        ],
      }));
    }
  }

  return (
    <HrModuleShell
      description="Payroll uses employee salary structures, attendance, leave, deductions, and manual adjustments to generate reviewable payslips."
      onModuleChange={onModuleChange}
      onOpenSubModule={onOpenSubModule}
      sectionId="payroll"
      title="Payroll"
    >

        <div className="hr-overview-strip">
          <article><span>Payroll runs</span><strong>{(data.payrollRuns ?? []).length}</strong><p>Draft and calculated</p></article>
          <article><span>Total gross</span><strong>{formatCurrency(payrollSummary.gross)}</strong><p>Current run history</p></article>
          <article><span>Total net</span><strong>{formatCurrency(payrollSummary.net)}</strong><p>After deductions</p></article>
        </div>

        <div className="hr-two-column-layout">
          <section className="hr-data-panel">
            <div className="hr-panel-header">
              <div>
                <p className="eyebrow">Payroll</p>
                <h3>Create Payroll Run</h3>
              </div>
              <Banknote size={22} />
            </div>

            <form className="hr-form-grid single-column" onSubmit={runPayroll}>
              <label className="hr-form-field full-span">
                <span>Name</span>
                <input name="name" value={form.name} onChange={handleChange} required />
              </label>
              <label className="hr-form-field">
                <span>Period Start</span>
                <input name="periodStart" type="date" value={form.periodStart} onChange={handleChange} required />
              </label>
              <label className="hr-form-field">
                <span>Period End</span>
                <input name="periodEnd" type="date" value={form.periodEnd} onChange={handleChange} required />
              </label>
              <label className="hr-form-field">
                <span>Pay Date</span>
                <input name="payDate" type="date" value={form.payDate} onChange={handleChange} required />
              </label>
              <button className="submit-employee-button" type="submit">
                <PlayCircle size={16} />
                Calculate Payroll
              </button>
            </form>

            <div className="workflow-stack compact-stack">
              {salaryStructures.map((structure) => (
                <article key={structure.id}>
                  <strong>{structure.name}</strong>
                  <span>{structure.payBasis} - {formatCurrency(structure.baseAmount, structure.currency)}</span>
                </article>
              ))}
            </div>
          </section>

          <section className="hr-data-panel">
            <div className="hr-panel-header">
              <div>
                <p className="eyebrow">Payslips</p>
                <h3>Generated Drafts</h3>
              </div>
              <FileText size={22} />
            </div>

            <div className="employee-table-scroll">
              <table className="employee-table compact">
                <thead>
                  <tr>
                    <th>Run</th>
                    <th>Employee</th>
                    <th>Gross</th>
                    <th>Deductions</th>
                    <th>Net</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {(data.payslips ?? []).map((payslip) => (
                    <tr key={payslip.id}>
                      <td>{payslip.payrollRunName}</td>
                      <td>{payslip.employeeName}</td>
                      <td>{formatCurrency(payslip.grossPay)}</td>
                      <td>{formatCurrency(payslip.totalDeductions)}</td>
                      <td>{formatCurrency(payslip.netPay)}</td>
                      <td><span className="record-status warning">{payslip.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
    </HrModuleShell>
  );
}
