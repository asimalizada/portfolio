export interface Project {
  id: string
  title: string
  role?: string
  description: string
  longDescription?: string
  impact?: string[]
  tech: string[]
  tags: string[]
  github?: string
  demo?: string
  stars?: number
  status: 'active' | 'archived' | 'wip'
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: 'fitxlink',
    title: 'Fitxlink Fitness Platform',
    role: 'Lead Software Engineer',
    description: 'Production-grade cloud fitness platform providing CRM capabilities for gyms, including memberships, marketplace, and operational management.',
    impact: [
      'Designed and implemented backend architecture using .NET and Node.js (Clean Architecture)',
      'Built super-admin and gym CRM interfaces using React, Next.js, and shadcn',
      'Owned CI/CD pipelines and deployment workflows using GitHub, Railway, and Cloudflare',
      'Implemented scalable data and caching layers with PostgreSQL and Redis',
      'Managed production infrastructure with Docker and cloud-based delivery'
    ],
    tech: ['.NET', 'Node.js', 'React', 'Next.js', 'PostgreSQL', 'Redis', 'Docker', 'Cloudflare', 'Railway'],
    tags: ['SaaS', 'Production'],
    status: 'active',
    demo: 'https://fitxlink.com',
    featured: true,
  },
  {
    id: 'fintech-transfer',
    title: 'Fintech Transfer Platform',
    role: 'Founding Software Engineer · Team Lead',
    description: 'Cross-provider financial transfer platform enabling seamless transactions between services like PayPal, Wise, Payoneer, and Revolut.',
    impact: [
      'Built the platform from scratch using a modular monolith architecture',
      'Designed backend services with NestJS following Clean Architecture principles',
      'Developed responsive UI using Next.js and React',
      'Led a team of 4 engineers and drove Agile delivery processes',
      'Structured the codebase using monorepo architecture for scalability'
    ],
    tech: ['NestJS', 'React', 'Next.js', 'PostgreSQL', 'Docker', 'Monorepo'],
    tags: ['Startup', 'Fintech'],
    status: 'active',
    featured: true,
  },
  {
    id: 'cybersecurity-automation',
    title: 'Cybersecurity Automation Platform',
    role: 'Senior Software Engineer',
    description: 'Enterprise cybersecurity platform that simulates attack scenarios and integrates with security providers to detect vulnerabilities.',
    impact: [
      'Developed attack execution engines using .NET with advanced concurrency (multi-threading, semaphores, mutex)',
      'Built integrations with major security platforms (Wiz, Zscaler, Devo, Entra ID, CrowdStrike, Sophos, Netskope)',
      'Implemented event-driven architecture with RabbitMQ and Kafka',
      'Designed data pipelines, collectors, and real-time monitoring systems',
      'Contributed to full-stack platform (React, Next.js, NestJS, Express)',
      'Wrote unit and integration tests for critical systems',
      'Worked with distributed infrastructure using AWS and Kubernetes'
    ],
    tech: ['.NET', 'NestJS', 'React', 'Next.js', 'Kafka', 'RabbitMQ', 'MongoDB', 'PostgreSQL', 'ElasticSearch', 'Kubernetes', 'AWS'],
    tags: ['Enterprise', 'Security'],
    status: 'active',
    featured: true,
  },
  {
    id: 'edutech-platform',
    title: 'Edutech Platform',
    role: 'Lead Software Engineer',
    description: 'End-to-end education platform connecting teachers, students, and parents with features like live classes, assignments, and mobile applications.',
    impact: [
      'Led architecture and development across backend, frontend, and mobile',
      'Built services using .NET and Node.js with Clean Architecture',
      'Developed admin panel with Angular and user interface with React/Next.js',
      'Built mobile apps using React Native (iOS & Android)',
      'Implemented real-time systems using WebSockets and SignalR',
      'Designed scalable messaging and event systems with RabbitMQ',
      'Managed CI/CD pipelines and cloud infrastructure'
    ],
    tech: ['.NET', 'Node.js', 'Angular', 'React', 'Next.js', 'React Native', 'PostgreSQL', 'Redis', 'RabbitMQ', 'Docker', 'AWS'],
    tags: ['Product', 'Mobile', 'Education'],
    status: 'wip',
    featured: true,
  },
  {
    id: 'energy-management',
    title: 'Energy Management System',
    role: 'Software Engineer',
    description: 'Real-time energy monitoring platform that collects data from distributed devices, visualizes live metrics, and triggers automated alerts.',
    impact: [
      'Built backend services using .NET with Clean/Hexagonal architecture',
      'Implemented real-time communication using SignalR',
      'Integrated Google Maps for geolocation-based device tracking',
      'Developed conditional alerting system with automated ticket creation',
      'Designed file handling system using MinIO',
      'Integrated Firebase services for additional system capabilities'
    ],
    tech: ['.NET', 'Angular', 'SignalR', 'PostgreSQL', 'MinIO', 'Firebase', 'Docker', 'AWS', 'Azure'],
    tags: ['Enterprise', 'IoT'],
    status: 'active',
    featured: false,
  },
  {
    id: 'tayqatech-low-code',
    title: 'TayqaTech Low-Code Platform',
    role: 'Software Engineer',
    description: 'A modular low-code platform enabling businesses to build CRM, sales, and operational systems dynamically through configurable interfaces.',
    impact: [
      'Developed backend services and background workers using .NET',
      'Built low-code UI builder using Angular',
      'Enabled dynamic website rendering based on user-defined configurations',
      'Integrated with ERP systems for enterprise workflows',
      'Designed scalable database structures using MSSQL'
    ],
    tech: ['.NET', 'Angular', 'MSSQL', 'Docker'],
    tags: ['B2B', 'Production', 'Low-Code'],
    status: 'archived',
    demo: 'https://www.tayqatech.com/en',
    featured: false,
  }
]
