const tenantId = "11111111-1111-1111-1111-111111111111";

const departments = [
  { id: "10000000-0000-0000-0000-000000000001", code: "HR", name: "Human Resources", description: "People operations and payroll coordination.", active: true },
  { id: "10000000-0000-0000-0000-000000000002", code: "ENG", name: "Engineering", description: "Product engineering and platform delivery.", active: true },
  { id: "10000000-0000-0000-0000-000000000003", code: "OPS", name: "Operations", description: "Shift-based service delivery.", active: true },
];

const locations = [
  { id: "20000000-0000-0000-0000-000000000001", code: "DUB-HQ", name: "Dublin HQ", country: "Ireland", timezone: "Europe/Dublin", active: true },
  { id: "20000000-0000-0000-0000-000000000002", code: "REMOTE", name: "Remote Workforce", country: "Global", timezone: "Europe/Dublin", active: true },
];

const jobRoles = [
  { id: "30000000-0000-0000-0000-000000000001", code: "HR-MGR", title: "HR Manager", family: "People", level: "Manager", active: true },
  { id: "30000000-0000-0000-0000-000000000002", code: "SWE-I", title: "Software Engineer I", family: "Engineering", level: "IC1", active: true },
  { id: "30000000-0000-0000-0000-000000000003", code: "OPS-ASSOC", title: "Operations Associate", family: "Operations", level: "Associate", active: true },
];

const shifts = [
  { id: "40000000-0000-0000-0000-000000000001", code: "STD-9-5", name: "Standard Office", startTime: "09:00:00", endTime: "17:30:00", breakMinutes: 30, timezone: "Europe/Dublin", active: true },
  { id: "40000000-0000-0000-0000-000000000002", code: "OPS-EARLY", name: "Operations Early", startTime: "06:00:00", endTime: "14:00:00", breakMinutes: 30, timezone: "Europe/Dublin", active: true },
];

const attendanceRules = [
  { id: "50000000-0000-0000-0000-000000000001", code: "HYBRID-STD", name: "Hybrid login plus manual correction", expectedMinutes: 480, lateGraceMinutes: 10, allowManualEntry: true, approvalRequiredForCorrection: true, active: true },
  { id: "50000000-0000-0000-0000-000000000002", code: "SHIFT-STRICT", name: "Shift attendance with manager approval", expectedMinutes: 450, lateGraceMinutes: 5, allowManualEntry: true, approvalRequiredForCorrection: true, active: true },
];

const leavePolicies = [
  { id: "60000000-0000-0000-0000-000000000001", code: "STD-STAFF", name: "Standard Staff Leave", annualDays: 22, sickDays: 10, allowNegativeBalance: false, accrualType: "YEARLY", active: true },
  { id: "60000000-0000-0000-0000-000000000002", code: "PROBATION", name: "Probation Leave Policy", annualDays: 8, sickDays: 5, allowNegativeBalance: false, accrualType: "MONTHLY", active: true },
];

const salaryStructures = [
  { id: "70000000-0000-0000-0000-000000000001", code: "MONTHLY-EUR", name: "Monthly Salaried Staff", payBasis: "MONTHLY", currency: "EUR", baseAmount: 4200, overtimeEligible: false, active: true },
  { id: "70000000-0000-0000-0000-000000000002", code: "HOURLY-OPS", name: "Hourly Operations Staff", payBasis: "HOURLY", currency: "EUR", baseAmount: 18, overtimeEligible: true, active: true },
];

const contractCategories = [
  {
    id: "80000000-0000-0000-0000-000000000001",
    name: "6 Month Contract to Permanent",
    employmentType: "CONTRACT",
    defaultJobRoleId: jobRoles[1].id,
    defaultJobRoleName: jobRoles[1].title,
    defaultShiftId: shifts[0].id,
    defaultShiftName: shifts[0].name,
    durationMonths: 6,
    noticePeriodDays: 30,
    probationRequired: true,
    reviewRequired: true,
    leavePolicyId: leavePolicies[1].id,
    leavePolicyName: leavePolicies[1].name,
    attendanceRuleId: attendanceRules[0].id,
    attendanceRuleName: attendanceRules[0].name,
    defaultSalaryStructureId: salaryStructures[0].id,
    defaultSalaryStructureName: salaryStructures[0].name,
    active: true,
  },
  {
    id: "80000000-0000-0000-0000-000000000002",
    name: "Direct Permanent",
    employmentType: "PERMANENT",
    defaultJobRoleId: jobRoles[0].id,
    defaultJobRoleName: jobRoles[0].title,
    defaultShiftId: shifts[0].id,
    defaultShiftName: shifts[0].name,
    durationMonths: null,
    noticePeriodDays: 60,
    probationRequired: false,
    reviewRequired: false,
    leavePolicyId: leavePolicies[0].id,
    leavePolicyName: leavePolicies[0].name,
    attendanceRuleId: attendanceRules[0].id,
    attendanceRuleName: attendanceRules[0].name,
    defaultSalaryStructureId: salaryStructures[0].id,
    defaultSalaryStructureName: salaryStructures[0].name,
    active: true,
  },
];

