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
  title: 'Senior Software Engineer',
  email: 'asim.alizada.dev@gmail.com',
  github: 'https://github.com/asimalizada',
  linkedin: 'https://www.linkedin.com/in/alizada-asim',
  location: 'Istanbul, Türkiye',
  timezone: 'AZT (UTC+4)',
  cvPath: '/cv/Asim Alizada - CV.pdf',
  profilePhoto: '/cv/profile.jpeg',
  summary:
    'Senior Software Engineer with 5+ years of experience building scalable backend systems and cloud-native platforms using .NET and Node.js. Specialized in microservices, distributed systems, and infrastructure design, with experience across cybersecurity and fintech products.',
  currentStatus: 'Building at scale',
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
      location: 'Remote (Austin, USA)',
      type: 'remote',
      current: true,
      description: 'Designing and building backend services for a cloud-based fitness platform.',
      bullets: [
        'Designed and implemented backend services in .NET and Node.js to power a cloud-based fitness platform',
        'Architected microservices-based backend systems to support scalable and modular platform growth',
        'Managed cloud infrastructure and deployments using Railway, Cloudflare, GitHub, and CI/CD pipelines',
        'Built scalable APIs and backend systems enabling platform integrations and core business services',
      ],
      tech: ['C#', '.NET', 'Node.js', 'Railway', 'Cloudflare', 'Docker', 'CI/CD'],
    },
    {
      company: 'Cymulate (via Progressocore)',
      role: 'Software Engineer',
      period: 'Apr 2025 – Present',
      location: 'Remote (New York, USA)',
      type: 'remote',
      current: true,
      description: 'Building backend services powering cybersecurity testing workflows.',
      bullets: [
        'Designed and implemented backend services in .NET and Node.js powering cybersecurity testing workflows',
        'Developed and deployed a .NET-based endpoint agent to simulate and validate security threats in customer environments',
        'Integrated enterprise security platforms including Devo, Zscaler, Wiz, Sophos, and Microsoft Entra ID',
        'Built distributed workflows and automation systems to support large-scale cybersecurity testing',
      ],
      tech: ['C#', '.NET', 'Node.js', 'Docker', 'AWS', 'Distributed Systems'],
    },
    {
      company: 'Glix (EVU Ventures)',
      role: 'Founding Software Engineer',
      period: 'Jan 2026 – Mar 2026',
      location: 'Remote (New York, USA)',
      type: 'remote',
      description: 'Led backend architecture design for a fintech platform from scratch.',
      bullets: [
        'Led backend architecture design for a fintech platform from scratch, defining system structure, services, and engineering standards',
        'Developed the user platform using React and Next.js while establishing code review standards and engineering practices',
        'Built and managed AWS-based infrastructure, implemented CI/CD pipelines, and mentored a team of 4 engineers',
      ],
      tech: ['React', 'Next.js', 'AWS', 'CI/CD', 'TypeScript'],
    },
    {
      company: 'Simplexity Group',
      role: 'Software Engineer',
      period: 'Aug 2025 – Mar 2026',
      location: 'Remote (Paris, France)',
      type: 'remote',
      description: 'Developed core features for an Energy Management System.',
      bullets: [
        'Developed core features for an Energy Management System using .NET and Angular, improving system monitoring and operational workflows',
        'Implemented Google Maps-based device monitoring with custom markers and real-time data visualization',
        'Designed a pluggable file storage abstraction (MinIO/local) with signed URL support for secure file access',
        'Developed backend services including background workers and event-driven processing for scalable system operations',
      ],
      tech: ['C#', '.NET', 'Angular', 'MinIO', 'Docker', 'Event-Driven'],
    },
    {
      company: 'Tayqa Tech',
      role: 'Software Engineer',
      period: 'Aug 2023 – Apr 2025',
      location: 'Baku, Azerbaijan',
      type: 'onsite',
      description: 'Developed CRM, Sales, and Workplan systems for business operations.',
      bullets: [
        'Developed CRM, Sales, and Workplan systems using .NET Core APIs and Angular to support business operations',
        'Integrated enterprise systems with ERP platforms and internal services',
        'Led development of an internal low-code platform enabling rapid creation and management of business applications',
      ],
      tech: ['C#', '.NET Core', 'Angular', 'SQL Server', 'ERP Integration'],
    },
    {
      company: 'Freelance',
      role: 'Software Engineer',
      period: 'Jun 2022 – Aug 2023',
      location: 'Remote',
      type: 'remote',
      description: 'Developed custom web applications and APIs for various clients.',
      bullets: [
        'Developed custom web applications and APIs using .NET and Node.js for various business use cases',
        'Built frontend interfaces with React and Angular',
        'Delivered full-stack solutions including deployment and third-party integrations',
      ],
      tech: ['C#', 'Node.js', 'React', 'Angular', '.NET'],
    },
    {
      company: 'InsureSoft',
      role: 'Full-Stack Software Engineer',
      period: 'Jun 2021 – Jun 2022',
      location: 'Baku, Azerbaijan',
      type: 'onsite',
      description: 'Developed enterprise HR and insurance systems.',
      bullets: [
        'Developed enterprise HR and insurance systems using .NET and ASP.NET MVC',
        'Integrated biometric attendance and external services via REST and SOAP APIs',
      ],
      tech: ['C#', 'ASP.NET MVC', '.NET', 'REST', 'SOAP'],
    },
    {
      company: 'DIA Student Youth Organization',
      role: 'IT Instructor',
      period: 'Dec 2020 – Oct 2022',
      location: 'Baku, Azerbaijan',
      type: 'onsite',
      description: 'Taught C#, .NET Core, Web API and Angular through practical projects.',
      bullets: [
        'Taught C#, .NET Core, Web API and Angular through practical software development projects',
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
    yearsOfExperience: 5,
    countriesWorked: 3,
    projectsShipped: 20,
  },
}
