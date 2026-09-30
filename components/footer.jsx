import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="rule">
      <div className="shell flex flex-col gap-3 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>Built with Next.js and Tailwind. Hosted on Cloudflare.</p>
      </div>
    </footer>
  );
}