const contractPipelines = [
  {
    id: "90000000-0000-0000-0000-000000000001",
    name: "Software Engineer - 6 Month to Permanent",
    roleId: jobRoles[1].id,
    roleName: jobRoles[1].title,
    employmentType: "CONTRACT",
    contractBehavior: "6_MONTH_THEN_PERMANENT",
    description: "Probation, three month review, final permanent decision.",
    employeeCount: 1,
    active: true,
    stages: [
      { id: "91000000-0000-0000-0000-000000000001", stageOrder: 1, name: "Contract Started", durationMonths: 0, approvalRequired: false, targetStatus: "ACTIVE" },
      { id: "91000000-0000-0000-0000-000000000002", stageOrder: 2, name: "3 Month Review", durationMonths: 3, approvalRequired: true, targetStatus: "UNDER_REVIEW" },
      { id: "91000000-0000-0000-0000-000000000003", stageOrder: 3, name: "6 Month Final Decision", durationMonths: 3, approvalRequired: true, targetStatus: "PERMANENT_DECISION" },
    ],
  },
  {
    id: "90000000-0000-0000-0000-000000000002",
    name: "HR Manager - Direct Permanent",
    roleId: jobRoles[0].id,
    roleName: jobRoles[0].title,
    employmentType: "PERMANENT",
    contractBehavior: "DIRECT_PERMANENT",
    description: "Direct permanent hiring track with HR approval.",
    employeeCount: 1,
    active: true,
    stages: [
      { id: "91000000-0000-0000-0000-000000000004", stageOrder: 1, name: "Permanent Offer", durationMonths: 0, approvalRequired: true, targetStatus: "ACTIVE" },
      { id: "91000000-0000-0000-0000-000000000005", stageOrder: 2, name: "Onboarding Complete", durationMonths: 0, approvalRequired: false, targetStatus: "PERMANENT" },
    ],
  },
];

const employees = [
  {
    id: "bbbbbbbb-0000-0000-0000-000000000001",
    employeeCode: "EMP001",
    firstName: "Aisha",
    lastName: "Rahman",
    fullName: "Aisha Rahman",
    email: "hr.manager@demo.test",
    phone: "+353 1 555 0101",
    hireDate: "2025-05-06",
    status: "ACTIVE",
    employmentType: "PERMANENT",
    departmentId: departments[0].id,
    departmentName: departments[0].name,
    locationId: locations[0].id,
    locationName: locations[0].name,
    jobRoleId: jobRoles[0].id,
    jobRoleName: jobRoles[0].title,
    shiftId: shifts[0].id,
    shiftName: shifts[0].name,
    attendanceRuleId: attendanceRules[0].id,
    attendanceRuleName: attendanceRules[0].name,
    leavePolicyId: leavePolicies[0].id,
    leavePolicyName: leavePolicies[0].name,
    contractCategoryId: contractCategories[1].id,
    contractCategoryName: contractCategories[1].name,
    contractPipelineId: contractPipelines[1].id,
    contractPipelineName: contractPipelines[1].name,
    currentPipelineStageId: contractPipelines[1].stages[1].id,
    currentPipelineStageName: contractPipelines[1].stages[1].name,
    salaryStructureId: salaryStructures[0].id,
    salaryStructureName: salaryStructures[0].name,
    salaryAmount: 5400,
    bankName: "Bank of Ireland",
    bankAccountNumber: "**** 4101",
    iban: "IE29 **** **** 4101",
    nationality: "Irish",
    dateOfBirth: "1990-04-12",
    emergencyContactName: "Omar Rahman",
    emergencyContactPhone: "+353 87 555 0001",
  },
  {
    id: "bbbbbbbb-0000-0000-0000-000000000002",
    employeeCode: "EMP002",
    firstName: "Liam",
    lastName: "O'Connor",
    fullName: "Liam O'Connor",
    email: "liam.oconnor@demo.test",
    phone: "+353 1 555 0102",
    hireDate: "2026-03-15",
    status: "ACTIVE",
    employmentType: "CONTRACT",
    departmentId: departments[1].id,
    departmentName: departments[1].name,
    locationId: locations[0].id,
    locationName: locations[0].name,
    jobRoleId: jobRoles[1].id,
    jobRoleName: jobRoles[1].title,
    managerEmployeeId: "bbbbbbbb-0000-0000-0000-000000000001",
    managerName: "Aisha Rahman",
    shiftId: shifts[0].id,
    shiftName: shifts[0].name,
    attendanceRuleId: attendanceRules[0].id,
    attendanceRuleName: attendanceRules[0].name,
    leavePolicyId: leavePolicies[1].id,
    leavePolicyName: leavePolicies[1].name,
    contractCategoryId: contractCategories[0].id,
    contractCategoryName: contractCategories[0].name,
    contractPipelineId: contractPipelines[0].id,
    contractPipelineName: contractPipelines[0].name,
    currentPipelineStageId: contractPipelines[0].stages[1].id,
    currentPipelineStageName: contractPipelines[0].stages[1].name,
    salaryStructureId: salaryStructures[0].id,
    salaryStructureName: salaryStructures[0].name,
    salaryAmount: 4200,
    bankName: "AIB",
    bankAccountNumber: "**** 2290",
    iban: "IE64 **** **** 2290",
    nationality: "Irish",
    dateOfBirth: "1998-10-19",
    emergencyContactName: "Maeve O'Connor",
    emergencyContactPhone: "+353 87 555 0002",
  },
];

