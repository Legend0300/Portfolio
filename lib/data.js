// All portfolio content lives here. Facts in case studies come from the repositories they link to (or describe).

export const profile = {
  name: "Muhammad Ahmed Mansur",
  role: "Solutions Architect",
  headline: "I design cloud platforms that are cheap to run, safe to change, and easy to explain.",
  intro:
    "Architecture, infrastructure as code and delivery pipelines across Azure, AWS and Cloudflare, from the first diagram to the pipeline that ships it.",
  email: "ahmed.mansur.bhatti@gmail.com",
  linkedin: "https://www.linkedin.com/in/muhammad-ahmed-b55539250/",
  github: "https://github.com/Legend0300",
  cv: "/cv.pdf",
};

export const glance = [
  { label: "Clouds", value: "Azure · AWS · Cloudflare" },
  { label: "Platform and delivery", value: "Kubernetes · Terraform · GitHub Actions" },
  { label: "Build with", value: "Go · Python · TypeScript" },
];

export const approach = [
  {
    step: "Frame",
    copy: "Requirements, constraints and failure modes first: who uses it, what it may cost, what must never break.",
  },
  {
    step: "Compare",
    copy: "Two or three viable options with their trade-offs, including cost and operational load, not just the favourite.",
  },
  {
    step: "Decide",
    copy: "A short written decision: what was chosen, what was rejected, and what would make me revisit it.",
  },
  {
    step: "Build",
    copy: "Infrastructure as code and a pipeline from day one. The smallest system that meets the constraints.",
  },
  {
    step: "Operate",
    copy: "Observability, drift detection, runbooks and a cost lever, so the design keeps working after hand-over.",
  },
];

