import ModulePlaceholder from "../../shared/components/ModulePlaceholder.jsx";

export default function EmployeesModule() {
  return (
    <ModulePlaceholder
      title="Employees"
      description="Future employee directory, profiles, onboarding, documents, and lifecycle management."
      items={[
        { title: "Directory", description: "Centralized employee records and search." },
        { title: "Profiles", description: "Personal, work, compensation, and reporting details." },
        { title: "Onboarding", description: "Checklist-driven employee onboarding flow." },
      ]}
    />
  );
}
