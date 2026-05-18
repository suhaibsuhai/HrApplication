import ModulePlaceholder from "../../shared/components/ModulePlaceholder.jsx";

export default function SettingsModule() {
  return (
    <ModulePlaceholder
      title="Settings"
      description="Future tenant settings, user permissions, roles, billing, integrations, and audit logs."
      items={[
        { title: "Roles & Permissions", description: "Role-based access control foundation." },
        { title: "Tenant Settings", description: "Company profile and system configuration." },
        { title: "Integrations", description: "Connect payroll, calendar, identity, and finance tools." },
      ]}
    />
  );
}
