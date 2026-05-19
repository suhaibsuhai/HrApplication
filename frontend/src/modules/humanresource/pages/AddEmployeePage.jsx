import { useState } from "react";
import { Plus, UserRound, Landmark, IdCard } from "lucide-react";
import SubModuleLayout from "../../../layouts/SubModuleLayout.jsx";

const initialEmployees = [
  {
    id: "EMP001",
    name: "John Smith",
    department: "Human Resources",
    role: "HR Manager",
    email: "john.smith@company.com",
    phone: "+971 50 123 4567",
    status: "Active",
    bankName: "Emirates NBD",
    accountNo: "**** 4582",
    iban: "AE07 **** **** 4582",
    salaryType: "Monthly",
    currency: "AED",
    dob: "12 Jan 1992",
    nationality: "UAE",
    gender: "Male",
    maritalStatus: "Single",
    emergencyContact: "+971 50 000 0000",
  },
];

const tabs = [
  { id: "employee", label: "Employee Details", icon: UserRound },
  { id: "bank", label: "Bank Details", icon: Landmark },
  { id: "personal", label: "Personal Details", icon: IdCard },
];

const emptyForm = {
  name: "",
  department: "",
  role: "",
  email: "",
  phone: "",
  status: "Active",
  bankName: "",
  accountNo: "",
  iban: "",
  salaryType: "",
  currency: "",
  dob: "",
  nationality: "",
  gender: "",
  maritalStatus: "",
  emergencyContact: "",
};

