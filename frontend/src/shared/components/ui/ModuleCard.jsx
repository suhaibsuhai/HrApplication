export function ModuleCard({ children, title, eyebrow, meta }) {
  return (
    <section className="module-card">
      <div className="module-card__header">
        <div>
          {eyebrow && <p>{eyebrow}</p>}
          <h2>{title}</h2>
        </div>
        {meta && <span>{meta}</span>}
      </div>
      <div className="module-card__body">{children}</div>
    </section>
  );
}
