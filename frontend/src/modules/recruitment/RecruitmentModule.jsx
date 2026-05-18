import ModulePlaceholder from "../../shared/components/ModulePlaceholder.jsx";

export default function RecruitmentModule() {
  return (
    <ModulePlaceholder
      title="Recruitment"
      description="Future applicant tracking, job postings, interviews, offers, and hiring pipeline."
      items={[
        { title: "Jobs", description: "Role creation and approval workflow." },
        { title: "Candidates", description: "Applicant tracking and evaluation." },
        { title: "Interviews", description: "Scheduling, feedback, and decisions." },
      ]}
    />
  );
}
