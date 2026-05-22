import { useMemo, useState } from "react";
import { Plus, Save } from "lucide-react";

import { createEmployee } from "../api/hrApi.js";
import HrModuleShell from "../components/HrModuleShell.jsx";
import { useHrBootstrap } from "../hooks/useHrBootstrap.js";
import { displayValue, findById, formatCurrency } from "../utils/hrFormat.js";

const emptyForm = {
  employeeCode: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  hireDate: "",
  status: "ACTIVE",
  employmentType: "PERMANENT",
  departmentId: "",
  locationId: "",
  jobRoleId: "",
  managerEmployeeId: "",
  shiftId: "",
  attendanceRuleId: "",
  leavePolicyId: "",
  contractCategoryId: "",
  contractPipelineId: "",
  salaryStructureId: "",
  salaryAmount: "",
  bankName: "",
  bankAccountNumber: "",
  iban: "",
  nationality: "",
  dateOfBirth: "",
  emergencyContactName: "",
  emergencyContactPhone: "",
};

function toNullable(value) {
  return value === "" ? null : value;
}

function makeLocalEmployee(form, settings) {
  const department = findById(settings.departments ?? [], form.departmentId);
  const location = findById(settings.locations ?? [], form.locationId);
  const role = findById(settings.jobRoles ?? [], form.jobRoleId);
  const manager = findById(settings.employees ?? [], form.managerEmployeeId);
  const shift = findById(settings.shifts ?? [], form.shiftId);
  const attendanceRule = findById(settings.attendanceRules ?? [], form.attendanceRuleId);
  const leavePolicy = findById(settings.leavePolicies ?? [], form.leavePolicyId);
  const category = findById(settings.contractCategories ?? [], form.contractCategoryId);
  const pipeline = findById(settings.contractPipelines ?? [], form.contractPipelineId);
  const salaryStructure = findById(settings.salaryStructures ?? [], form.salaryStructureId);

  return {
    id: crypto.randomUUID(),
    ...form,
    fullName: `${form.firstName} ${form.lastName}`.trim(),
    salaryAmount: Number(form.salaryAmount || salaryStructure?.baseAmount || 0),
    departmentName: department?.name,
    locationName: location?.name,
    jobRoleName: role?.title,
    managerName: manager?.fullName,
    shiftName: shift?.name,
    attendanceRuleName: attendanceRule?.name,
    leavePolicyName: leavePolicy?.name,
    contractCategoryName: category?.name,
    contractPipelineName: pipeline?.name,
    currentPipelineStageId: pipeline?.stages?.[0]?.id,
    currentPipelineStageName: pipeline?.stages?.[0]?.name,
    salaryStructureName: salaryStructure?.name,
  };
}

