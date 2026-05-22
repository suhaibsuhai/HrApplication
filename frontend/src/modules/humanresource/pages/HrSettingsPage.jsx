import { useState } from "react";
import { Building2, Clock3, Save, SlidersHorizontal, UserRoundCog } from "lucide-react";

import {
  createAttendanceRule,
  createDepartment,
  createJobRole,
  createLeavePolicy,
  createShift,
} from "../api/hrApi.js";
import HrModuleShell from "../components/HrModuleShell.jsx";
import { useHrBootstrap } from "../hooks/useHrBootstrap.js";

const defaultForms = {
  department: { code: "", name: "", description: "" },
  role: { code: "", title: "", family: "", level: "", description: "" },
  shift: { code: "", name: "", startTime: "09:00", endTime: "17:30", breakMinutes: 30, timezone: "Europe/Dublin" },
  attendance: { code: "", name: "", expectedMinutes: 480, lateGraceMinutes: 10, allowManualEntry: true, approvalRequiredForCorrection: true },
  leave: { code: "", name: "", annualDays: 20, sickDays: 10, allowNegativeBalance: false, accrualType: "YEARLY" },
};

function appendSetting(previous, key, record) {
  return {
    ...previous,
    settings: {
      ...(previous.settings ?? {}),
      [key]: [...(previous.settings?.[key] ?? []), record],
    },
  };
}

