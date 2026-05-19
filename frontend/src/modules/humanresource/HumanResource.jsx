import {
  UserPlus,
  FileSignature,
  UsersRound,
  BriefcaseBusiness,
} from "lucide-react";

const hrSubModules = [
  {
    id: "add-employee",
    label: "Add Employee",
    description: "Create and onboard a new employee profile.",
    icon: UserPlus,
    color: "green",
  },
  {
    id: "contract-generate",
    label: "Contract Generate",
    description: "Generate employee contracts and documents.",
    icon: FileSignature,
    color: "blue",
  },
  {
    id: "employee-supervise",
    label: "Employee Supervise",
    description: "Monitor employee status and supervision records.",
    icon: UsersRound,
    color: "purple",
  },
  {
    id: "add-new-job",
    label: "Add New Job",
    description: "Create job openings and recruitment positions.",
    icon: BriefcaseBusiness,
    color: "orange",
  },
];

export default function HumanResource({ onOpenSubModule }) {
  return (
    <section className="module-page">
      <p className="eyebrow">Human Resources</p>
      <h2>Human Resources</h2>
      <p className="module-description">
        Select a module to manage employee operations, contracts, supervision,
        and job creation.
      </p>

      <div className="hr-submodule-grid">
        {hrSubModules.map((module) => {
          const Icon = module.icon;

          return (
            <button
              key={module.id}
              className={`hr-submodule-card ${module.color}`}
              onClick={() => onOpenSubModule(module.id)}
            >
              <span className="hr-submodule-icon">
                <Icon size={30} />
              </span>

              <span className="hr-submodule-title">{module.label}</span>
              <span className="hr-submodule-description">
                {module.description}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}