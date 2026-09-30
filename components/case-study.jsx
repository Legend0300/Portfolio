import { ArrowUpRight, Lock } from "lucide-react";
import Diagram from "@/components/diagram";

export default function CaseStudy({ study, index }) {
  const num = String(index + 1).padStart(2, "0");
  return (
    <article id={study.id} className="py-16 first:pt-0">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="font-mono text-sm text-accent">{num}</span>
        <span className="eyebrow">{study.kind}</span>
        {study.private && (
          <span className="tag gap-1">
            <Lock className="h-3 w-3" aria-hidden /> Private repository
          </span>
        )}
      </div>

      <h3 className="mt-4 max-w-3xl text-2xl font-semibold leading-snug tracking-tight sm:text-[28px]">{study.title}</h3>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">{study.summary}</p>

      <div className="mt-8">
        <Diagram name={study.diagram} />
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_280px]">
        <div>
          <h4 className="eyebrow">The problem</h4>
          <p className="mt-2 max-w-2xl">{study.problem}</p>

          <h4 className="eyebrow mt-8">Design decisions</h4>
          <dl className="mt-3 divide-y divide-line border-y border-line">
            {study.decisions.map((d) => (
              <div key={d.title} className="grid gap-1 py-4 sm:grid-cols-[220px_1fr] sm:gap-6">
                <dt className="font-medium">{d.title}</dt>
                <dd className="text-muted">{d.why}</dd>
              </div>
            ))}
          </dl>
        </div>

        <aside className="flex flex-col gap-8">
          <div>
            <h4 className="eyebrow">By the numbers</h4>
            <dl className="mt-3 grid gap-4">
              {study.facts.map((f) => (
                <div key={f.label}>
                  <dt className="text-3xl font-semibold tracking-tight">{f.value}</dt>
                  <dd className="text-sm text-muted">{f.label}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h4 className="eyebrow">Stack</h4>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {study.stack.map((s) => (
                <li key={s} className="tag">
                  {s}
                </li>
              ))}
            </ul>
          </div>
          {study.links.length > 0 && (
            <ul className="flex flex-col gap-2 text-sm">
              {study.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-1">
                    {l.label} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </aside>
      </div>
    </article>
  );
}
