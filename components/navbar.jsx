import Link from "next/link";
import ThemeToggle from "@/components/theme-toggle";
import { profile } from "@/lib/data";

const links = [
  { href: "#work", label: "Work" },
  { href: "#approach", label: "Approach" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur">
      <div className="shell flex h-16 items-center justify-between gap-4">
        <Link href="#top" className="text-[15px] font-semibold tracking-tight no-underline">
          {profile.name}
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-7 text-sm text-muted md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="no-underline transition-colors hover:text-fg">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a href={profile.cv} target="_blank" rel="noopener" className="btn h-9 px-4 no-underline">
            Résumé
          </a>
        </div>
      </div>
    </header>
  );
}
