import { diagrams } from "@/lib/diagrams";

// Anchor point on a node's side facing a target, plus the side used.
function sideOf(node, other, prefer) {
  const cx = node.x + node.w / 2;
  const cy = node.y + node.h / 2;
  const ox = other.x + other.w / 2;
  const oy = other.y + other.h / 2;
  const dx = ox - cx;
  const dy = oy - cy;
  const horizontal = prefer ? prefer === "h" : Math.abs(dx) > Math.abs(dy);
  if (horizontal) return dx >= 0 ? { x: node.x + node.w, y: cy, dir: "r" } : { x: node.x, y: cy, dir: "l" };
  return dy >= 0 ? { x: cx, y: node.y + node.h, dir: "d" } : { x: cx, y: node.y, dir: "u" };
}

function edgePath(a, b, via) {
  const p = sideOf(a, b, via === "h" ? "h" : via === "v" ? "v" : undefined);
  const q = sideOf(b, a, via === "h" ? "h" : via === "v" ? "v" : undefined);
  let d;
  if (p.x === q.x || p.y === q.y) {
    d = `M${p.x} ${p.y} L${q.x} ${q.y}`;
  } else if (p.dir === "l" || p.dir === "r") {
    const mx = (p.x + q.x) / 2;
    d = `M${p.x} ${p.y} L${mx} ${p.y} L${mx} ${q.y} L${q.x} ${q.y}`;
  } else {
    const my = (p.y + q.y) / 2;
    d = `M${p.x} ${p.y} L${p.x} ${my} L${q.x} ${my} L${q.x} ${q.y}`;
  }
  return { d, mid: { x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 } };
}

export default function Diagram({ name }) {
  const spec = diagrams[name];
  if (!spec) return null;
  const byId = Object.fromEntries(spec.nodes.map((n) => [n.id, n]));
  const uid = `arrow-${name}`;
  return (
    <figure className="diagram-wrap">
      <svg viewBox={`0 0 960 ${spec.height}`} role="img" aria-label={spec.label} className="diagram" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id={uid} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 1 L9 5 L0 9 z" className="fill-muted" />
          </marker>
        </defs>

        {spec.groups?.map((g) => (
          <g key={g.label}>
            <rect x={g.x} y={g.y} width={g.w} height={g.h} rx="10" className="fill-none stroke-line" strokeDasharray="4 4" />
            <text x={g.x + 14} y={g.y + 22} className="fill-muted diagram-group">
              {g.label}
            </text>
          </g>
        ))}

        {spec.edges.map((e, i) => {
          const a = byId[e.from];
          const b = byId[e.to];
          if (!a || !b) return null;
          const { d, mid } = edgePath(a, b, e.via);
          return (
            <g key={i}>
              <path d={d} className="fill-none stroke-muted" strokeWidth="1.4" strokeDasharray={e.dashed ? "4 4" : undefined} markerEnd={`url(#${uid})`} />
              {e.label && (
                <g>
                  <rect x={mid.x - e.label.length * 3.2 - 6} y={mid.y - 9} width={e.label.length * 6.4 + 12} height="18" rx="4" className="fill-bg" />
                  <text x={mid.x} y={mid.y + 4} textAnchor="middle" className="fill-muted diagram-label">
                    {e.label}
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {spec.nodes.map((n) => (
          <g key={n.id}>
            <rect
              x={n.x}
              y={n.y}
              width={n.w}
              height={n.h}
              rx="8"
              className={n.tone === "accent" ? "fill-accent-soft stroke-accent" : "fill-surface stroke-line"}
              strokeWidth={n.tone === "accent" ? 1.4 : 1}
            />
            <text x={n.x + n.w / 2} y={n.y + n.h / 2 - 3} textAnchor="middle" className="fill-fg diagram-title">
              {n.title}
            </text>
            <text x={n.x + n.w / 2} y={n.y + n.h / 2 + 15} textAnchor="middle" className="fill-muted diagram-sub">
              {n.sub}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  );
}
