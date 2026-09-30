import {
  BadgeCheck, Database, GitMerge, Globe, KeyRound, Lock, Monitor, ScanSearch, ShieldAlert, ShieldCheck, Sparkles, User, Workflow, Zap,
} from "lucide-react";
import { brandIcons } from "@/lib/brand-icons";

// Icon names: "aws/<file>", "azure/<file>" (official architecture icons in /public/icons),
// "brand/<key>" (Simple Icons paths) and "lucide/<key>" (neutral glyphs for concepts with no logo).
const lucide = {
  user: User, monitor: Monitor, database: Database, shield: ShieldAlert, "shield-check": ShieldCheck, zap: Zap, key: KeyRound,
  "git-merge": GitMerge, scan: ScanSearch, check: BadgeCheck, sparkles: Sparkles, workflow: Workflow, lock: Lock, globe: Globe,
};

// Very dark brand colours vanish on the dark theme, so they follow the text colour instead.
function isDark(hex) {
  const n = parseInt(hex, 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 < 0.28;
}

function parse(name) {
  const i = name.indexOf("/");
  return { kind: name.slice(0, i), key: name.slice(i + 1) };
}

/** Icon usable inside an <svg>: positioned by x/y, size in px. */
export function SvgIcon({ name, x, y, size }) {
  const { kind, key } = parse(name);
  if (kind === "aws" || kind === "azure") {
    return <image href={`/icons/${kind}/${key}.svg`} x={x} y={y} width={size} height={size} />;
  }
  if (kind === "brand") {
    const b = brandIcons[key];
    if (!b) return null;
    return (
      <svg x={x} y={y} width={size} height={size} viewBox="0 0 24 24" aria-hidden>
        <path d={b.path} fill={isDark(b.hex) ? undefined : `#${b.hex}`} className={isDark(b.hex) ? "fill-fg" : undefined} />
      </svg>
    );
  }
  const L = lucide[key];
  if (!L) return null;
  return <L x={x} y={y} width={size} height={size} strokeWidth={1.6} className="text-fg" aria-hidden />;
}

/** Icon for regular HTML (chips, lists). */
export function Icon({ name, size = 18, className = "" }) {
  const { kind, key } = parse(name);
  if (kind === "aws" || kind === "azure") {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={`/icons/${kind}/${key}.svg`} width={size} height={size} alt="" className={className} />;
  }
  if (kind === "brand") {
    const b = brandIcons[key];
    if (!b) return null;
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden className={className}>
        <path d={b.path} fill={isDark(b.hex) ? undefined : `#${b.hex}`} className={isDark(b.hex) ? "fill-fg" : undefined} />
      </svg>
    );
  }
  const L = lucide[key];
  if (!L) return null;
  return <L width={size} height={size} strokeWidth={1.6} className={`text-muted ${className}`} aria-hidden />;
}
