const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";
const TENANT_ID =
  import.meta.env.VITE_TENANT_ID ?? "11111111-1111-1111-1111-111111111111";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: options.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Tenant-Id": TENANT_ID,
      ...(options.headers ?? {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(detail || `Request failed with status ${response.status}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export function loadHrBootstrap() {
  return request("/api/v1/hr/bootstrap");
}

export function createEmployee(payload) {
  return request("/api/v1/hr/employees", {
    method: "POST",
    body: payload,
  });
}

export function createDepartment(payload) {
  return request("/api/v1/hr/settings/departments", {
    method: "POST",
    body: payload,
  });
}

export function createJobRole(payload) {
  return request("/api/v1/hr/settings/job-roles", {
    method: "POST",
    body: payload,
  });
}

export function createShift(payload) {
  return request("/api/v1/hr/settings/shifts", {
    method: "POST",
    body: payload,
  });
}

export function createAttendanceRule(payload) {
  return request("/api/v1/hr/settings/attendance-rules", {
    method: "POST",
    body: payload,
  });
}

export function createLeavePolicy(payload) {
  return request("/api/v1/hr/settings/leave-policies", {
    method: "POST",
    body: payload,
  });
}

export function createAttendanceRecord(payload) {
  return request("/api/v1/hr/attendance/records", {
    method: "POST",
    body: payload,
  });
}

export function createLeaveRequest(payload) {
  return request("/api/v1/hr/leave/requests", {
    method: "POST",
    body: payload,
  });
}

export function createContractCategory(payload) {
  return request("/api/v1/hr/contracts/categories", {
    method: "POST",
    body: payload,
  });
}

export function createContractPipeline(payload) {
  return request("/api/v1/hr/contracts/pipelines", {
    method: "POST",
    body: payload,
  });
}

export function createPayrollRun(payload) {
  return request("/api/v1/hr/payroll/runs", {
    method: "POST",
    body: payload,
  });
}
