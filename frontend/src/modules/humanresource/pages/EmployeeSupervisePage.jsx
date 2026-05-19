import SubModuleLayout from "../../../layouts/SubModuleLayout.jsx";

export default function EmployeeSupervisePage({ onModuleChange }) {
  return (
    <SubModuleLayout title="Employee Supervise" onModuleChange={onModuleChange}>
      <section className="module-page">
        <p className="eyebrow">Human Resources</p>
        <h2>Employee Supervise</h2>
        <p className="module-description">
          Monitor employee performance, attendance, and supervision records.
        </p>
      </section>
    </SubModuleLayout>
  );
}