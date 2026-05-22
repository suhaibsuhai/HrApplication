import { useMemo, useState } from "react";
import { CalendarCheck, Clock3, Send } from "lucide-react";

import { createAttendanceRecord, createLeaveRequest } from "../api/hrApi.js";
import HrModuleShell from "../components/HrModuleShell.jsx";
import { useHrBootstrap } from "../hooks/useHrBootstrap.js";
import { minutesToHours, shortTime, statusLabel } from "../utils/hrFormat.js";

const attendanceFormDefaults = {
  employeeId: "",
  workDate: new Date().toISOString().slice(0, 10),
  checkInTime: "",
  checkOutTime: "",
  workedMinutes: "",
  lateMinutes: "0",
  status: "PRESENT",
  source: "MANUAL_ADMIN",
  note: "",
};

const leaveFormDefaults = {
  employeeId: "",
  leavePolicyId: "",
  startDate: "",
  endDate: "",
  daysRequested: "",
  reason: "",
};

function employeeName(employees, employeeId) {
  return employees.find((employee) => employee.id === employeeId)?.fullName ?? "Employee";
}

export default function AttendanceLeavePage({ onModuleChange, onOpenSubModule }) {
  const { data, setData } = useHrBootstrap();
  const employees = data.employees ?? [];
  const leavePolicies = data.settings?.leavePolicies ?? [];
  const [attendanceForm, setAttendanceForm] = useState(attendanceFormDefaults);
  const [leaveForm, setLeaveForm] = useState(leaveFormDefaults);

  const attendanceSummary = useMemo(() => {
    const records = data.attendanceRecords ?? [];
    return {
      present: records.filter((record) => record.status === "PRESENT").length,
      leave: records.filter((record) => record.status === "ON_LEAVE").length,
      absent: records.filter((record) => record.status === "ABSENT").length,
    };
  }, [data.attendanceRecords]);

  function updateAttendance(event) {
    const { name, value } = event.target;
    setAttendanceForm((previous) => ({ ...previous, [name]: value }));
  }

  function updateLeave(event) {
    const { name, value } = event.target;
    setLeaveForm((previous) => ({ ...previous, [name]: value }));
  }

  async function saveAttendance(event) {
    event.preventDefault();

    const payload = {
      ...attendanceForm,
      employeeId: attendanceForm.employeeId,
      checkInTime: attendanceForm.checkInTime || null,
      checkOutTime: attendanceForm.checkOutTime || null,
      workedMinutes: Number(attendanceForm.workedMinutes || 0),
      lateMinutes: Number(attendanceForm.lateMinutes || 0),
      earlyLeaveMinutes: 0,
      overtimeMinutes: 0,
    };

    try {
      const record = await createAttendanceRecord(payload);
      setData((previous) => ({
        ...previous,
        attendanceRecords: [record, ...(previous.attendanceRecords ?? [])],
      }));
    } catch {
      const record = {
        id: crypto.randomUUID(),
        ...payload,
        employeeName: employeeName(employees, payload.employeeId),
      };
      setData((previous) => ({
        ...previous,
        attendanceRecords: [record, ...(previous.attendanceRecords ?? [])],
      }));
    } finally {
      setAttendanceForm(attendanceFormDefaults);
    }
  }

  async function submitLeave(event) {
    event.preventDefault();

    const payload = {
      ...leaveForm,
      leavePolicyId: leaveForm.leavePolicyId || null,
      daysRequested: leaveForm.daysRequested === "" ? null : Number(leaveForm.daysRequested),
    };

    try {
      const request = await createLeaveRequest(payload);
      setData((previous) => ({
        ...previous,
        leaveRequests: [request, ...(previous.leaveRequests ?? [])],
        approvalRequests: [
          {
            id: request.approvalRequestId ?? crypto.randomUUID(),
            module: "LEAVE_REQUEST",
            title: `Leave request for ${request.employeeName}`,
            requesterName: request.employeeName,
            status: "PENDING",
            currentStep: "Manager Review",
          },
          ...(previous.approvalRequests ?? []),
        ],
      }));
    } catch {
      const request = {
        id: crypto.randomUUID(),
        ...payload,
        employeeName: employeeName(employees, payload.employeeId),
        leavePolicyName: leavePolicies.find((policy) => policy.id === payload.leavePolicyId)?.name,
        status: "SUBMITTED",
      };
      setData((previous) => ({
        ...previous,
        leaveRequests: [request, ...(previous.leaveRequests ?? [])],
      }));
    } finally {
      setLeaveForm(leaveFormDefaults);
    }
  }

  return (
    <HrModuleShell
      description="Record employee login/logout from the system, allow manual admin corrections, track absence, and manage leave requests with approval-ready records."
      onModuleChange={onModuleChange}
      onOpenSubModule={onOpenSubModule}
      sectionId="attendance-leave"
      title="Time & Leave"
    >

        <div className="hr-overview-strip">
          <article><span>Present records</span><strong>{attendanceSummary.present}</strong><p>Login and manual</p></article>
          <article><span>On leave</span><strong>{attendanceSummary.leave}</strong><p>Tracked by day</p></article>
          <article><span>Pending leave</span><strong>{(data.leaveRequests ?? []).filter((request) => request.status === "SUBMITTED").length}</strong><p>Manager approval</p></article>
        </div>

        <div className="hr-two-column-layout">
          <section className="hr-data-panel">
            <div className="hr-panel-header">
              <div>
                <p className="eyebrow">Time Tracking</p>
                <h3>Manual Attendance Entry</h3>
              </div>
              <Clock3 size={22} />
            </div>

            <form className="hr-form-grid single-column" onSubmit={saveAttendance}>
              <label className="hr-form-field">
                <span>Employee</span>
                <select name="employeeId" value={attendanceForm.employeeId} onChange={updateAttendance} required>
                  <option value="">Select employee</option>
                  {employees.map((employee) => (
                    <option key={employee.id} value={employee.id}>{employee.fullName}</option>
                  ))}
                </select>
              </label>
              <label className="hr-form-field">
                <span>Work Date</span>
                <input name="workDate" type="date" value={attendanceForm.workDate} onChange={updateAttendance} required />
              </label>
              <label className="hr-form-field">
                <span>Check In</span>
                <input name="checkInTime" type="time" value={attendanceForm.checkInTime} onChange={updateAttendance} />
              </label>
              <label className="hr-form-field">
                <span>Check Out</span>
                <input name="checkOutTime" type="time" value={attendanceForm.checkOutTime} onChange={updateAttendance} />
              </label>
              <label className="hr-form-field">
                <span>Worked Minutes</span>
                <input name="workedMinutes" type="number" min="0" value={attendanceForm.workedMinutes} onChange={updateAttendance} />
              </label>
              <label className="hr-form-field">
                <span>Status</span>
                <select name="status" value={attendanceForm.status} onChange={updateAttendance}>
                  <option value="PRESENT">Present</option>
                  <option value="ABSENT">Absent</option>
                  <option value="ON_LEAVE">On Leave</option>
                  <option value="HALF_DAY">Half Day</option>
                </select>
              </label>
              <label className="hr-form-field full-span">
                <span>Note</span>
                <input name="note" value={attendanceForm.note} onChange={updateAttendance} placeholder="Reason for manual entry or correction" />
              </label>
              <button className="submit-employee-button" type="submit">
                <CalendarCheck size={16} />
                Save Attendance
              </button>
            </form>
          </section>

          <section className="hr-data-panel">
            <div className="hr-panel-header">
              <div>
                <p className="eyebrow">Leave</p>
                <h3>Submit Leave Request</h3>
              </div>
              <Send size={22} />
            </div>

            <form className="hr-form-grid single-column" onSubmit={submitLeave}>
              <label className="hr-form-field">
                <span>Employee</span>
                <select name="employeeId" value={leaveForm.employeeId} onChange={updateLeave} required>
                  <option value="">Select employee</option>
                  {employees.map((employee) => (
                    <option key={employee.id} value={employee.id}>{employee.fullName}</option>
                  ))}
                </select>
              </label>
              <label className="hr-form-field">
                <span>Leave Policy</span>
                <select name="leavePolicyId" value={leaveForm.leavePolicyId} onChange={updateLeave}>
                  <option value="">Use employee policy</option>
                  {leavePolicies.map((policy) => (
                    <option key={policy.id} value={policy.id}>{policy.name}</option>
                  ))}
                </select>
              </label>
              <label className="hr-form-field">
                <span>Start Date</span>
                <input name="startDate" type="date" value={leaveForm.startDate} onChange={updateLeave} required />
              </label>
              <label className="hr-form-field">
                <span>End Date</span>
                <input name="endDate" type="date" value={leaveForm.endDate} onChange={updateLeave} required />
              </label>
              <label className="hr-form-field">
                <span>Days</span>
                <input name="daysRequested" type="number" min="0" step="0.5" value={leaveForm.daysRequested} onChange={updateLeave} />
              </label>
              <label className="hr-form-field full-span">
                <span>Reason</span>
                <input name="reason" value={leaveForm.reason} onChange={updateLeave} />
              </label>
              <button className="submit-employee-button" type="submit">
                <Send size={16} />
                Submit Leave
              </button>
            </form>
          </section>
        </div>

        <div className="hr-table-grid">
          <section className="hr-data-panel">
            <div className="hr-panel-header">
              <div>
                <p className="eyebrow">Attendance</p>
                <h3>Recent Records</h3>
              </div>
            </div>
            <div className="employee-table-scroll">
              <table className="employee-table compact">
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Date</th>
                    <th>In</th>
                    <th>Out</th>
                    <th>Worked</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {(data.attendanceRecords ?? []).map((record) => (
                    <tr key={record.id}>
                      <td>{record.employeeName}</td>
                      <td>{record.workDate}</td>
                      <td>{shortTime(record.checkInTime)}</td>
                      <td>{shortTime(record.checkOutTime)}</td>
                      <td>{minutesToHours(record.workedMinutes)}</td>
                      <td><span className={`record-status ${record.status === "PRESENT" ? "success" : "warning"}`}>{statusLabel(record.status)}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="hr-data-panel">
            <div className="hr-panel-header">
              <div>
                <p className="eyebrow">Leave Balance</p>
                <h3>Employee Balances</h3>
              </div>
            </div>
            <div className="employee-table-scroll">
              <table className="employee-table compact">
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Type</th>
                    <th>Balance</th>
                    <th>Used</th>
                    <th>Policy</th>
                  </tr>
                </thead>
                <tbody>
                  {(data.leaveBalances ?? []).map((balance) => (
                    <tr key={balance.id}>
                      <td>{balance.employeeName}</td>
                      <td>{balance.leaveType}</td>
                      <td>{balance.balanceDays}</td>
                      <td>{balance.usedDays}</td>
                      <td>{balance.leavePolicyName}</td>
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
