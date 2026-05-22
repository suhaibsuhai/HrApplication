import { useState } from "react";
import { FileSliders, Save } from "lucide-react";

import { createContractCategory } from "../api/hrApi.js";
import HrModuleShell from "../components/HrModuleShell.jsx";
import { useHrBootstrap } from "../hooks/useHrBootstrap.js";
import { findById } from "../utils/hrFormat.js";

const emptyCategory = {
  name: "",
  employmentType: "CONTRACT",
  defaultJobRoleId: "",
  defaultShiftId: "",
  durationMonths: "",
  noticePeriodDays: "",
  probationRequired: true,
  reviewRequired: true,
  leavePolicyId: "",
  attendanceRuleId: "",
  defaultSalaryStructureId: "",
};

function nullable(value) {
  return value === "" ? null : value;
}

function localCategory(form, settings) {
  const role = findById(settings.jobRoles ?? [], form.defaultJobRoleId);
  const shift = findById(settings.shifts ?? [], form.defaultShiftId);
  const leavePolicy = findById(settings.leavePolicies ?? [], form.leavePolicyId);
  const attendanceRule = findById(settings.attendanceRules ?? [], form.attendanceRuleId);
  const salaryStructure = findById(settings.salaryStructures ?? [], form.defaultSalaryStructureId);

  return {
    id: crypto.randomUUID(),
    ...form,
    durationMonths: form.durationMonths === "" ? null : Number(form.durationMonths),
    noticePeriodDays: form.noticePeriodDays === "" ? null : Number(form.noticePeriodDays),
    defaultJobRoleName: role?.title,
    defaultShiftName: shift?.name,
    leavePolicyName: leavePolicy?.name,
    attendanceRuleName: attendanceRule?.name,
    defaultSalaryStructureName: salaryStructure?.name,
    active: true,
  };
}

