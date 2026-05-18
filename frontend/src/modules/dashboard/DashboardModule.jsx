export default function DashboardModule() {
  return (
    <section className="module-page">
      <p className="eyebrow">Overview</p>
      <h2>Dashboard</h2>
      <p className="module-description">
        Enterprise HR SaaS starter dashboard. Connect real metrics, charts, and APIs later.
      </p>

      <div className="cards-grid">
        <article className="metric-card">
          <span>Total Employees</span>
          <strong>248</strong>
          <p>Placeholder metric</p>
        </article>
        <article className="metric-card">
          <span>Open Roles</span>
          <strong>16</strong>
          <p>Placeholder metric</p>
        </article>
        <article className="metric-card">
          <span>Payroll Status</span>
          <strong>Ready</strong>
          <p>Placeholder status</p>
        </article>
      </div>

      <article className="info-panel">
        <h3>Enterprise Architecture Ready</h3>
        <p>
          The navigation is config-driven, modules are isolated, the layout is reusable, and theme state is handled globally.
        </p>
      </article>
    </section>
  );
}