export const demoHrBootstrap = {
  tenantId,
  dashboard: {
    activeEmployees: 2,
    presentToday: 2,
    absentToday: 0,
    pendingLeave: 1,
    pendingApprovals: 2,
    employeesInPipelines: 2,
    openPayrollRuns: 1,
  },
  settings: {
    departments,
    locations,
    jobRoles,
    shifts,
    attendanceRules,
    leavePolicies,
    contractCategories,
    contractPipelines,
    salaryStructures,
  },
  employees,
  attendanceRecords: [
    { id: "cccccccc-0000-0000-0000-000000000001", employeeId: employees[0].id, employeeName: employees[0].fullName, workDate: "2026-05-21", checkInTime: "08:58:00", checkOutTime: "17:35:00", workedMinutes: 487, lateMinutes: 0, overtimeMinutes: 7, status: "PRESENT", source: "SYSTEM_LOGIN", note: "Captured from employee login/logout." },
    { id: "cccccccc-0000-0000-0000-000000000002", employeeId: employees[1].id, employeeName: employees[1].fullName, workDate: "2026-05-21", checkInTime: "09:16:00", checkOutTime: null, workedMinutes: 0, lateMinutes: 6, overtimeMinutes: 0, status: "PRESENT", source: "SYSTEM_LOGIN", note: "Late after grace period." },
    { id: "cccccccc-0000-0000-0000-000000000003", employeeId: employees[1].id, employeeName: employees[1].fullName, workDate: "2026-05-20", checkInTime: null, checkOutTime: null, workedMinutes: 0, lateMinutes: 0, overtimeMinutes: 0, status: "ON_LEAVE", source: "MANUAL_ADMIN", note: "Approved leave day." },
  ],
  leaveBalances: [
    { id: "dddddddd-0000-0000-0000-000000000001", employeeId: employees[0].id, employeeName: employees[0].fullName, leavePolicyName: leavePolicies[0].name, leaveType: "Annual Leave", balanceDays: 22, usedDays: 4, adjustedDays: 0 },
    { id: "dddddddd-0000-0000-0000-000000000002", employeeId: employees[0].id, employeeName: employees[0].fullName, leavePolicyName: leavePolicies[0].name, leaveType: "Sick Leave", balanceDays: 10, usedDays: 1, adjustedDays: 0 },
    { id: "dddddddd-0000-0000-0000-000000000003", employeeId: employees[1].id, employeeName: employees[1].fullName, leavePolicyName: leavePolicies[1].name, leaveType: "Annual Leave", balanceDays: 8, usedDays: 1, adjustedDays: 0 },
  ],
  leaveRequests: [
    { id: "eeeeeeee-0000-0000-0000-000000000001", employeeId: employees[1].id, employeeName: employees[1].fullName, leavePolicyId: leavePolicies[1].id, leavePolicyName: leavePolicies[1].name, startDate: "2026-05-29", endDate: "2026-05-30", daysRequested: 2, status: "SUBMITTED", reason: "Family appointment", approvalRequestId: "ffffffff-0000-0000-0000-000000000001" },
  ],
  contractCategories,
  contractPipelines,
  salaryStructures,
  approvalRequests: [
    { id: "ffffffff-0000-0000-0000-000000000001", module: "LEAVE_REQUEST", title: "Leave request for Liam O'Connor", requesterEmployeeId: employees[1].id, requesterName: employees[1].fullName, status: "PENDING", currentStep: "Manager Review", submittedAt: "2026-05-21T10:00:00Z" },
    { id: "ffffffff-0000-0000-0000-000000000002", module: "CONTRACT_STAGE_CHANGE", title: "3 month review for Liam O'Connor", requesterEmployeeId: employees[0].id, requesterName: employees[0].fullName, status: "PENDING", currentStep: "HR Review", submittedAt: "2026-05-20T10:00:00Z" },
  ],
  payrollRuns: [
    { id: "12121212-0000-0000-0000-000000000001", name: "May 2026 Payroll", periodStart: "2026-05-01", periodEnd: "2026-05-31", payDate: "2026-05-28", status: "CALCULATED", grossPay: 9600, totalDeductions: 0, netPay: 9600 },
  ],
  payslips: [
    { id: "13131313-0000-0000-0000-000000000001", payrollRunName: "May 2026 Payroll", employeeName: employees[0].fullName, grossPay: 5400, totalDeductions: 0, netPay: 5400, status: "DRAFT" },
    { id: "13131313-0000-0000-0000-000000000002", payrollRunName: "May 2026 Payroll", employeeName: employees[1].fullName, grossPay: 4200, totalDeductions: 0, netPay: 4200, status: "DRAFT" },
  ],
};
