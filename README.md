# Portfolio: Muhammad Ahmed Mansur, Solutions Architect

A static Next.js site: four architecture case studies (problem, diagram, design decisions), an approach section,
capabilities and contact. Hosted on Cloudflare Workers static assets.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export to ./out
```

## Where things live

| path | what |
| --- | --- |
| `lib/data.js` | all content: profile, case studies, decisions, skills |
| `lib/diagrams.js` | architecture diagrams as data (nodes, edges, groups); rendered by `components/diagram.jsx` |
| `app/globals.css` | design tokens (light and dark) and component classes |
| `resume/resume.html` | résumé source; `node scripts/build-resume.mjs` renders it to `public/cv.pdf` (needs Playwright) |
| `public/cv.pdf` | résumé linked from the site |

To add a case study, append an entry to `caseStudies` in `lib/data.js` and a matching diagram to `lib/diagrams.js`.

## Deploy (Cloudflare)

```bash
npm run cf:deploy  # next build, then wrangler deploy (needs Cloudflare credentials)
```

The GitHub workflow in `.github/workflows/ci.yml` builds on every push and pull request, and deploys `main` to
Cloudflare when the repository secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` are set.
