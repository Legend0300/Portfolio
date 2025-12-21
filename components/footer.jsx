import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

const socials = [
  { href: "mailto:ahmed.mansur.bhatti@gmail.com", label: "Email", Icon: Mail },
  { href: "https://www.linkedin.com/in/muhammad-ahmad-b55539250/", label: "LinkedIn", Icon: Linkedin },
  { href: "https://github.com/Legend0300", label: "GitHub", Icon: Github },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-slate-200/80 footer-glow">
      <div className="container-shell px-6 py-10 flex flex-col gap-6 text-center">
        <div className="space-y-4">
          <h3 className="text-2xl font-extrabold text-slate-900">Let’s ship something together</h3>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Whether you need a fresh CI/CD pipeline, Kubernetes hardening, or Terraform modules, I’m ready to help.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {socials.map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </div>
        <div className="text-xs text-slate-500">
          © {new Date().getFullYear()} Muhammad Ahmad. Built with Next.js & Tailwind.
        </div>
      </div>
    </footer>
  );
}
