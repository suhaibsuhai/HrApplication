export default function DashboardModule() {
  return (
    <section className="module-page">
      <div className="page-title-row">
        <div>
          <p className="eyebrow">Overview</p>
          <h1>Dashboard</h1>
          <p>Enterprise HR SaaS starter dashboard. Connect real metrics and APIs later.</p>
        </div>
      </div>

      <div className="stats-grid">
        <article className="stat-card">
          <span>Total Employees</span>
          <strong>248</strong>
          <p>Placeholder metric</p>
        </article>
        <article className="stat-card">
          <span>Open Roles</span>
          <strong>16</strong>
          <p>Placeholder metric</p>
        </article>
        <article className="stat-card">
          <span>Payroll Status</span>
          <strong>Ready</strong>
          <p>Placeholder status</p>
        </article>
      </div>

      <div className="module-card wide-card">
        <h3>Enterprise Architecture Ready</h3>
        <p>
          The navigation is config-driven, modules are isolated, the layout is reusable, and theme state is handled globally.
        </p>
      </div>
    </section>
  );
}
