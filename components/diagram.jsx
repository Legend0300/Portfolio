import { diagrams } from "@/lib/diagrams";
import { SvgIcon, Icon } from "@/components/icon";

const TILE_H = 60;
const LABEL_BELOW = 44; // room under the tile for the name and caption

function geometry(node) {
  const n = node.icons.length;
  const iconSize = n === 1 ? 36 : 30;
  const tileW = n === 1 ? TILE_H : n * iconSize + (n - 1) * 8 + 24;
  return { n, iconSize, tileW };
}

function anchor(node, side) {
  const { tileW } = geometry(node);
  if (side === "r") return { x: node.cx + tileW / 2, y: node.cy };
  if (side === "l") return { x: node.cx - tileW / 2, y: node.cy };
  if (side === "u") return { x: node.cx, y: node.cy - TILE_H / 2 };
  return { x: node.cx, y: node.cy + TILE_H / 2 + LABEL_BELOW };
}

function pickSides(a, b, via) {
  const dx = b.cx - a.cx;
  const dy = b.cy - a.cy;
  const horizontal = via ? via === "h" : Math.abs(dx) >= Math.abs(dy);
  if (horizontal) return dx >= 0 ? ["r", "l"] : ["l", "r"];
  return dy >= 0 ? ["d", "u"] : ["u", "d"];
}

function route(a, b, via) {
  const [sa, sb] = pickSides(a, b, via);
  const p = anchor(a, sa);
  const q = anchor(b, sb);
  const gap = 5; // keep the arrow tip off the tile
  const tip = { ...q };
  if (sb === "l") tip.x -= gap;
  if (sb === "r") tip.x += gap;
  if (sb === "u") tip.y -= gap;
  if (sb === "d") tip.y += gap;
  let pts;
  if (p.x === tip.x || p.y === tip.y) pts = [p, tip];
  else if (sa === "l" || sa === "r") {
    const mx = Math.round((p.x + tip.x) / 2);
    pts = [p, { x: mx, y: p.y }, { x: mx, y: tip.y }, tip];
  } else {
    const my = Math.round((p.y + tip.y) / 2);
    pts = [p, { x: p.x, y: my }, { x: tip.x, y: my }, tip];
  }
  return pts;
}

function longestMid(pts) {
  let best = { len: -1, x: pts[0].x, y: pts[0].y };
  for (let i = 0; i < pts.length - 1; i++) {
    const len = Math.abs(pts[i + 1].x - pts[i].x) + Math.abs(pts[i + 1].y - pts[i].y);
    if (len > best.len) best = { len, x: (pts[i].x + pts[i + 1].x) / 2, y: (pts[i].y + pts[i + 1].y) / 2 };
  }
  return best;
}

