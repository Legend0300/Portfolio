import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function ProjectCard({ title, summary, link, stack }) {
  return (
    <div className="card-surface p-6 flex flex-col gap-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-500">Featured project</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">{title}</h3>
        </div>
        <Link
          href={link}
          target="_blank"
          className="btn-ghost text-xs whitespace-nowrap"
          aria-label={`View ${title}`}
        >
          View repo
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
      <p className="text-slate-600 leading-7">{summary}</p>
      <div className="flex flex-wrap gap-2">
        {stack.map((item) => (
          <span key={item} className="pill">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
