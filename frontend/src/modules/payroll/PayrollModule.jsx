import ModulePlaceholder from "../../shared/components/ModulePlaceholder.jsx";

export default function PayrollModule() {
  return (
    <ModulePlaceholder
      title="Payroll"
      description="Future payroll processing, salary structures, deductions, approvals, and reporting."
      items={[
        { title: "Payroll Runs", description: "Monthly payroll processing workflow." },
        { title: "Compensation", description: "Salary, benefits, allowances, and deductions." },
        { title: "Reports", description: "Finance-ready payroll reports and exports." },
      ]}
    />
  );
}