export default function AddEmployeePage({ onModuleChange }) {
  const [employees, setEmployees] = useState(initialEmployees);
  const [selectedEmployee, setSelectedEmployee] = useState(initialEmployees[0]);
  const [activeTab, setActiveTab] = useState("employee");
  const [isAdding, setIsAdding] = useState(false);
  const [wizardStep, setWizardStep] = useState(0);
  const [formData, setFormData] = useState(emptyForm);

  const wizardTabs = ["employee", "bank", "personal"];

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  }

  function handleStartAdd() {
    setIsAdding(true);
    setWizardStep(0);
    setActiveTab("employee");
    setFormData(emptyForm);
  }

  function handleSaveEmployee() {
    const newEmployee = {
      id: `EMP${String(employees.length + 1).padStart(3, "0")}`,
      ...formData,
    };

    setEmployees((previous) => [...previous, newEmployee]);
    setSelectedEmployee(newEmployee);
    setIsAdding(false);
    setWizardStep(0);
    setActiveTab("employee");
  }

  const displayData = isAdding ? formData : selectedEmployee;
  const currentWizardTab = wizardTabs[wizardStep];

  return (
    <SubModuleLayout title="Add Employee" onModuleChange={onModuleChange}>
      <section className="employee-page-compact">
        <div className="employee-details-panel compact">
          <div className="employee-details-tabs">
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              const isActive = isAdding
                ? currentWizardTab === tab.id
                : activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  className={`employee-details-tab ${isActive ? "active" : ""}`}
                  onClick={() => {
                    if (!isAdding) setActiveTab(tab.id);
                  }}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                  {isAdding && <small>{index + 1}</small>}
                </button>
              );
            })}
          </div>

          {!isAdding && (
            <>
              <div className="employee-section-header">
                <div>
                  <p className="eyebrow">
                    {activeTab === "employee" && "Employee Details"}
                    {activeTab === "bank" && "Bank Details"}
                    {activeTab === "personal" && "Personal Details"}
                  </p>
                  <h3>{selectedEmployee.name}</h3>
                </div>

                <span className="employee-status-pill">
                  {selectedEmployee.status}
                </span>
              </div>

              {activeTab === "employee" && (
                <div className="employee-details-grid compact">
                  <div><span>ID</span><strong>{displayData.id}</strong></div>
                  <div><span>Role</span><strong>{displayData.role}</strong></div>
                  <div><span>Department</span><strong>{displayData.department}</strong></div>
                  <div><span>Email</span><strong>{displayData.email}</strong></div>
                  <div><span>Phone</span><strong>{displayData.phone}</strong></div>
                </div>
              )}

              {activeTab === "bank" && (
                <div className="employee-details-grid compact">
                  <div><span>Bank Name</span><strong>{displayData.bankName}</strong></div>
                  <div><span>Account No</span><strong>{displayData.accountNo}</strong></div>
                  <div><span>IBAN</span><strong>{displayData.iban}</strong></div>
                  <div><span>Salary Type</span><strong>{displayData.salaryType}</strong></div>
                  <div><span>Currency</span><strong>{displayData.currency}</strong></div>
                </div>
              )}

              {activeTab === "personal" && (
                <div className="employee-details-grid compact">
                  <div><span>DOB</span><strong>{displayData.dob}</strong></div>
                  <div><span>Nationality</span><strong>{displayData.nationality}</strong></div>
                  <div><span>Gender</span><strong>{displayData.gender}</strong></div>
                  <div><span>Marital Status</span><strong>{displayData.maritalStatus}</strong></div>
                  <div><span>Emergency Contact</span><strong>{displayData.emergencyContact}</strong></div>
                </div>
              )}
            </>
          )}

          {isAdding && (
            <div className="employee-wizard-card">
              <div className="employee-section-header">
                <div>
                  <p className="eyebrow">Add Employee Wizard</p>
                  <h3>
                    {currentWizardTab === "employee" && "Employee Details"}
                    {currentWizardTab === "bank" && "Bank Details"}
                    {currentWizardTab === "personal" && "Personal Details"}
                  </h3>
                </div>
              </div>

              {currentWizardTab === "employee" && (
                <div className="employee-form compact">
                  <input name="name" placeholder="Employee Name" value={formData.name} onChange={handleChange} />
                  <input name="department" placeholder="Department" value={formData.department} onChange={handleChange} />
                  <input name="role" placeholder="Role" value={formData.role} onChange={handleChange} />
                  <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                  <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
                  <select name="status" value={formData.status} onChange={handleChange}>
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
              )}

              {currentWizardTab === "bank" && (
                <div className="employee-form compact">
                  <input name="bankName" placeholder="Bank Name" value={formData.bankName} onChange={handleChange} />
                  <input name="accountNo" placeholder="Account Number" value={formData.accountNo} onChange={handleChange} />
                  <input name="iban" placeholder="IBAN" value={formData.iban} onChange={handleChange} />
                  <input name="salaryType" placeholder="Salary Type" value={formData.salaryType} onChange={handleChange} />
                  <input name="currency" placeholder="Currency" value={formData.currency} onChange={handleChange} />
                </div>
              )}

              {currentWizardTab === "personal" && (
                <div className="employee-form compact">
                  <input name="dob" placeholder="Date of Birth" value={formData.dob} onChange={handleChange} />
                  <input name="nationality" placeholder="Nationality" value={formData.nationality} onChange={handleChange} />
                  <input name="gender" placeholder="Gender" value={formData.gender} onChange={handleChange} />
                  <input name="maritalStatus" placeholder="Marital Status" value={formData.maritalStatus} onChange={handleChange} />
                  <input name="emergencyContact" placeholder="Emergency Contact" value={formData.emergencyContact} onChange={handleChange} />
                </div>
              )}

              <div className="wizard-actions">
                <button
                  type="button"
                  className="secondary-action-button"
                  onClick={() => {
                    setIsAdding(false);
                    setWizardStep(0);
                  }}
                >
                  Cancel
                </button>

                {wizardStep > 0 && (
                  <button
                    type="button"
                    className="secondary-action-button"
                    onClick={() => setWizardStep((step) => step - 1)}
                  >
                    Back
                  </button>
                )}

                {wizardStep < wizardTabs.length - 1 ? (
                  <button
                    type="button"
                    className="submit-employee-button"
                    onClick={() => setWizardStep((step) => step + 1)}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="button"
                    className="submit-employee-button"
                    onClick={handleSaveEmployee}
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="employee-list-panel compact">
          <div className="employee-list-header compact">
            <div>
              <p className="eyebrow">Employee List</p>
              <h3>Employees</h3>
            </div>

            <button
              className="add-employee-icon-button"
              type="button"
              aria-label="Add employee"
              title="Add employee"
              onClick={handleStartAdd}
            >
              <Plus size={22} />
            </button>
          </div>

          <div className="employee-table-scroll">
            <table className="employee-table compact">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Role</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {employees.map((employee) => (
                  <tr
                    key={employee.id}
                    className={selectedEmployee.id === employee.id ? "selected-row" : ""}
                    onClick={() => {
                      setSelectedEmployee(employee);
                      setIsAdding(false);
                      setActiveTab("employee");
                    }}
                  >
                    <td>{employee.id}</td>
                    <td>{employee.name}</td>
                    <td>{employee.department}</td>
                    <td>{employee.role}</td>
                    <td>{employee.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </SubModuleLayout>
  );
}