export const caseStudies = [
  {
    id: "solar-atlas",
    kind: "AWS · Multi-environment GitOps",
    title: "Solar Atlas: a multi-environment AWS platform managed entirely through Terraform and pull requests",
    summary:
      "A flat, prod-only Terraform repository refactored into reusable modules and separate dev and prod stacks, with a GitOps path from pull request to plan, dev apply, and gated promotion to prod.",
    problem:
      "One flat repository meant one environment: every change touched production, nothing could be rehearsed, and the structure could not be reused for a second stack.",
    decisions: [
      {
        title: "Modules plus one stack per environment",
        why: "Seven reusable modules (network, data, iam, lambdas, ecs-ec2-backend, frontend-cdn, observability) are called by live/dev and live/prod with their own variable files, so dev is a true rehearsal of prod.",
      },
      {
        title: "One state key per stack, with native S3 locking",
        why: "global, dev and prod each get their own key in an S3 backend. A bad apply in one stack cannot corrupt another, and native locking removes the need for a separate lock table.",
      },
      {
        title: "GitHub OIDC instead of stored cloud credentials",
        why: "An account-level OIDC provider lets workflows assume deploy roles for the duration of a run. No long-lived AWS keys live in the repository or its secrets.",
      },
      {
        title: "Plan on the PR, apply on merge, promote on purpose",
        why: "Separate workflows for plan, apply-dev, apply-prod, drift detection and hotfix. Reviewers see the plan before merge, and prod only changes through promotion or a deliberate hotfix path.",
      },
      {
        title: "Private origin behind a CDN",
        why: "The frontend is a private S3 bucket served through CloudFront with origin access control and a Route 53 alias, so the bucket is never public.",
      },
      {
        title: "A written go-live order for the billable steps",
        why: "Delegate DNS first, then per environment: repository, image, then the rest, then secrets out-of-band and a forced redeploy. Ordering mistakes are the expensive ones.",
      },
    ],
    facts: [
      { value: "7", label: "reusable Terraform modules" },
      { value: "2 + 1", label: "environments plus an account-global stack" },
      { value: "5", label: "GitHub Actions workflows: plan, apply x2, drift, hotfix" },
    ],
    stack: ["Terraform", "AWS", "ECS on EC2", "Lambda", "DynamoDB", "S3", "CloudFront", "Route 53", "IAM / OIDC", "GitHub Actions"],
    links: [],
    private: true,
    diagram: "solar",
  },
  {
    id: "aks-platform",
    kind: "Azure · Kubernetes platform",
    title: "A cost-aware Kubernetes platform on Azure: Terraform to AKS, delivered by GitHub Actions",
    summary:
      "A Next.js frontend, a Go authentication API and a Go WebSocket chat service, provisioned with Terraform on AKS and deployed with Kustomize from a single pipeline, with the cost levers written down.",
    problem:
      "Show a complete path from an empty subscription to running services, and make the running cost something you can reason about and switch off.",
    decisions: [
      {
        title: "Identity-based image pulls",
        why: "Terraform grants the AKS kubelet identity the AcrPull role on the registry, so the cluster pulls images without registry passwords or pull secrets.",
      },
      {
        title: "One ingress, three routes",
        why: "ingress-nginx sends / to the frontend, /api to the auth service and /ws to the chat service on a single public IP, which keeps the load balancer count and the bill down.",
      },
      {
        title: "Stateless services, stateful data",
        why: "The Go services stay stateless and validate JWTs issued by the auth service. Postgres runs as a StatefulSet with init SQL from a ConfigMap; Redis holds recent chat history.",
      },
      {
        title: "Kustomize image overrides",
        why: "The pipeline builds and pushes images to ACR, then applies the manifests with the new tags without editing YAML by hand.",
      },
      {
        title: "Cost as a design input",
        why: "AKS Free tier, ACR Basic, a 0.1 GB daily Log Analytics quota with 30-day retention, and a stop/start script so compute charges drop when nobody is using it. The docs also cover a full destroy.",
      },
    ],
    facts: [
      { value: "3", label: "services: frontend, auth API, chat over WebSocket" },
      { value: "0.1 GB", label: "daily log ingestion cap" },
      { value: "1", label: "workflow from push to running pods" },
    ],
    stack: ["Azure", "AKS", "ACR", "Terraform", "Kubernetes", "Kustomize", "ingress-nginx", "Go", "PostgreSQL", "Redis", "GitHub Actions"],
    links: [{ label: "Repository", href: "https://github.com/Ahmed-Mansur/Go-Microservice-Pipeline" }],
    private: false,
    diagram: "aks",
  },
  {
    id: "devops-buddy",
    kind: "Cloudflare · Product architecture",
    title: "DevOps Buddy: an AI-native, read-only-by-default DevOps platform running entirely on Cloudflare",
    summary:
      "A SaaS that maps a team's GitHub Actions and Cloudflare estate into projects and services, explains failures with an AI root cause, and can draft fixes as pull requests that only open after a human approves.",
    problem:
      "Give companies with many projects one place to see, understand, fix and verify their delivery, without handing an autonomous agent the keys to production.",
    decisions: [
      {
        title: "Read-only by construction",
        why: "Every upstream call goes through one guard that allows GET and HEAD plus three explicitly listed read-only POSTs. Anything else throws, so monitoring code cannot change anything by accident.",
      },
      {
        title: "A single, audited write path with approval",
        why: "Writes use a separate write-scoped connection, an endpoint allowlist, one-time approval tokens and an audit log. Fixes land on buddy/* branches, and Buddy never merges or touches default branches.",
      },
      {
        title: "A data-driven Cloudflare catalog",
        why: "Fifty-four Cloudflare products are described as declarative registry entries, so adding one is a data change. The executor respects token permissions and marks unreadable products as no access instead of failing.",
      },
      {
        title: "Designed around the free tier's limits",
        why: "Workers Free allows 10 ms of CPU and 50 subrequests per invocation. That ruled out password hashing (sign-in uses one-time codes) and drove incremental views that finish loading over a few requests.",
      },
      {
        title: "Event-driven, with humans in the loop",
        why: "Webhooks and polling emit events; automations analyse, draft and notify, but anything that writes waits in an approval inbox. Only opted-in, reversible actions can run on their own.",
      },
    ],
    facts: [
      { value: "54", label: "Cloudflare products modelled" },
      { value: "310", label: "automated tests" },
      { value: "0", label: "servers to manage: Workers and D1" },
    ],
    stack: ["Cloudflare Workers", "D1", "Hono", "React", "Better Auth", "OpenAI API", "Playwright", "Remotion"],
    links: [{ label: "Live demo", href: "https://devops-buddy.ahmed-mansur-bhatti.workers.dev/demo" }],
    private: false,
    diagram: "buddy",
  },
  {
    id: "devsecops",
    kind: "CI/CD · Security in the pipeline",
    title: "A DevSecOps pipeline that fails the build on insecure code and vulnerable images",
    summary:
      "A FastAPI service with a Celery worker, Redis and PostgreSQL, where linting, static security analysis, tests and container scanning are gates in GitHub Actions rather than afterthoughts.",
    problem: "Make secure-by-default the path of least resistance, so a vulnerable image cannot reach a registry unnoticed.",
    decisions: [
      {
        title: "Shift security left, in order of cost",
        why: "flake8 and Bandit run first because they are cheap and fast; tests come next; the container image is built and scanned with Trivy last, before anything is published.",
      },
      {
        title: "Hardened images",
        why: "Multi-stage Dockerfiles with a non-root user and a minimal footprint, plus an .env.example so secrets never enter the repository.",
      },
      {
        title: "A production-shaped local environment",
        why: "Docker Compose with health checks and dependency ordering for the API, worker, database and broker, so local runs match how the services start in production.",
      },
    ],
    facts: [
      { value: "3", label: "quality and security gates before build" },
      { value: "4", label: "containers: API, worker, Postgres, Redis" },
    ],
    stack: ["GitHub Actions", "Docker", "Trivy", "Bandit", "flake8", "pytest", "FastAPI", "Celery"],
    links: [{ label: "Repository", href: "https://github.com/M-Fahim-Feroz/fastapi-devsecops-pipeline" }],
    private: false,
    diagram: "devsecops",
  },
];

