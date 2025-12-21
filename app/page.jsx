import Link from "next/link";
import { BadgeCheck, CloudCog, Hammer, Send, ShieldCheck, Sparkles } from "lucide-react";
import Navbar from "@/components/navbar";
import SectionHeader from "@/components/section-header";
import SkillCard from "@/components/skill-card";
import ProjectCard from "@/components/project-card";
import Footer from "@/components/footer";
import { heroHighlights, skills, projects } from "@/lib/data";

export default function HomePage() {
  return (
    <div className="min-h-screen" id="home">
      <Navbar />
      <main className="container-shell px-6 pb-24">
        <Hero />
        <Skills />
        <Projects />
        <Delivery />
      </main>
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="section-padding flex flex-col gap-10" id="home">
      <div className="badge w-max">
        <Sparkles className="w-4 h-4" /> DevOps Engineer
      </div>
      <div className="flex flex-col lg:flex-row lg:items-end gap-10">
        <div className="flex-1 flex flex-col gap-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-slate-900">
            Shipping reliable cloud platforms with Kubernetes, Terraform, and GitHub Actions.
          </h1>
          <p className="text-lg text-slate-600 leading-8 max-w-3xl">
            Practical delivery setups with small images, guarded releases, and dashboards wired from day one. Azure
            friendly, works anywhere.
          </p>
          <div className="flex gap-3 flex-wrap">
            <Link href="#projects" className="btn-ghost">
              View projects
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            {heroHighlights.map((item) => (
              <div
                key={item.title}
                className="card-surface p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
              >
                <p className="text-sm font-semibold text-slate-500">{item.title}</p>
                <p className="mt-2 text-slate-700 leading-7">{item.caption}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="card-surface p-6 flex flex-col gap-4 max-w-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
          <p className="text-sm font-semibold text-slate-500">Tooling snapshot</p>
          <div className="rounded-2xl bg-slate-50 border border-slate-200 p-3 animate-fade-up">
            <div className="flex flex-wrap gap-1.5 justify-start content-start">
              <span className="pill pill--compact">Azure</span>
              <span className="pill pill--compact">Kubernetes</span>
              <span className="pill pill--compact">Docker</span>
              <span className="pill pill--compact">GitHub Actions</span>
              <span className="pill pill--compact">Jenkins</span>
              <span className="pill pill--compact">Terraform</span>
              <span className="pill pill--compact">Ansible</span>
              <span className="pill pill--compact">Python</span>
              <span className="pill pill--compact">TypeScript</span>
              <span className="pill pill--compact">JavaScript</span>
              <span className="pill pill--compact">Prometheus</span>
              <span className="pill pill--compact">Grafana</span>
            </div>
          </div>
          <div className="h-px bg-slate-200" />
          <div className="flex items-center gap-3 text-slate-700">
            <BadgeCheck className="w-5 h-5 text-blue-600" />
            <span>Secure-by-default configs, secrets hygiene, and rollback plans.</span>
          </div>
          <div className="flex items-center gap-3 text-slate-700">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            <span>Health probes, autoscaling hints, and runbooks with each service.</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="section-padding" id="skills">
      <SectionHeader
        eyebrow="Skill map"
        title="DevOps & platform skills"
        subtitle="Practical tools I reach for daily to ship and run services."
      />
      <div className="card-surface p-4 mb-6 animate-fade-up">
        <img
          className="icon-strip mx-auto opacity-95 hover:opacity-100 transition-opacity"
          src="https://skillicons.dev/icons?i=azure,kubernetes,docker,githubactions,jenkins,terraform,ansible,python,ts,js,prometheus,grafana"
          alt="DevOps stack icons"
          loading="lazy"
        />
      </div>
      <div className="grid-soft">
        {skills.map((entry) => (
          <SkillCard key={entry.label} label={entry.label} items={entry.items} />
        ))}
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section className="section-padding" id="projects">
      <SectionHeader
        eyebrow="Projects"
        title="Recent DevOps builds"
        subtitle="Hands-on examples of CI/CD pipelines, Kubernetes delivery, and automation I ship day-to-day."
      />
      <div className="flex flex-col gap-5">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </section>
  );
}

function Delivery() {
  const pillars = [
    {
      title: "IaC ready",
      copy: "Terraform modules with remote state, variable validation, and reusable patterns for new services.",
      icon: <Hammer className="w-5 h-5 text-blue-600" />,
    },
    {
      title: "Cloud native",
      copy: "Docker images tuned for small attack surface and Kubernetes manifests with liveness/readiness probes.",
      icon: <CloudCog className="w-5 h-5 text-blue-600" />,
    },
    {
      title: "Release hygiene",
      copy: "GitHub Actions workflows that gate on tests, generate release notes, and promote artifacts per environment.",
      icon: <Send className="w-5 h-5 text-blue-600" />,
    },
  ];

  return (
    <section className="section-padding" id="process">
      <SectionHeader
        eyebrow="Approach"
        title="A light, secure, and repeatable delivery practice"
        subtitle="Opinionated defaults so teams can focus on features instead of pipeline firefighting."
      />
      <div className="grid-soft">
        {pillars.map((pillar) => (
          <div key={pillar.title} className="card-surface p-5 flex gap-3 items-start">
            <div className="shrink-0">{pillar.icon}</div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">{pillar.title}</h3>
              <p className="text-slate-700 leading-7 mt-1">{pillar.copy}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