export default function EmployeeManagementPage({ onModuleChange, onOpenSubModule }) {
  const { data, setData } = useHrBootstrap();
  const settings = data.settings ?? {};
  const employees = data.employees ?? [];
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(employees[0]?.id);
  const [form, setForm] = useState(emptyForm);
  const [isSaving, setIsSaving] = useState(false);

  const selectedEmployee = useMemo(
    () => employees.find((employee) => employee.id === selectedEmployeeId) ?? employees[0],
    [employees, selectedEmployeeId]
  );

  const enrichedSettings = { ...settings, employees };

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  }

  function handleCategoryChange(event) {
    const categoryId = event.target.value;
    const category = findById(settings.contractCategories ?? [], categoryId);

    setForm((previous) => ({
      ...previous,
      contractCategoryId: categoryId,
      employmentType: category?.employmentType ?? previous.employmentType,
      jobRoleId: category?.defaultJobRoleId ?? previous.jobRoleId,
      shiftId: category?.defaultShiftId ?? previous.shiftId,
      attendanceRuleId: category?.attendanceRuleId ?? previous.attendanceRuleId,
      leavePolicyId: category?.leavePolicyId ?? previous.leavePolicyId,
      salaryStructureId: category?.defaultSalaryStructureId ?? previous.salaryStructureId,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSaving(true);

    const payload = {
      ...form,
      userAccountId: null,
      departmentId: toNullable(form.departmentId),
      locationId: toNullable(form.locationId),
      jobRoleId: toNullable(form.jobRoleId),
      managerEmployeeId: toNullable(form.managerEmployeeId),
      shiftId: toNullable(form.shiftId),
      attendanceRuleId: toNullable(form.attendanceRuleId),
      leavePolicyId: toNullable(form.leavePolicyId),
      contractCategoryId: toNullable(form.contractCategoryId),
      contractPipelineId: toNullable(form.contractPipelineId),
      salaryStructureId: toNullable(form.salaryStructureId),
      hireDate: toNullable(form.hireDate),
      dateOfBirth: toNullable(form.dateOfBirth),
      salaryAmount: form.salaryAmount === "" ? null : Number(form.salaryAmount),
    };

    try {
      const createdEmployee = await createEmployee(payload);
      setData((previous) => ({
        ...previous,
        employees: [...(previous.employees ?? []), createdEmployee],
        dashboard: {
          ...(previous.dashboard ?? {}),
          activeEmployees: Number(previous.dashboard?.activeEmployees ?? 0) + 1,
        },
      }));
      setSelectedEmployeeId(createdEmployee.id);
    } catch {
      const createdEmployee = makeLocalEmployee(form, enrichedSettings);
      setData((previous) => ({
        ...previous,
        employees: [...(previous.employees ?? []), createdEmployee],
        dashboard: {
          ...(previous.dashboard ?? {}),
          activeEmployees: Number(previous.dashboard?.activeEmployees ?? 0) + 1,
        },
      }));
      setSelectedEmployeeId(createdEmployee.id);
    } finally {
      setForm(emptyForm);
      setIsSaving(false);
    }
  }

  return (
    <HrModuleShell
      description="Create employee records and connect each person to department, role, shift, leave policy, contract pipeline, attendance rule, and salary structure."
      onModuleChange={onModuleChange}
      onOpenSubModule={onOpenSubModule}
      sectionId="employee-management"
      title="Employees"
    >

        <div className="employee-admin-layout">
          <aside className="employee-directory-panel">
            <div className="employee-list-header compact">
              <div>
                <p className="eyebrow">Directory</p>
                <h3>Employees</h3>
              </div>
              <span className="employee-count-pill">{employees.length}</span>
            </div>

            <div className="employee-directory-list">
              {employees.map((employee) => (
                <button
                  className={`employee-directory-row ${selectedEmployee?.id === employee.id ? "selected" : ""}`}
                  key={employee.id}
                  type="button"
                  onClick={() => setSelectedEmployeeId(employee.id)}
                >
                  <span className="employee-avatar">
                    {employee.firstName?.[0]}
                    {employee.lastName?.[0]}
                  </span>
                  <span>
                    <strong>{employee.fullName}</strong>
                    <small>{employee.employeeCode} - {employee.jobRoleName}</small>
                  </span>
                  <span className="employee-row-status">{employee.status}</span>
                </button>
              ))}
            </div>
          </aside>

          <div className="employee-record-panel">
            {selectedEmployee && (
              <>
                <div className="employee-record-header">
                  <div>
                    <p className="eyebrow">Selected Employee</p>
                    <h3>{selectedEmployee.fullName}</h3>
                  </div>
                  <div className="employee-record-badges">
                    <span className="employee-contract-pill">{selectedEmployee.employmentType}</span>
                    <span className="employee-contract-pill">{selectedEmployee.currentPipelineStageName}</span>
                  </div>
                </div>

                <div className="employee-details-grid compact">
                  <div><span>Department</span><strong>{displayValue(selectedEmployee.departmentName)}</strong></div>
                  <div><span>Role</span><strong>{displayValue(selectedEmployee.jobRoleName)}</strong></div>
                  <div><span>Shift</span><strong>{displayValue(selectedEmployee.shiftName)}</strong></div>
                  <div><span>Contract</span><strong>{displayValue(selectedEmployee.contractCategoryName)}</strong></div>
                  <div><span>Salary</span><strong>{formatCurrency(selectedEmployee.salaryAmount)}</strong></div>
                </div>
              </>
            )}

            <form className="hr-form-panel" onSubmit={handleSubmit}>
              <div className="hr-panel-header">
                <div>
                  <p className="eyebrow">New Employee</p>
                  <h3>Map employee to HR configuration</h3>
                </div>
                <button className="submit-employee-button" type="submit" disabled={isSaving}>
                  <Save size={16} />
                  {isSaving ? "Saving" : "Save Employee"}
                </button>
              </div>

              <div className="hr-form-grid">
                <label className="hr-form-field">
                  <span>Employee Code</span>
                  <input name="employeeCode" value={form.employeeCode} onChange={handleChange} placeholder="EMP003" required />
                </label>
                <label className="hr-form-field">
                  <span>First Name</span>
                  <input name="firstName" value={form.firstName} onChange={handleChange} required />
                </label>
                <label className="hr-form-field">
                  <span>Last Name</span>
                  <input name="lastName" value={form.lastName} onChange={handleChange} required />
                </label>
                <label className="hr-form-field">
                  <span>Email</span>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required />
                </label>
                <label className="hr-form-field">
                  <span>Phone</span>
                  <input name="phone" value={form.phone} onChange={handleChange} />
                </label>
                <label className="hr-form-field">
                  <span>Hire Date</span>
                  <input name="hireDate" type="date" value={form.hireDate} onChange={handleChange} />
                </label>
                <label className="hr-form-field">
                  <span>Department</span>
                  <select name="departmentId" value={form.departmentId} onChange={handleChange}>
                    <option value="">Select department</option>
                    {(settings.departments ?? []).map((department) => (
                      <option key={department.id} value={department.id}>{department.name}</option>
                    ))}
                  </select>
                </label>
                <label className="hr-form-field">
                  <span>Location</span>
                  <select name="locationId" value={form.locationId} onChange={handleChange}>
                    <option value="">Select location</option>
                    {(settings.locations ?? []).map((location) => (
                      <option key={location.id} value={location.id}>{location.name}</option>
                    ))}
                  </select>
                </label>
                <label className="hr-form-field">
                  <span>Contract Category</span>
                  <select name="contractCategoryId" value={form.contractCategoryId} onChange={handleCategoryChange}>
                    <option value="">Select category</option>
                    {(settings.contractCategories ?? []).map((category) => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </label>
                <label className="hr-form-field">
                  <span>Job Role</span>
                  <select name="jobRoleId" value={form.jobRoleId} onChange={handleChange}>
                    <option value="">Select role</option>
                    {(settings.jobRoles ?? []).map((role) => (
                      <option key={role.id} value={role.id}>{role.title}</option>
                    ))}
                  </select>
                </label>
                <label className="hr-form-field">
                  <span>Manager</span>
                  <select name="managerEmployeeId" value={form.managerEmployeeId} onChange={handleChange}>
                    <option value="">No manager</option>
                    {employees.map((employee) => (
                      <option key={employee.id} value={employee.id}>{employee.fullName}</option>
                    ))}
                  </select>
                </label>
                <label className="hr-form-field">
                  <span>Shift</span>
                  <select name="shiftId" value={form.shiftId} onChange={handleChange}>
                    <option value="">Select shift</option>
                    {(settings.shifts ?? []).map((shift) => (
                      <option key={shift.id} value={shift.id}>{shift.name}</option>
                    ))}
                  </select>
                </label>
                <label className="hr-form-field">
                  <span>Attendance Rule</span>
                  <select name="attendanceRuleId" value={form.attendanceRuleId} onChange={handleChange}>
                    <option value="">Select attendance rule</option>
                    {(settings.attendanceRules ?? []).map((rule) => (
                      <option key={rule.id} value={rule.id}>{rule.name}</option>
                    ))}
                  </select>
                </label>
                <label className="hr-form-field">
                  <span>Leave Policy</span>
                  <select name="leavePolicyId" value={form.leavePolicyId} onChange={handleChange}>
                    <option value="">Select leave policy</option>
                    {(settings.leavePolicies ?? []).map((policy) => (
                      <option key={policy.id} value={policy.id}>{policy.name}</option>
                    ))}
                  </select>
                </label>
                <label className="hr-form-field">
                  <span>Contract Pipeline</span>
                  <select name="contractPipelineId" value={form.contractPipelineId} onChange={handleChange}>
                    <option value="">Select pipeline</option>
                    {(settings.contractPipelines ?? []).map((pipeline) => (
                      <option key={pipeline.id} value={pipeline.id}>{pipeline.name}</option>
                    ))}
                  </select>
                </label>
                <label className="hr-form-field">
                  <span>Salary Structure</span>
                  <select name="salaryStructureId" value={form.salaryStructureId} onChange={handleChange}>
                    <option value="">Select salary structure</option>
                    {(settings.salaryStructures ?? []).map((structure) => (
                      <option key={structure.id} value={structure.id}>{structure.name}</option>
                    ))}
                  </select>
                </label>
                <label className="hr-form-field">
                  <span>Salary Amount</span>
                  <input name="salaryAmount" type="number" min="0" value={form.salaryAmount} onChange={handleChange} />
                </label>
                <label className="hr-form-field">
                  <span>Bank Name</span>
                  <input name="bankName" value={form.bankName} onChange={handleChange} />
                </label>
                <label className="hr-form-field">
                  <span>Account Number</span>
                  <input name="bankAccountNumber" value={form.bankAccountNumber} onChange={handleChange} />
                </label>
                <label className="hr-form-field">
                  <span>IBAN</span>
                  <input name="iban" value={form.iban} onChange={handleChange} />
                </label>
                <label className="hr-form-field">
                  <span>Nationality</span>
                  <input name="nationality" value={form.nationality} onChange={handleChange} />
                </label>
                <label className="hr-form-field">
                  <span>Date of Birth</span>
                  <input name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={handleChange} />
                </label>
                <label className="hr-form-field">
                  <span>Emergency Name</span>
                  <input name="emergencyContactName" value={form.emergencyContactName} onChange={handleChange} />
                </label>
                <label className="hr-form-field">
                  <span>Emergency Phone</span>
                  <input name="emergencyContactPhone" value={form.emergencyContactPhone} onChange={handleChange} />
                </label>
              </div>

              <button className="secondary-action-button hr-mobile-submit" type="submit">
                <Plus size={16} />
                Add Employee
              </button>
            </form>
          </div>
        </div>
    </HrModuleShell>
  );
}