export default function HrSettingsPage({ onModuleChange, onOpenSubModule }) {
  const { data, setData } = useHrBootstrap();
  const settings = data.settings ?? {};
  const [forms, setForms] = useState(defaultForms);

  function updateForm(section, event) {
    const { name, value, type, checked } = event.target;
    setForms((previous) => ({
      ...previous,
      [section]: {
        ...previous[section],
        [name]: type === "checkbox" ? checked : value,
      },
    }));
  }

  async function saveSetting(event, section, apiCall, key, fallbackMapper = (value) => value) {
    event.preventDefault();
    const payload = fallbackMapper(forms[section]);

    try {
      const created = await apiCall(payload);
      setData((previous) => appendSetting(previous, key, created));
    } catch {
      setData((previous) =>
        appendSetting(previous, key, {
          id: crypto.randomUUID(),
          ...payload,
          active: true,
        })
      );
    } finally {
      setForms((previous) => ({ ...previous, [section]: defaultForms[section] }));
    }
  }

  return (
    <HrModuleShell
      description="Company-level setup for roles, departments, shifts, attendance, leave, payroll rules, and reusable HR configuration."
      onModuleChange={onModuleChange}
      onOpenSubModule={onOpenSubModule}
      sectionId="hr-settings"
      title="Settings"
    >

        <div className="hr-overview-strip">
          <article><span>Departments</span><strong>{(settings.departments ?? []).length}</strong><p>Company structure</p></article>
          <article><span>Job roles</span><strong>{(settings.jobRoles ?? []).length}</strong><p>Role library</p></article>
          <article><span>Leave policies</span><strong>{(settings.leavePolicies ?? []).length}</strong><p>Balance rules</p></article>
        </div>

        <div className="hr-settings-grid">
          <section className="hr-data-panel">
            <div className="hr-panel-header">
              <div>
                <p className="eyebrow">Structure</p>
                <h3>Departments</h3>
              </div>
              <Building2 size={22} />
            </div>
            <form
              className="hr-form-grid single-column"
              onSubmit={(event) => saveSetting(event, "department", createDepartment, "departments")}
            >
              <label className="hr-form-field">
                <span>Code</span>
                <input name="code" value={forms.department.code} onChange={(event) => updateForm("department", event)} required />
              </label>
              <label className="hr-form-field">
                <span>Name</span>
                <input name="name" value={forms.department.name} onChange={(event) => updateForm("department", event)} required />
              </label>
              <button className="submit-employee-button" type="submit"><Save size={16} />Save</button>
            </form>
            <div className="settings-chip-list">
              {(settings.departments ?? []).map((department) => <span key={department.id}>{department.name}</span>)}
            </div>
          </section>

          <section className="hr-data-panel">
            <div className="hr-panel-header">
              <div>
                <p className="eyebrow">Roles</p>
                <h3>Job Roles</h3>
              </div>
              <UserRoundCog size={22} />
            </div>
            <form
              className="hr-form-grid single-column"
              onSubmit={(event) => saveSetting(event, "role", createJobRole, "jobRoles")}
            >
              <label className="hr-form-field">
                <span>Code</span>
                <input name="code" value={forms.role.code} onChange={(event) => updateForm("role", event)} required />
              </label>
              <label className="hr-form-field">
                <span>Title</span>
                <input name="title" value={forms.role.title} onChange={(event) => updateForm("role", event)} required />
              </label>
              <label className="hr-form-field">
                <span>Family</span>
                <input name="family" value={forms.role.family} onChange={(event) => updateForm("role", event)} />
              </label>
              <label className="hr-form-field">
                <span>Level</span>
                <input name="level" value={forms.role.level} onChange={(event) => updateForm("role", event)} />
              </label>
              <button className="submit-employee-button" type="submit"><Save size={16} />Save</button>
            </form>
            <div className="settings-chip-list">
              {(settings.jobRoles ?? []).map((role) => <span key={role.id}>{role.title}</span>)}
            </div>
          </section>

          <section className="hr-data-panel">
            <div className="hr-panel-header">
              <div>
                <p className="eyebrow">Time</p>
                <h3>Shifts</h3>
              </div>
              <Clock3 size={22} />
            </div>
            <form
              className="hr-form-grid single-column"
              onSubmit={(event) => saveSetting(event, "shift", createShift, "shifts", (value) => ({ ...value, breakMinutes: Number(value.breakMinutes || 0) }))}
            >
              <label className="hr-form-field">
                <span>Code</span>
                <input name="code" value={forms.shift.code} onChange={(event) => updateForm("shift", event)} required />
              </label>
              <label className="hr-form-field">
                <span>Name</span>
                <input name="name" value={forms.shift.name} onChange={(event) => updateForm("shift", event)} required />
              </label>
              <label className="hr-form-field">
                <span>Start</span>
                <input name="startTime" type="time" value={forms.shift.startTime} onChange={(event) => updateForm("shift", event)} required />
              </label>
              <label className="hr-form-field">
                <span>End</span>
                <input name="endTime" type="time" value={forms.shift.endTime} onChange={(event) => updateForm("shift", event)} required />
              </label>
              <button className="submit-employee-button" type="submit"><Save size={16} />Save</button>
            </form>
            <div className="settings-chip-list">
              {(settings.shifts ?? []).map((shift) => <span key={shift.id}>{shift.name}</span>)}
            </div>
          </section>

          <section className="hr-data-panel">
            <div className="hr-panel-header">
              <div>
                <p className="eyebrow">Rules</p>
                <h3>Attendance & Leave</h3>
              </div>
              <SlidersHorizontal size={22} />
            </div>
            <form
              className="hr-form-grid single-column"
              onSubmit={(event) => saveSetting(event, "attendance", createAttendanceRule, "attendanceRules", (value) => ({
                ...value,
                expectedMinutes: Number(value.expectedMinutes || 480),
                lateGraceMinutes: Number(value.lateGraceMinutes || 0),
              }))}
            >
              <label className="hr-form-field">
                <span>Attendance Code</span>
                <input name="code" value={forms.attendance.code} onChange={(event) => updateForm("attendance", event)} required />
              </label>
              <label className="hr-form-field">
                <span>Attendance Rule</span>
                <input name="name" value={forms.attendance.name} onChange={(event) => updateForm("attendance", event)} required />
              </label>
              <button className="submit-employee-button" type="submit"><Save size={16} />Save Attendance</button>
            </form>

            <form
              className="hr-form-grid single-column nested-settings-form"
              onSubmit={(event) => saveSetting(event, "leave", createLeavePolicy, "leavePolicies", (value) => ({
                ...value,
                annualDays: Number(value.annualDays || 0),
                sickDays: Number(value.sickDays || 0),
              }))}
            >
              <label className="hr-form-field">
                <span>Leave Code</span>
                <input name="code" value={forms.leave.code} onChange={(event) => updateForm("leave", event)} required />
              </label>
              <label className="hr-form-field">
                <span>Leave Policy</span>
                <input name="name" value={forms.leave.name} onChange={(event) => updateForm("leave", event)} required />
              </label>
              <label className="hr-form-field">
                <span>Annual Days</span>
                <input name="annualDays" type="number" value={forms.leave.annualDays} onChange={(event) => updateForm("leave", event)} />
              </label>
              <label className="hr-form-field">
                <span>Sick Days</span>
                <input name="sickDays" type="number" value={forms.leave.sickDays} onChange={(event) => updateForm("leave", event)} />
              </label>
              <button className="submit-employee-button" type="submit"><Save size={16} />Save Leave</button>
            </form>
          </section>
        </div>
    </HrModuleShell>
  );
}
