export interface Experience {
  company: string
  role: string
  period: string
  location: string
  type: 'remote' | 'hybrid' | 'onsite'
  description: string
  bullets: string[]
  tech: string[]
  current?: boolean
}

export interface Education {
  institution: string
  degree: string
  field: string
  period: string
  gpa?: string
  highlights?: string[]
}

export const cvData = {
  name: 'Asim Alizada',
  title: 'Lead/Senior Software Engineer',
  email: 'asim.alizada.dev@gmail.com',
  github: 'https://github.com/asimalizada',
  linkedin: 'https://www.linkedin.com/in/alizada-asim',
  location: 'Istanbul, Türkiye',
  timezone: 'IST (UTC+3)',
  cvPath: '/cv/Asim Alizada - CV.pdf',
  profilePhoto: '/cv/profile.png',
  summary:
    'Lead/Senior Software Engineer with 6+ years of experience building full-stack, cloud-based platforms using .NET, Node.js, React, Next.js, and Angular. Strong background in microservices, integrations, release management, and scalable product delivery across cybersecurity, fitness, energy, EdTech, and enterprise systems.',
  currentStatus: 'Leading full-stack cloud platform delivery at Webidea',
  skills: {
    languages: ['C#', 'TypeScript', 'JavaScript', 'Python', 'SQL'],
    backend: ['ASP.NET Core', 'Node.js', 'NestJS', 'GraphQL', 'REST', 'gRPC'],
    frontend: ['React', 'Next.js', 'Angular', 'TypeScript', 'HTML/CSS'],
    databases: ['PostgreSQL', 'MongoDB', 'SQL Server', 'MySQL', 'Redis'],
    cloud: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'CI/CD', 'Jenkins', 'Cloudflare', 'Railway'],
    architecture: ['Microservices', 'Distributed Systems', 'Event-Driven Architecture', 'Clean Architecture'],
    tools: ['Git', 'VS Code', 'Rider', 'Postman', 'Figma'],
  },
  experience: [
    {
      company: 'Webidea',
      role: 'Lead Software Engineer',
      period: 'Feb 2026 – Present',
      location: 'Remote, USA',
      type: 'remote',
      current: true,
      description: 'Leading full-stack development for a cloud-based fitness platform, covering backend services, product workflows, frontend delivery, release management, and cloud deployments.',
      bullets: [
        'Designed scalable APIs and integration-ready services across core platform features.',
        'Owned release management, CI/CD workflows, and cloud deployments across Railway, Cloudflare, and GitHub.',
        'Standardized service architecture, environment configuration, and production deployment practices.',
      ],
      tech: ['C#', '.NET', 'Node.js', 'Railway', 'Cloudflare', 'Docker', 'CI/CD'],
    },
    {
      company: 'Progressocore',
      role: 'Senior Software Engineer',
      period: 'Apr 2025 – Present',
      location: 'Remote, USA',
      type: 'remote',
      current: true,
      description: 'Worked on a cybersecurity validation and automation platform, building full-stack features across backend services, frontend modules, integrations, and endpoint-based security workflows.',
      bullets: [
        'Built full-stack features using NestJS, Prisma, React/Next.js, and micro-frontends for cybersecurity testing workflows.',
        'Designed a dynamic ITSM integration framework for Jira and ServiceNow with configurable auth, fields, statuses, and ticket rules.',
        'Developed a .NET endpoint agent deployed in customer environments to simulate and validate security controls.',
      ],
      tech: ['NestJS', 'Prisma', 'React', 'Next.js', '.NET', 'Micro-Frontends'],
    },
    {
      company: 'Simplexity Group',
      role: 'Software Engineer, Contract',
      period: 'Aug 2025 – Apr 2026',
      location: 'Remote, France',
      type: 'remote',
      description: 'Worked on an Energy Management System, building full-stack features for device monitoring, operational workflows, and secure file handling.',
      bullets: [
        'Developed .NET/Angular features to improve device monitoring and energy management workflows.',
        'Implemented Google Maps-based device tracking with custom markers and real-time visualizations.',
        'Built backend workers, event-driven processing, and MinIO/local file storage with signed URL access.',
      ],
      tech: ['C#', '.NET', 'Angular', 'MinIO', 'Docker', 'Event-Driven'],
    },
    {
      company: 'Tayqa Tech',
      role: 'Software Engineer',
      period: 'Aug 2023 – Apr 2025',
      location: 'Baku, Azerbaijan',
      type: 'onsite',
      description: 'Built enterprise business platforms and internal systems using .NET Core and Angular.',
      bullets: [
        'Developed CRM, Sales, Workplan, and Delivery modules using .NET Core and Angular.',
        'Integrated ERP platforms and internal services to automate enterprise data exchange.',
        'Built an internal low-code platform for faster creation and management of business applications.',
      ],
      tech: ['C#', '.NET Core', 'Angular', 'SQL Server', 'ERP Integration'],
    },
    {
      company: 'TechBridge Solutions',
      role: 'Software Engineer',
      period: 'Jun 2022 – Aug 2023',
      location: 'Baku, Azerbaijan',
      type: 'onsite',
      description: 'Built EdTech platform features across backend services, frontend applications, integrations, and cloud-based deployments.',
      bullets: [
        'Built end-to-end session management and incident detection features for an EdTech LMS across .NET and NestJS microservices.',
        'Developed Angular dashboards and React/Next.js applications for teacher and student workflows.',
        'Integrated Stripe, PayPal, local payment providers, and supported Docker/AWS-based deployments.',
      ],
      tech: ['.NET', 'NestJS', 'Angular', 'React', 'Next.js', 'Docker', 'AWS'],
    },
    {
      company: 'InsureSoft',
      role: 'Junior Software Engineer',
      period: 'Jun 2021 – Jun 2022',
      location: 'Baku, Azerbaijan',
      type: 'onsite',
      description: 'Developed enterprise business modules and external integrations for operational workflows.',
      bullets: [
        'Developed enterprise business modules using .NET and ASP.NET MVC to support operational workflows.',
        'Integrated biometric attendance and external services via REST/SOAP APIs.',
      ],
      tech: ['C#', 'ASP.NET MVC', '.NET', 'REST', 'SOAP'],
    },
    {
      company: 'SmartSoft Technologies',
      role: 'Junior Software Engineer',
      period: 'Feb 2020 – Jun 2021',
      location: 'Baku, Azerbaijan',
      type: 'onsite',
      description: 'Built real-time monitoring and backend processing components for enterprise software systems.',
      bullets: [
        'Built real-time Angular dashboards with SignalR/WebSockets for live data monitoring.',
        'Developed .NET jobs, Python components, and REST APIs for data processing and classification.',
      ],
      tech: ['Angular', 'SignalR', 'WebSockets', '.NET', 'Python', 'REST'],
    },
    {
      company: 'Academy of Public Administration',
      role: 'Part-time IT Instructor',
      period: 'Sep 2020 – Oct 2023',
      location: 'Baku, Azerbaijan',
      type: 'onsite',
      description: 'Taught practical software engineering topics through hands-on instruction.',
      bullets: [
        'Taught C#, .NET Core, Web API, and Angular through project-based training.',
      ],
      tech: ['C#', '.NET Core', 'Web API', 'Angular'],
    },
  ] as Experience[],
  education: [
    {
      institution: 'The Academy of Public Administration',
      degree: 'Master of Science',
      field: 'Information Systems Security',
      period: '2023 – 2025',
      gpa: '94.8/100 (4.0/4.0)',
      highlights: ['Baku, Azerbaijan'],
    },
    {
      institution: 'The Academy of Public Administration',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      period: '2019 – 2023',
      gpa: '94.3/100 (4.0/4.0)',
      highlights: ['Baku, Azerbaijan'],
    },
  ] as Education[],
  languages: [
    { lang: 'Azerbaijani', level: 'Native' },
    { lang: 'English', level: 'Professional' },
  ],
  stats: {
    yearsOfExperience: 6,
    countriesWorked: 3,
    projectsShipped: 20,
  },
}
