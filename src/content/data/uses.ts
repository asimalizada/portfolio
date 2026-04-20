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
    name: 'Editor & Terminal',
    items: [
      {
        name: 'Visual Studio Code',
        description: 'My primary editor for TypeScript, Node.js, and web work. Highly customized with extensions.',
        link: 'https://code.visualstudio.com',
      },
      {
        name: 'JetBrains Rider',
        description: 'Best-in-class IDE for .NET / C# development. The refactoring tools are unmatched.',
        link: 'https://www.jetbrains.com/rider',
      },
      {
        name: 'Windows Terminal + PowerShell 7',
        description: 'Fast, customizable terminal with oh-my-posh for a clean look.',
      },
      {
        name: 'GitHub Copilot',
        description: 'AI pair programmer. Useful for boilerplate and quick lookups I still write most of my code.',
      },
    ],
  },
  {
    name: 'Languages & Frameworks',
    items: [
      {
        name: 'C# / ASP.NET Core',
        description: 'My primary backend language. Clean, fast, and the ecosystem around it is excellent.',
      },
      {
        name: 'TypeScript + Node.js',
        description: 'For backend APIs when I need JavaScript\'s ecosystem or team familiarity.',
      },
      {
        name: 'React / Next.js',
        description: 'Go-to for anything frontend this site is built on Next.js 15 with App Router.',
      },
    ],
  },
  {
    name: 'Databases & Storage',
    items: [
      {
        name: 'PostgreSQL',
        description: 'My relational database of choice. Rock solid, feature-rich, and open source.',
      },
      {
        name: 'Redis',
        description: 'For caching, rate limiting, and distributed locking.',
      },
      {
        name: 'MongoDB',
        description: 'When document-oriented storage makes more sense than relational.',
      },
    ],
  },
  {
    name: 'Cloud & DevOps',
    items: [
      {
        name: 'Microsoft Azure',
        description: 'Primary cloud provider. Use AKS, App Services, Service Bus, and Key Vault regularly.',
        link: 'https://azure.microsoft.com',
      },
      {
        name: 'Docker',
        description: 'Everything runs in containers. Docker Desktop on local, Docker in CI.',
        link: 'https://docker.com',
      },
      {
        name: 'GitHub Actions',
        description: 'CI/CD pipelines for all my projects. Build, test, deploy all automated.',
      },
      {
        name: 'Vercel',
        description: 'Where this site is deployed. Zero-config Next.js deploys on every push.',
        link: 'https://vercel.com',
      },
    ],
  },
  {
    name: 'Productivity',
    items: [
      {
        name: 'Notion',
        description: 'Second brain for notes, project planning, and documentation.',
        link: 'https://notion.so',
      },
      {
        name: 'Postman',
        description: 'API testing and documentation. Great team collaboration features.',
      },
      {
        name: 'Figma',
        description: 'For UI mockups and design handoffs particularly useful when working with designers.',
      },
    ],
  },
  {
    name: 'Hardware',
    items: [
      {
        name: 'Custom PC',
        description: 'My main workstation for heavy builds, Docker workloads, and local dev environments.',
      },
    ],
  },
]
