import { ModuleCard } from '../../shared/components/ui/ModuleCard.jsx';
import { StatCard } from '../../shared/components/ui/StatCard.jsx';

const dashboardStats = [
  { label: 'Modules scaffolded', value: '4', note: 'Ready for phased rollout' },
  { label: 'Active workspace', value: 'Home', note: 'Current MVP screen' },
  { label: 'Architecture', value: 'SaaS', note: 'Enterprise-ready structure' },
];

export function DashboardModule() {
  return (
    <div className="module-grid">
      <ModuleCard title="Welcome to the HR Application" eyebrow="Current release" meta="MVP foundation">
        <p>
          This application is structured as a scalable SaaS product. The current interface stays simple,
          while feature areas are already separated into modules for future development.
        </p>
      </ModuleCard>

      <div className="stats-grid">
        {dashboardStats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>
    </div>
  );
}
