export default function SectionHeader({ eyebrow, title, subtitle, id }) {
  return (
    <div id={id} className="mb-8 flex flex-col gap-3">
      <div className="badge w-max">{eyebrow}</div>
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
}