function rounded(pts, r = 8) {
  // Straight lines with softened corners.
  if (pts.length === 2) return `M${pts[0].x} ${pts[0].y} L${pts[1].x} ${pts[1].y}`;
  let d = `M${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const a = pts[i - 1], b = pts[i], c = pts[i + 1];
    const l1 = Math.hypot(b.x - a.x, b.y - a.y), l2 = Math.hypot(c.x - b.x, c.y - b.y);
    const rr = Math.min(r, l1 / 2, l2 / 2);
    const p1 = { x: b.x - ((b.x - a.x) / l1) * rr, y: b.y - ((b.y - a.y) / l1) * rr };
    const p2 = { x: b.x + ((c.x - b.x) / l2) * rr, y: b.y + ((c.y - b.y) / l2) * rr };
    d += ` L${p1.x} ${p1.y} Q${b.x} ${b.y} ${p2.x} ${p2.y}`;
  }
  const last = pts[pts.length - 1];
  return d + ` L${last.x} ${last.y}`;
}

export default function Diagram({ name }) {
  const spec = diagrams[name];
  if (!spec) return null;
  const byId = Object.fromEntries(spec.nodes.map((n) => [n.id, n]));
  const marker = `arrow-${name}`;

  return (
    <figure className="diagram-wrap">
      <svg viewBox={`0 0 960 ${spec.height}`} role="img" aria-label={spec.label} className="diagram" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id={marker} viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="8" markerHeight="8" orient="auto">
            <path d="M1 1.5 L8.5 5 L1 8.5 z" className="fill-fg" />
          </marker>
        </defs>

        {spec.groups?.map((g) => (
          <g key={g.label}>
            <rect x={g.x} y={g.y} width={g.w} height={g.h} rx="10" className="fill-surface/40 stroke-line" strokeWidth="1.2" />
            {g.icon && <SvgIcon name={g.icon} x={g.x + 12} y={g.y + 10} size={22} />}
            <text x={g.x + (g.icon ? 42 : 14)} y={g.y + 26} className="fill-fg diagram-group">
              {g.label}
            </text>
          </g>
        ))}

        {spec.edges.map((e, i) => {
          const a = byId[e.from];
          const b = byId[e.to];
          if (!a || !b) return null;
          const pts = route(a, b, e.via);
          const mid = longestMid(pts);
          return (
            <g key={i}>
              <path
                d={rounded(pts)}
                className="fill-none stroke-fg"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray={e.dashed ? "5 4" : undefined}
                opacity={e.dashed ? 0.6 : 0.85}
                markerEnd={`url(#${marker})`}
              />
              {e.n && (
                <g>
                  <circle cx={mid.x} cy={mid.y} r="10" className="fill-accent" />
                  <text x={mid.x} y={mid.y + 4} textAnchor="middle" className="diagram-step">
                    {e.n}
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {spec.nodes.map((n) => {
          const { n: count, iconSize, tileW } = geometry(n);
          const x0 = n.cx - tileW / 2;
          const accent = n.tone === "accent";
          const startX = x0 + (tileW - (count * iconSize + (count - 1) * 8)) / 2;
          return (
            <g key={n.id}>
              <rect
                x={x0}
                y={n.cy - TILE_H / 2}
                width={tileW}
                height={TILE_H}
                rx="12"
                className={accent ? "fill-accent-soft stroke-accent" : "fill-bg stroke-line"}
                strokeWidth={accent ? 1.6 : 1.2}
              />
              {n.icons.map((ic, i) => (
                <SvgIcon key={ic + i} name={ic} x={startX + i * (iconSize + 8)} y={n.cy - iconSize / 2} size={iconSize} />
              ))}
              <text x={n.cx} y={n.cy + TILE_H / 2 + 17} textAnchor="middle" className="fill-fg diagram-title">
                {n.title}
              </text>
              <text x={n.cx} y={n.cy + TILE_H / 2 + 33} textAnchor="middle" className="fill-muted diagram-sub">
                {n.sub}
              </text>
            </g>
          );
        })}
      </svg>

      <figcaption className="mt-4 grid gap-4 md:grid-cols-[1fr_auto] md:items-start">
        {spec.steps && (
          <ol className="grid gap-2 text-sm text-muted sm:grid-cols-2">
            {spec.steps.map((s, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent font-mono text-[11px] font-semibold text-bg">
                  {i + 1}
                </span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        )}
        <p className="flex items-center gap-4 whitespace-nowrap font-mono text-[11px] text-muted">
          <span className="inline-flex items-center gap-2">
            <svg width="26" height="8" aria-hidden><path d="M0 4 H22" className="stroke-fg" strokeWidth="1.5" /><path d="M20 1 L25 4 L20 7z" className="fill-fg" /></svg>
            flow
          </span>
          <span className="inline-flex items-center gap-2">
            <svg width="26" height="8" aria-hidden><path d="M0 4 H22" className="stroke-fg" strokeWidth="1.5" strokeDasharray="4 3" opacity=".6" /><path d="M20 1 L25 4 L20 7z" className="fill-fg" opacity=".6" /></svg>
            supporting
          </span>
        </p>
      </figcaption>
    </figure>
  );
}

export { Icon };
