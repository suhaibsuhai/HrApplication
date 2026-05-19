import SubModuleLayout from "../../../layouts/SubModuleLayout.jsx";

export default function ContractGeneratePage({ onModuleChange }) {
  return (
    <SubModuleLayout title="Contract Generate" onModuleChange={onModuleChange}>
      <section className="module-page">
        <p className="eyebrow">Human Resources</p>
        <h2>Contract Generate</h2>
        <p className="module-description">
          Generate employee contracts and official HR documents.
        </p>
      </section>
    </SubModuleLayout>
  );
}