export default function ContractSetupPage({ onModuleChange, onOpenSubModule }) {
  const { data, setData } = useHrBootstrap();
  const settings = data.settings ?? {};
  const [form, setForm] = useState(emptyCategory);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function saveCategory(event) {
    event.preventDefault();
    const payload = {
      ...form,
      defaultJobRoleId: nullable(form.defaultJobRoleId),
      defaultShiftId: nullable(form.defaultShiftId),
      leavePolicyId: nullable(form.leavePolicyId),
      attendanceRuleId: nullable(form.attendanceRuleId),
      defaultSalaryStructureId: nullable(form.defaultSalaryStructureId),
      durationMonths: form.durationMonths === "" ? null : Number(form.durationMonths),
      noticePeriodDays: form.noticePeriodDays === "" ? null : Number(form.noticePeriodDays),
    };

    try {
      const category = await createContractCategory(payload);
      setData((previous) => ({
        ...previous,
        contractCategories: [...(previous.contractCategories ?? []), category],
        settings: {
          ...(previous.settings ?? {}),
          contractCategories: [...(previous.settings?.contractCategories ?? []), category],
        },
      }));
    } catch {
      const category = localCategory(form, settings);
      setData((previous) => ({
        ...previous,
        contractCategories: [...(previous.contractCategories ?? []), category],
        settings: {
          ...(previous.settings ?? {}),
          contractCategories: [...(previous.settings?.contractCategories ?? []), category],
        },
      }));
    } finally {
      setForm(emptyCategory);
    }
  }

  return (
    <HrModuleShell
      description="Build reusable company-level contract categories. These settings become selectable when HR creates employees or assigns them to a pipeline."
      onModuleChange={onModuleChange}
      onOpenSubModule={onOpenSubModule}
      sectionId="contract-setup"
      title="Contract Setup"
    >

        <div className="contract-layout">
          <section className="contract-library-panel">
            <div className="hr-panel-header">
              <div>
                <p className="eyebrow">Contract Categories</p>
                <h3>Reusable setup records</h3>
              </div>
              <FileSliders size={22} />
            </div>

            <div className="hr-category-grid two">
              {(data.contractCategories ?? []).map((category) => (
                <article className="hr-category-card compact" key={category.id}>
                  <span className="hr-category-icon purple"><FileSliders size={20} /></span>
                  <div className="hr-category-copy">
                    <h3>{category.name}</h3>
                    <p>{category.employmentType} - {category.durationMonths ? `${category.durationMonths} months` : "No fixed duration"}</p>
                  </div>
                  <div className="hr-task-list">
                    <span>{category.defaultJobRoleName ?? "Any role"}</span>
                    <span>{category.defaultShiftName ?? "Any shift"}</span>
                    <span>{category.leavePolicyName ?? "No leave policy"}</span>
                    <span>{category.reviewRequired ? "Review required" : "No review"}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="contract-detail-panel">
            <div className="hr-panel-header">
              <div>
                <p className="eyebrow">New Category</p>
                <h3>Create contract category</h3>
              </div>
            </div>

            <form className="hr-form-grid single-column" onSubmit={saveCategory}>
              <label className="hr-form-field full-span">
                <span>Name</span>
                <input name="name" value={form.name} onChange={handleChange} placeholder="3 Month Probation to Permanent" required />
              </label>
              <label className="hr-form-field">
                <span>Employment Type</span>
                <select name="employmentType" value={form.employmentType} onChange={handleChange}>
                  <option value="PERMANENT">Permanent</option>
                  <option value="CONTRACT">Contract</option>
                  <option value="INTERN">Intern</option>
                  <option value="PART_TIME">Part Time</option>
                  <option value="TEMPORARY">Temporary</option>
                </select>
              </label>
              <label className="hr-form-field">
                <span>Default Role</span>
                <select name="defaultJobRoleId" value={form.defaultJobRoleId} onChange={handleChange}>
                  <option value="">Any role</option>
                  {(settings.jobRoles ?? []).map((role) => (
                    <option key={role.id} value={role.id}>{role.title}</option>
                  ))}
                </select>
              </label>
              <label className="hr-form-field">
                <span>Default Shift</span>
                <select name="defaultShiftId" value={form.defaultShiftId} onChange={handleChange}>
                  <option value="">Any shift</option>
                  {(settings.shifts ?? []).map((shift) => (
                    <option key={shift.id} value={shift.id}>{shift.name}</option>
                  ))}
                </select>
              </label>
              <label className="hr-form-field">
                <span>Duration Months</span>
                <input name="durationMonths" type="number" min="0" value={form.durationMonths} onChange={handleChange} />
              </label>
              <label className="hr-form-field">
                <span>Notice Days</span>
                <input name="noticePeriodDays" type="number" min="0" value={form.noticePeriodDays} onChange={handleChange} />
              </label>
              <label className="hr-form-field">
                <span>Leave Policy</span>
                <select name="leavePolicyId" value={form.leavePolicyId} onChange={handleChange}>
                  <option value="">No default</option>
                  {(settings.leavePolicies ?? []).map((policy) => (
                    <option key={policy.id} value={policy.id}>{policy.name}</option>
                  ))}
                </select>
              </label>
              <label className="hr-form-field">
                <span>Attendance Rule</span>
                <select name="attendanceRuleId" value={form.attendanceRuleId} onChange={handleChange}>
                  <option value="">No default</option>
                  {(settings.attendanceRules ?? []).map((rule) => (
                    <option key={rule.id} value={rule.id}>{rule.name}</option>
                  ))}
                </select>
              </label>
              <label className="hr-form-field">
                <span>Salary Structure</span>
                <select name="defaultSalaryStructureId" value={form.defaultSalaryStructureId} onChange={handleChange}>
                  <option value="">No default</option>
                  {(settings.salaryStructures ?? []).map((structure) => (
                    <option key={structure.id} value={structure.id}>{structure.name}</option>
                  ))}
                </select>
              </label>
              <label className="hr-checkbox-field">
                <input name="probationRequired" type="checkbox" checked={form.probationRequired} onChange={handleChange} />
                <span>Probation required</span>
              </label>
              <label className="hr-checkbox-field">
                <input name="reviewRequired" type="checkbox" checked={form.reviewRequired} onChange={handleChange} />
                <span>Review required</span>
              </label>
              <button className="submit-employee-button" type="submit">
                <Save size={16} />
                Save Category
              </button>
            </form>
          </section>
        </div>
    </HrModuleShell>
  );
}
