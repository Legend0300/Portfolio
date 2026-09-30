import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="rule">
      <div className="shell flex flex-col gap-3 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className="max-w-xl sm:text-right">
          Diagrams use the official AWS and Azure architecture icons and Simple Icons. All product names and logos belong to their owners. Built with Next.js and Tailwind, hosted on Cloudflare.
        </p>
      </div>
    </footer>
  );
}
