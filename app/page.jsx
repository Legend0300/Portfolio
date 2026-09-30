import { ArrowDownRight, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CaseStudy from "@/components/case-study";
import { profile, glance, approach, caseStudies, alsoBuilt, capabilities, learning } from "@/lib/data";

export default function HomePage() {
  return (
    <div id="top">
      <Navbar />
      <main>
        <Hero />
        <Work />
        <Approach />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="shell pb-20 pt-20 sm:pt-28">
      <p className="eyebrow rise">
        {profile.role} · Cloud platforms and DevOps
      </p>
      <h1 className="rise mt-5 max-w-4xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl" style={{ animationDelay: "60ms" }}>
        {profile.headline}
      </h1>
      <p className="lede rise mt-6" style={{ animationDelay: "120ms" }}>
        {profile.intro}
      </p>
      <div className="rise mt-9 flex flex-wrap gap-3" style={{ animationDelay: "180ms" }}>
        <a href="#work" className="btn btn-solid no-underline">
          See the work <ArrowDownRight className="h-4 w-4" aria-hidden />
        </a>
        <a href={profile.cv} target="_blank" rel="noopener" className="btn no-underline">
          Download résumé
        </a>
        <a href="#contact" className="btn no-underline">
          Get in touch
        </a>
      </div>

      <dl className="rise mt-16 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3" style={{ animationDelay: "240ms" }}>
        {glance.map((g) => (
          <div key={g.label} className="bg-bg p-5">
            <dt className="eyebrow">{g.label}</dt>
            <dd className="mt-2 font-medium">{g.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function SectionHead({ id, eyebrow, title, lede }) {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow" id={id ? `${id}-label` : undefined}>
        {eyebrow}
      </p>
      <h2 className="h2 mt-3">{title}</h2>
      {lede && <p className="lede mt-4">{lede}</p>}
    </div>
  );
}

function Work() {
  return (
    <section id="work" className="rule" aria-labelledby="work-label">
      <div className="shell py-20">
        <SectionHead
          id="work"
          eyebrow="01 · Selected work"
          title="Four systems, and the decisions behind them"
          lede="Each case study starts with the problem, shows the architecture, and lists the decisions with the reasoning that makes them defensible."
        />
        <div className="mt-14 divide-y divide-line">
          {caseStudies.map((s, i) => (
            <CaseStudy key={s.id} study={s} index={i} />
          ))}
        </div>

        <div className="mt-16">
          <h3 className="eyebrow">Also built</h3>
          <ul className="mt-4 grid gap-4 md:grid-cols-3">
            {alsoBuilt.map((p) => (
              <li key={p.title}>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col gap-3 rounded-xl border border-line p-5 no-underline transition-colors hover:bg-surface"
                >
                  <span className="flex items-start justify-between gap-3 font-medium">
                    {p.title}
                    <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                  </span>
                  <span className="text-sm text-muted">{p.copy}</span>
                  <span className="mt-auto flex flex-wrap gap-1.5 pt-1">
                    {p.stack.map((s) => (
                      <span key={s} className="tag">
                        {s}
                      </span>
                    ))}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Approach() {
  return (
    <section id="approach" className="rule bg-surface" aria-labelledby="approach-label">
      <div className="shell py-20">
        <SectionHead
          id="approach"
          eyebrow="02 · How I work"
          title="From constraints to a decision you can defend"
          lede="Good architecture is mostly good questions asked early. This is the loop I run on every system."
        />
        <ol className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-5">
          {approach.map((a, i) => (
            <li key={a.step} className="bg-bg p-5">
              <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 text-lg font-semibold">{a.step}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{a.copy}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="rule" aria-labelledby="skills-label">
      <div className="shell py-20">
        <SectionHead id="skills" eyebrow="03 · Capabilities" title="What I bring to an architecture" />
        <dl className="mt-12 divide-y divide-line border-y border-line">
          {capabilities.map((c) => (
            <div key={c.label} className="grid gap-3 py-6 md:grid-cols-[260px_1fr] md:gap-8">
              <dt className="font-medium">{c.label}</dt>
              <dd>
                <ul className="flex flex-wrap gap-x-6 gap-y-1.5 text-muted">
                  {c.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-14">
          <h3 className="eyebrow">Learning</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {learning.map((l) => (
              <li key={l.title}>
                <a href={l.link} target="_blank" rel="noopener noreferrer" className="tag no-underline hover:text-fg">
                  {l.title} · {l.issuer}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const links = [
    { href: `mailto:${profile.email}`, label: profile.email, Icon: Mail },
    { href: profile.linkedin, label: "LinkedIn", Icon: Linkedin },
    { href: profile.github, label: "GitHub", Icon: Github },
  ];
  return (
    <section id="contact" className="rule bg-surface" aria-labelledby="contact-label">
      <div className="shell py-24">
        <SectionHead id="contact" eyebrow="04 · Contact" title="Let's talk about your architecture." lede="If you are designing a platform, moving to Kubernetes, or trying to make your cloud bill and your release process calmer, I would like to hear about it." />
        <ul className="mt-10 flex flex-wrap gap-3">
          {links.map(({ href, label, Icon }, i) => (
            <li key={href}>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`btn no-underline ${i === 0 ? "btn-solid" : ""}`}
              >
                <Icon className="h-4 w-4" aria-hidden />
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
