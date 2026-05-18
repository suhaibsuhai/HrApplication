export default function ModulePlaceholder({ title, description, items = [] }) {
  return (
    <section className="module-page">
      <div className="page-title-row">
        <div>
          <p className="eyebrow">Future module</p>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </div>

      <div className="module-grid">
        {items.map((item) => (
          <article className="module-card" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
