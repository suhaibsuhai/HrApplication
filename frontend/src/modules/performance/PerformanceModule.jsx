import ModulePlaceholder from "../../shared/components/ModulePlaceholder.jsx";

export default function PerformanceModule() {
  return (
    <ModulePlaceholder
      title="Performance"
      description="Future goals, reviews, feedback cycles, ratings, and performance analytics."
      items={[
        { title: "Goals", description: "OKRs and employee goal tracking." },
        { title: "Reviews", description: "Quarterly and annual review cycles." },
        { title: "Feedback", description: "Manager and peer feedback workflows." },
      ]}
    />
  );
}
