export interface UseCategory {
  name: string
  items: UseItem[]
}

export interface UseItem {
  name: string
  description: string
  link?: string
}

export const usesData: UseCategory[] = [
  {
    name: 'Development Environment',
    items: [
      {
        name: 'Cursor & Antigravity / manus.ai',
        description: 'Leveraging next-gen AI-native coding agents to accelerate delivery and automate complex workflows.',
      },
      {
        name: 'Visual Studio 2022 / 2026',
        description: 'The heavyweight powerhouse for high-level enterprise .NET solution management and refactoring.',
      },
      {
        name: 'VS Code & DataGrip',
        description: 'Lightweight polyglot editing and professional-grade database management.',
      },
      {
        name: 'Scalar & Postman',
        description: 'My API design workshop. Scalar for modern documentation; Postman for collaborative contract testing.',
      },
    ],
  },
  {
    name: 'Backend & System Architecture',
    items: [
      {
        name: '.NET Core & C# / Node.js & NestJS',
        description: 'Building resilient systems with Clean, Onion, and Hexagonal architecture patterns.',
      },
      {
        name: 'Protocols: gRPC / GraphQL / REST',
        description: 'Choosing the most efficient communication layer for distributed microservices.',
      },
      {
        name: 'Messaging: Kafka & RabbitMQ',
        description: 'The reliable backbone for asynchronous, event-driven architectures.',
      },
      {
        name: 'Benchmarking: BenchmarkDotNet / Clinic.js',
        description: 'Continuous performance optimization and bottleneck detection in the runtime.',
      },
      {
        name: 'Security: Burp Suite / SonarQube / Dependabot',
        description: 'Proactive security testing and static analysis to maintain a robust security posture.',
      },
    ],
  },
  {
    name: 'Frontend & UI Engineering',
    items: [
      {
        name: 'Next.js & React / React Native',
        description: 'Developing high-performance user interfaces and cross-platform mobile apps.',
      },
      {
        name: 'Angular / Shadcn UI / Figma',
        description: 'Bridging the gap between high-end design and enterprise-level frontend structures.',
      },
      {
        name: 'Mermaid.js & Excalidraw',
        description: 'Visualizing architectural decisions and complex system flows.',
      },
    ],
  },
  {
    name: 'Infrastructure & DevOps',
    items: [
      {
        name: 'Kubernetes (K8s) & Docker',
        description: 'Orchestrating containerized environments using tools like k9s and LazyDocker.',
      },
      {
        name: 'pnpm / NuGet / yarn / npm',
        description: 'Managing complex dependency trees efficiently across different ecosystems.',
      },
      {
        name: 'Cloud: AWS / Azure / Railway / Cloudflare',
        description: 'Harnessing global infrastructure, Serverless functions, and secure tunneling.',
      },
      {
        name: 'Observability: Grafana / Prometheus / Seq / Kibana / Serilog',
        description: 'Full-stack visibility into system health, metrics, and distributed traces.',
      },
    ],
  },
  {
    name: 'AI, Productivity & Knowledge',
    items: [
      {
        name: 'Claude / ChatGPT / Gemini',
        description: 'My AI Brain trust for architectural reviews, logic clarification, and research.',
      },
      {
        name: 'Notion / Slite / 1Password',
        description: 'Organizing my engineering second brain and securing critical secrets.',
      },
      {
        name: 'Slack / MS Teams / ClickUp / Jira',
        description: 'Synchronizing with teams using Agile methodologies and modern communication.',
      },
      {
        name: 'Workflow: Conventional Commits / Husky',
        description: 'Enforcing high git standards and automated pre-commit quality checks.',
      },
    ],
  },
  {
    name: 'Hardware & Core Systems',
    items: [
      {
        name: 'Asus ROG Strix G533QR',
        description: 'Ryzen 9 5900HX, RTX 3070, 32GB RAM – A dedicated workstation for multi-container development.',
      },
      {
        name: 'WSL2 & PowerShell 7',
        description: 'Seamlessly blending Windows productivity with native Linux engineering capabilities.',
      },
    ],
  },
]
