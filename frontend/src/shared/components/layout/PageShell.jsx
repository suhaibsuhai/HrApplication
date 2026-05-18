export function PageShell({ children, description, eyebrow, title }) {
  return (
    <main className="main-content">
      <section className="page-heading">
        <p>{eyebrow}</p>
        <h1>{title}</h1>
        {description && <span>{description}</span>}
      </section>

      {children}
    </main>
  );
}
