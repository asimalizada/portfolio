export type WorkspaceModuleId = 'development' | 'ai' | 'infrastructure' | 'hardware'

export interface WorkspaceTool {
  name: string
  description: string
}

export interface WorkspaceToolGroup {
  label: string
  tools: WorkspaceTool[]
}

// A tool inventory for the Uses workbench. Names come from the former Uses
// sections and the already published AI technology index on the homepage.
export const workspaceInventory: Record<WorkspaceModuleId, WorkspaceToolGroup[]> = {
  development: [
    {
      label: 'Editors & data',
      tools: [
        { name: 'Visual Studio 2022 / 2026', description: '.NET solution development, debugging, and refactoring.' },
        { name: 'VS Code', description: 'Editing across frontend, backend, and configuration files.' },
        { name: 'DataGrip', description: 'Inspecting schemas and working with database queries.' },
      ],
    },
    {
      label: 'APIs & interfaces',
      tools: [
        { name: 'Scalar', description: 'Reading and testing API documentation.' },
        { name: 'Postman', description: 'Sending requests and testing API contracts.' },
        { name: 'Figma', description: 'Working from interface designs and design decisions.' },
        { name: 'shadcn/ui', description: 'Composing interface components in frontend projects.' },
        { name: 'Mermaid.js', description: 'Documenting system flows as diagrams.' },
        { name: 'Excalidraw', description: 'Sketching architecture and interaction flows.' },
      ],
    },
    {
      label: 'Quality & workflow',
      tools: [
        { name: 'BenchmarkDotNet', description: 'Measuring .NET runtime performance.' },
        { name: 'Clinic.js', description: 'Investigating Node.js performance bottlenecks.' },
        { name: 'Burp Suite', description: 'Inspecting and testing application security.' },
        { name: 'SonarQube', description: 'Reviewing static analysis findings.' },
        { name: 'Dependabot', description: 'Tracking dependency updates and alerts.' },
        { name: 'Husky', description: 'Running checks before commits.' },
        { name: 'Conventional Commits', description: 'Keeping commit messages consistent.' },
      ],
    },
    {
      label: 'Dependencies & coordination',
      tools: [
        { name: 'pnpm', description: 'Managing JavaScript dependencies.' },
        { name: 'NuGet', description: 'Managing .NET packages.' },
        { name: 'npm', description: 'Managing JavaScript packages and scripts.' },
        { name: 'yarn', description: 'Working with JavaScript project dependencies.' },
        { name: 'Notion', description: 'Keeping project and engineering notes.' },
        { name: 'Slite', description: 'Maintaining shared documentation.' },
        { name: 'Jira', description: 'Tracking development work.' },
        { name: 'ClickUp', description: 'Coordinating tasks and project work.' },
        { name: 'Slack', description: 'Team communication.' },
        { name: 'MS Teams', description: 'Team communication and meetings.' },
      ],
    },
  ],
  ai: [
    {
      label: 'Coding & agent tools',
      tools: [
        { name: 'Cursor', description: 'AI-assisted editing during implementation.' },
        { name: 'Antigravity', description: 'Agent-based development tasks.' },
        { name: 'manus.ai', description: 'Automating multi-step development workflows.' },
      ],
    },
    {
      label: 'Research & reasoning',
      tools: [
        { name: 'Claude', description: 'Working through architecture and implementation questions.' },
        { name: 'ChatGPT', description: 'Technical research and problem solving.' },
        { name: 'Gemini', description: 'Research and alternative perspectives on technical decisions.' },
      ],
    },
    {
      label: 'Model APIs',
      tools: [
        { name: 'OpenAI API', description: 'Calling OpenAI models from application services.' },
        { name: 'Anthropic API', description: 'Using Anthropic models in application workflows.' },
      ],
    },
    {
      label: 'Engineering practices',
      tools: [
        { name: 'RAG', description: 'Combining retrieval with model context.' },
        { name: 'Vector Databases', description: 'Indexing embeddings for semantic retrieval.' },
        { name: 'AI Agents', description: 'Coordinating model-driven tasks in applications.' },
      ],
    },
  ],
  infrastructure: [
    {
      label: 'Containers & deployment',
      tools: [
        { name: 'Docker', description: 'Building and running containerized services.' },
        { name: 'Kubernetes', description: 'Orchestrating containerized environments.' },
        { name: 'k9s', description: 'Inspecting Kubernetes resources from the terminal.' },
        { name: 'LazyDocker', description: 'Inspecting local containers and logs.' },
        { name: 'CI/CD', description: 'Automated build and deployment checks.' },
      ],
    },
    {
      label: 'Cloud platforms',
      tools: [
        { name: 'AWS', description: 'Hosting and operating cloud services.' },
        { name: 'Azure', description: 'Hosting and operating cloud services.' },
        { name: 'Railway', description: 'Deploying application services.' },
        { name: 'Cloudflare', description: 'Edge services and secure tunneling.' },
      ],
    },
    {
      label: 'Observability',
      tools: [
        { name: 'Grafana', description: 'Inspecting system metrics and dashboards.' },
        { name: 'Prometheus', description: 'Collecting and querying service metrics.' },
        { name: 'Seq', description: 'Searching structured application logs.' },
        { name: 'Kibana', description: 'Exploring logs and operational data.' },
        { name: 'Serilog', description: 'Producing structured logs in .NET services.' },
      ],
    },
    {
      label: 'Access',
      tools: [
        { name: '1Password', description: 'Managing credentials and development secrets.' },
      ],
    },
  ],
  hardware: [
    {
      label: 'Workstation',
      tools: [
        { name: 'Asus ROG Strix G533QR', description: 'Ryzen 9 5900HX, RTX 3070, and 32GB RAM for local development.' },
      ],
    },
    {
      label: 'Local environment',
      tools: [
        { name: 'Windows', description: 'The host operating system for desktop development.' },
        { name: 'WSL2', description: 'A Linux environment for development on Windows.' },
        { name: 'PowerShell 7', description: 'Terminal and scripting environment.' },
      ],
    },
  ],
}