export const alsoBuilt = [
  {
    title: "App Gate: DNS proxy sinkhole",
    copy: "A C++20 DNS filtering server with blacklist and whitelist modes, a custom REST API and an Electron dashboard.",
    link: "https://github.com/Legend0300/DNS-Proxy-Sinkhole",
    stack: ["C++20", "Electron", "REST"],
  },
  {
    title: "Flask CI/CD",
    copy: "A GitHub Actions pipeline for a Flask API: tests, container build and a deploy gate.",
    link: "https://github.com/Legend0300/flask-CI-CD",
    stack: ["GitHub Actions", "Docker", "Python"],
  },
  {
    title: "Kubernetes starter",
    copy: "A containerised Python service with Kubernetes manifests and an ingress, plus a CI pipeline.",
    link: "https://github.com/Legend0300/kubernetes-proj",
    stack: ["Kubernetes", "Docker", "CI"],
  },
];

// Practices are not skills, so each one points at the case study where it can be seen.
export const practices = [
  { name: "Multi-environment design", where: "Solar Atlas", href: "#solar-atlas", proof: "Seven modules called by separate dev and prod stacks with their own variables." },
  { name: "Blast radius and state layout", where: "Solar Atlas", href: "#solar-atlas", proof: "One Terraform state key per stack, so a bad apply stays in its own stack." },
  { name: "GitOps promotion paths", where: "Solar Atlas", href: "#solar-atlas", proof: "Plan on the pull request, apply dev on merge, promote to prod on purpose." },
  { name: "Cost modelling and levers", where: "AKS platform", href: "#aks-platform", proof: "Free-tier AKS, a daily log quota, a stop/start script, and a documented teardown." },
  { name: "Least privilege and approval boundaries", where: "DevOps Buddy", href: "#devops-buddy", proof: "A read-only guard, a separate write path, one-time approvals and an audit log." },
  { name: "Designing to platform limits", where: "DevOps Buddy", href: "#devops-buddy", proof: "Workers Free limits shaped sign-in and how large views load." },
  { name: "Decisions written down", where: "AKS platform", href: "#aks-platform", proof: "An architecture document with a diagram and a cost document ship with the repository." },
];

