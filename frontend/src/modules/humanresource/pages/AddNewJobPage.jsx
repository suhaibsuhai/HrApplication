import SubModuleLayout from "../../../layouts/SubModuleLayout.jsx";

export default function AddNewJobPage({ onModuleChange }) {
  return (
    <SubModuleLayout title="Add New Job" onModuleChange={onModuleChange}>
      <section className="module-page">
        <p className="eyebrow">Human Resources</p>
        <h2>Add New Job</h2>
        <p className="module-description">
          Create new job openings and recruitment positions.
        </p>
      </section>
    </SubModuleLayout>
  );
}