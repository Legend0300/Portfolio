import Link from "next/link";
import { Github, Mail } from "lucide-react";

const links = [
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-slate-200/70">
      <div className="container-shell px-6 py-4 flex items-center justify-between">
        <Link href="#home" className="font-extrabold tracking-tight text-xl text-slate-900">
          Muhammad Ahmad
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-700">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-slate-900 transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="https://github.com/Legend0300"
            target="_blank"
            className="btn-ghost text-sm"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
            GitHub
          </Link>
          <Link
            href="#contact"
            className="btn-primary text-sm"
            aria-label="Contact"
          >
            <Mail className="w-4 h-4" />
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}