// Technologies only, grouped by domain. Icons: official AWS and Azure service icons, Simple Icons brands, neutral glyphs.
export const skills = [
  {
    label: "Cloud platforms",
    columns: [
      {
        title: "AWS",
        icon: "aws/aws-cloud",
        items: [
          { name: "ECS", icon: "aws/ecs" },
          { name: "EC2 Auto Scaling", icon: "aws/ec2-asg" },
          { name: "Lambda", icon: "aws/lambda" },
          { name: "DynamoDB", icon: "aws/dynamodb" },
          { name: "S3", icon: "aws/s3" },
          { name: "CloudFront", icon: "aws/cloudfront" },
          { name: "Route 53", icon: "aws/route53" },
          { name: "IAM", icon: "aws/iam" },
          { name: "Systems Manager", icon: "aws/ssm" },
          { name: "CloudWatch", icon: "aws/cloudwatch" },
        ],
      },
      {
        title: "Azure",
        icon: "azure/resource-group",
        items: [
          { name: "AKS", icon: "azure/aks" },
          { name: "Container Registry", icon: "azure/acr" },
          { name: "Azure Monitor", icon: "azure/monitor" },
          { name: "Log Analytics", icon: "azure/log-analytics" },
          { name: "Load Balancer", icon: "azure/load-balancer" },
          { name: "Managed identities", icon: "azure/managed-identity" },
        ],
      },
      {
        title: "Cloudflare",
        icon: "brand/cloudflare",
        items: [
          { name: "Workers", icon: "brand/workers" },
          { name: "D1", icon: "lucide/database" },
          { name: "R2 and KV", icon: "lucide/database" },
          { name: "Pages", icon: "brand/cloudflare" },
        ],
      },
    ],
  },
  {
    label: "Containers and orchestration",
    items: [
      { name: "Kubernetes", icon: "brand/kubernetes" },
      { name: "Docker", icon: "brand/docker" },
      { name: "Helm", icon: "brand/helm" },
      { name: "Kustomize", icon: "brand/kubernetes" },
      { name: "ingress-nginx", icon: "brand/nginx" },
    ],
  },
  {
    label: "Infrastructure as code",
    items: [
      { name: "Terraform", icon: "brand/terraform" },
      { name: "Ansible", icon: "brand/ansible" },
    ],
  },
  {
    label: "CI/CD and GitOps",
    items: [
      { name: "GitHub Actions", icon: "brand/githubactions" },
      { name: "GitHub", icon: "brand/github" },
      { name: "Jenkins", icon: "brand/jenkins" },
    ],
  },
  {
    label: "Security and identity",
    items: [
      { name: "OIDC federation", icon: "aws/iam" },
      { name: "Trivy", icon: "brand/trivy" },
      { name: "Bandit", icon: "lucide/shield" },
      { name: "JWT", icon: "lucide/key" },
      { name: "Secrets: SSM and Kubernetes", icon: "lucide/lock" },
    ],
  },
  {
    label: "Observability",
    items: [
      { name: "Prometheus", icon: "brand/prometheus" },
      { name: "Grafana", icon: "brand/grafana" },
      { name: "Azure Monitor", icon: "azure/monitor" },
      { name: "CloudWatch", icon: "aws/cloudwatch" },
    ],
  },
  {
    label: "Data",
    items: [
      { name: "PostgreSQL", icon: "brand/postgresql" },
      { name: "Redis", icon: "brand/redis" },
      { name: "DynamoDB", icon: "aws/dynamodb" },
      { name: "SQLite and D1", icon: "brand/sqlite" },
    ],
  },
  {
    label: "Languages",
    items: [
      { name: "Go", icon: "brand/go" },
      { name: "Python", icon: "brand/python" },
      { name: "TypeScript", icon: "brand/typescript" },
      { name: "C++", icon: "brand/cpp" },
    ],
  },
];

export const learning = [
  { title: "Machine Learning Specialization", issuer: "Coursera", link: "https://coursera.org/share/fffa9e8fff63bfd5c29f995ac6d6fb24" },
  { title: "Node.js", issuer: "Coursera", link: "https://coursera.org/share/b4e0c2d5667f2a968b0702a29561e3c0" },
  { title: "React", issuer: "Coursera", link: "https://coursera.org/share/77755365f37e91d875393b2c83861431" },
  { title: "JavaScript", issuer: "Coursera", link: "https://coursera.org/share/e32a6448d840715f4097b8e7aa8b7910" },
  { title: "Introduction to Front-End Development", issuer: "Coursera", link: "https://www.coursera.org/account/accomplishments/certificate/4RN5TBSCJ9A7" },
];
