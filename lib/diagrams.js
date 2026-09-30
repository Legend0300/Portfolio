// Architecture diagrams as data, drawn like the reference diagrams from AWS and Azure:
//   - official service icons on a tile, name under it, one short caption
//   - grouping containers with an icon in the corner
//   - solid arrows for the primary / synchronous flow, dashed for asynchronous or supporting links
//   - numbered steps on the arrows, explained in a legend under the diagram
// Coordinates are in a 960-wide viewBox. node: { id, cx, cy, icons: [name], title, sub, tone }
// tone "accent" highlights the design's key control. edge: { from, to, n, dashed, via: "h" | "v" }.

export const diagrams = {
  solar: {
    height: 480,
    label:
      "Solar Atlas: a pull request runs a Terraform plan in GitHub Actions, a merge applies dev through an OIDC role, promotion applies prod, and each stack keeps its own state in S3",
    groups: [{ x: 20, y: 168, w: 920, h: 292, label: "AWS Cloud · ap-south-1", icon: "aws/aws-cloud" }],
    nodes: [
      { id: "pr", cx: 90, cy: 70, icons: ["brand/github"], title: "Pull request", sub: "plan as a comment" },
      { id: "actions", cx: 270, cy: 70, icons: ["brand/githubactions"], title: "GitHub Actions", sub: "OIDC, no stored keys", tone: "accent" },
      { id: "dev", cx: 450, cy: 70, icons: ["brand/terraform"], title: "Apply dev", sub: "on merge to main" },
      { id: "promote", cx: 630, cy: 70, icons: ["lucide/git-merge"], title: "Promote", sub: "deliberate, gated" },
      { id: "prod", cx: 810, cy: 70, icons: ["brand/terraform"], title: "Apply prod", sub: "same modules, prod vars" },
      { id: "global", cx: 130, cy: 270, icons: ["aws/iam", "aws/route53", "aws/acm"], title: "shared/global", sub: "OIDC · DNS zone · certificates" },
      {
        id: "devstack",
        cx: 450,
        cy: 270,
        icons: ["aws/ecs", "aws/lambda", "aws/dynamodb", "aws/cloudfront"],
        title: "live/dev",
        sub: "7 modules · dev.tfvars",
      },
      {
        id: "prodstack",
        cx: 810,
        cy: 270,
        icons: ["aws/ecs", "aws/lambda", "aws/dynamodb", "aws/cloudfront"],
        title: "live/prod",
        sub: "7 modules · prod.tfvars",
      },
      { id: "state", cx: 630, cy: 385, icons: ["aws/s3"], title: "Terraform state", sub: "S3 · native locking · key per stack" },
    ],
    edges: [
      { from: "pr", to: "actions", n: 1 },
      { from: "actions", to: "dev", n: 2 },
      { from: "dev", to: "promote", n: 3 },
      { from: "promote", to: "prod", n: 4 },
      { from: "dev", to: "devstack", via: "v" },
      { from: "prod", to: "prodstack", via: "v" },
      { from: "devstack", to: "state", dashed: true },
      { from: "prodstack", to: "state", dashed: true },
    ],
    steps: [
      "A pull request triggers terraform plan, and the plan is posted back as a comment for review.",
      "Merging to main applies dev. The workflow assumes an AWS role through GitHub OIDC, so no long-lived keys exist.",
      "Promotion to prod is a separate, deliberate step.",
      "Prod applies the same seven modules with its own variables. Each stack keeps its own state key.",
    ],
  },

  aks: {
    height: 560,
    label:
      "Azure platform: GitHub Actions and Terraform provision an AKS cluster and container registry, the pipeline deploys with Kustomize, and users reach a Next.js frontend, a Go auth API and a Go chat service through one ingress",
    groups: [
      { x: 235, y: 20, w: 705, h: 520, label: "Azure · resource group", icon: "azure/resource-group" },
      { x: 385, y: 160, w: 545, h: 370, label: "AKS · namespace devops-app", icon: "brand/kubernetes" },
    ],
    nodes: [
      { id: "tf", cx: 90, cy: 75, icons: ["brand/terraform"], title: "Terraform", sub: "RG · ACR · AKS" },
      { id: "gh", cx: 90, cy: 240, icons: ["brand/githubactions"], title: "GitHub Actions", sub: "build · push · apply" },
      { id: "acr", cx: 310, cy: 75, icons: ["azure/acr"], title: "Container Registry", sub: "AcrPull for kubelet", tone: "accent" },
      { id: "aks", cx: 490, cy: 240, icons: ["azure/aks"], title: "AKS cluster", sub: "free tier" },
      { id: "user", cx: 90, cy: 420, icons: ["lucide/globe"], title: "Users", sub: "HTTPS" },
      { id: "lb", cx: 290, cy: 420, icons: ["azure/public-ip"], title: "Public IP", sub: "one load balancer" },
      { id: "ingress", cx: 490, cy: 420, icons: ["brand/nginx"], title: "ingress-nginx", sub: "/  /api  /ws", tone: "accent" },
      { id: "fe", cx: 680, cy: 250, icons: ["brand/nextjs"], title: "frontend", sub: "Next.js · :3000" },
      { id: "auth", cx: 680, cy: 365, icons: ["brand/go"], title: "auth-api", sub: "Go · JWT · :8001" },
      { id: "chat", cx: 680, cy: 470, icons: ["brand/go"], title: "chat-service", sub: "Go · WebSocket" },
      { id: "pg", cx: 870, cy: 365, icons: ["brand/postgresql"], title: "PostgreSQL", sub: "StatefulSet" },
      { id: "rd", cx: 870, cy: 470, icons: ["brand/redis"], title: "Redis", sub: "chat history" },
    ],
    edges: [
      { from: "gh", to: "tf", n: 1 },
      { from: "tf", to: "acr", n: 2 },
      { from: "gh", to: "aks", n: 3 },
      { from: "acr", to: "aks", dashed: true, via: "h" },
      { from: "user", to: "lb", n: 4 },
      { from: "lb", to: "ingress" },
      { from: "ingress", to: "fe", via: "h" },
      { from: "ingress", to: "auth", via: "h" },
      { from: "ingress", to: "chat", via: "h" },
      { from: "auth", to: "pg" },
      { from: "chat", to: "rd" },
    ],
    steps: [
      "Terraform runs in the pipeline and creates the resource group, registry and cluster.",
      "It grants the cluster's kubelet identity the AcrPull role, so nodes pull images without secrets.",
      "The pipeline builds and pushes images, then runs kubectl apply -k with Kustomize image overrides.",
      "Users reach a single public IP. ingress-nginx routes / to the frontend, /api to auth and /ws to chat.",
    ],
  },

  buddy: {
    height: 520,
    label:
      "DevOps Buddy: a browser app calls a Cloudflare Worker whose read-only guard fronts Cloudflare and OpenAI, while automations and fixes queue in an approval gate that is the only path allowed to write to GitHub",
    groups: [{ x: 200, y: 20, w: 560, h: 480, label: "Cloudflare Workers", icon: "brand/cloudflare" }],
    nodes: [
      { id: "spa", cx: 90, cy: 260, icons: ["brand/react"], title: "Browser app", sub: "React · shadcn/ui" },
      { id: "auth", cx: 300, cy: 100, icons: ["lucide/key"], title: "Sign-in", sub: "Better Auth · OTP" },
      { id: "d1", cx: 640, cy: 100, icons: ["lucide/database"], title: "D1", sub: "state · cache · audit" },
      { id: "api", cx: 300, cy: 260, icons: ["brand/hono"], title: "API", sub: "budgeted views" },
      { id: "guard", cx: 640, cy: 260, icons: ["lucide/shield"], title: "Read-only guard", sub: "GET · HEAD · 3 POSTs", tone: "accent" },
      { id: "auto", cx: 300, cy: 410, icons: ["lucide/zap"], title: "Automations", sub: "webhooks · cron · events" },
      { id: "gate", cx: 640, cy: 410, icons: ["lucide/shield-check"], title: "Approval gate", sub: "allowlist · token · audit", tone: "accent" },
      { id: "oa", cx: 860, cy: 120, icons: ["lucide/sparkles"], title: "OpenAI", sub: "root cause · fixes" },
      { id: "cf", cx: 860, cy: 260, icons: ["brand/cloudflare"], title: "Cloudflare API", sub: "54 products · read" },
      { id: "gh", cx: 860, cy: 410, icons: ["brand/github"], title: "GitHub", sub: "PRs on buddy/* only" },
    ],
    edges: [
      { from: "spa", to: "api", n: 1 },
      { from: "api", to: "guard", n: 2 },
      { from: "guard", to: "cf" },
      { from: "guard", to: "oa", dashed: true },
      { from: "auto", to: "gate", n: 3 },
      { from: "gate", to: "gh", n: 4 },
      { from: "auth", to: "d1", dashed: true },
      { from: "api", to: "auto", dashed: true, via: "v" },
    ],
    steps: [
      "The browser talks to one Worker. Sign-in uses one-time codes, so no password hashing is needed on the free tier.",
      "Every upstream read goes through the guard: GET, HEAD and three listed read-only POSTs. Anything else throws.",
      "Automations and AI fixes never write directly. They queue an approval request.",
      "After a human approves, the only write path opens a pull request on a buddy/* branch. It never merges.",
    ],
  },

  devsecops: {
    height: 380,
    label:
      "DevSecOps pipeline: linting, static security analysis, tests, an image build and a container scan gate the release of a service made of an API, a worker, Redis and Postgres",
    groups: [{ x: 20, y: 205, w: 920, h: 160, label: "Docker Compose · health checks and dependency order", icon: "brand/docker" }],
    nodes: [
      { id: "push", cx: 90, cy: 90, icons: ["brand/github"], title: "Push / PR", sub: "GitHub Actions" },
      { id: "lint", cx: 250, cy: 90, icons: ["lucide/check"], title: "flake8", sub: "style · fast" },
      { id: "sast", cx: 410, cy: 90, icons: ["lucide/shield"], title: "Bandit", sub: "static security", tone: "accent" },
      { id: "test", cx: 570, cy: 90, icons: ["brand/pytest"], title: "pytest", sub: "unit · API" },
      { id: "build", cx: 730, cy: 90, icons: ["brand/docker"], title: "Build image", sub: "multi-stage · non-root" },
      { id: "scan", cx: 890, cy: 90, icons: ["lucide/scan"], title: "Trivy", sub: "image scan", tone: "accent" },
      { id: "pg", cx: 150, cy: 285, icons: ["brand/postgresql"], title: "PostgreSQL", sub: "data" },
      { id: "api", cx: 390, cy: 285, icons: ["brand/fastapi"], title: "FastAPI", sub: "REST + web UI" },
      { id: "worker", cx: 630, cy: 285, icons: ["brand/celery"], title: "Celery worker", sub: "async tasks" },
      { id: "redis", cx: 850, cy: 285, icons: ["brand/redis"], title: "Redis", sub: "broker · cache" },
    ],
    edges: [
      { from: "push", to: "lint", n: 1 },
      { from: "lint", to: "sast" },
      { from: "sast", to: "test" },
      { from: "test", to: "build" },
      { from: "build", to: "scan", n: 2 },
      { from: "api", to: "pg" },
      { from: "api", to: "worker", dashed: true },
      { from: "worker", to: "redis" },
    ],
    steps: [
      "Checks run in order of cost: style, then static security analysis, then tests.",
      "The image is built and scanned before it can be published. A failing gate stops the pipeline.",
    ],
  },
};
