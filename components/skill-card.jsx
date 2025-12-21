export default function SkillCard({ label, items }) {
  return (
    <div className="card-surface p-5 flex flex-col gap-3 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
      <h3 className="text-lg font-extrabold text-slate-900">{label}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className="pill">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
