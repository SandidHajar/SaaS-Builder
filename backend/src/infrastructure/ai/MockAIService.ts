import { IAIService, AIGenerationResult } from '../../domain/interfaces/IAIService';

/**
 * Mock AI Service — returns realistic demo data.
 * Used when OPENAI_API_KEY is missing or quota is exhausted.
 */
export class MockAIService implements IAIService {
  async generateIdeaAnalysis(
    projectName: string,
    description: string
  ): Promise<AIGenerationResult> {
    await this.simulateDelay();
    return {
      summary: `${projectName} is an innovative platform that addresses a critical gap in the market. ${description.slice(0, 100)}...`,
      problemStatement:
        'Current solutions are fragmented, expensive, and fail to leverage modern AI capabilities to deliver personalized experiences at scale.',
      targetAudience: {
        primary: 'Tech-savvy professionals aged 25-45 in urban areas',
        secondary: 'Small and medium businesses looking to optimize operations',
        marketSize: 'Estimated $4.2B TAM with 18% CAGR through 2030',
      },
      valueProposition:
        'The only all-in-one platform that combines AI-driven insights with an intuitive UX, reducing time-to-value by 60%.',
      competitiveAdvantage: [
        'Proprietary AI model trained on industry-specific data',
        'First-mover advantage in an underserved niche',
        'Network effects from a two-sided marketplace model',
        'Patent-pending recommendation algorithm',
      ],
      revenueModel: {
        primary: 'SaaS subscription (tiered: Starter $29/mo, Pro $79/mo, Enterprise custom)',
        secondary: [
          'Marketplace transaction fees (2.5%)',
          'Premium API access for enterprise integrations',
          'White-label licensing for B2B partners',
        ],
        pricingStrategy:
          'Freemium model with usage-based pricing to drive adoption, then upsell to Pro/Enterprise tiers.',
      },
      risks: [
        'Dependency on third-party AI infrastructure (OpenAI/Anthropic)',
        'Regulatory uncertainty in data privacy (GDPR, CCPA)',
        'High customer acquisition costs in a competitive market',
        'Technical complexity of real-time processing at scale',
      ],
      opportunities: [
        'Expand into adjacent verticals (healthcare, education, fintech)',
        'Strategic partnerships with established enterprise platforms',
        'International expansion into emerging markets',
        'AI model fine-tuning for industry-specific use cases',
      ],
      viabilityScore: 7.8,
      recommendation:
        'Strong concept with clear product-market fit potential. Recommend validating with 50 beta users before scaling. Focus on a single vertical initially to build domain expertise and case studies.',
    };
  }

  async generateRoadmap(
    projectName: string,
    description: string
  ): Promise<AIGenerationResult> {
    await this.simulateDelay();
    return {
      vision: `${projectName} will become the go-to platform for intelligent automation, empowering users to achieve more with less effort.`,
      mvpGoal:
        'Deliver a working prototype with core AI features that demonstrates clear value to early adopters and validates product-market fit.',
      timeline: '10-14 weeks',
      phases: [
        {
          name: 'Phase 1: Foundation',
          duration: '3 weeks',
          goals: [
            'Set up project infrastructure and CI/CD pipeline',
            'Design and implement core database schema',
            'Build authentication and user management',
          ],
          deliverables: [
            'Deployed staging environment',
            'User registration and login flow',
            'Admin dashboard skeleton',
          ],
          milestones: ['Infrastructure live on cloud provider', 'First user sign-up'],
        },
        {
          name: 'Phase 2: Core Features',
          duration: '4 weeks',
          goals: [
            'Implement primary AI-powered workflows',
            'Build the main user-facing dashboard',
            'Integrate third-party APIs',
          ],
          deliverables: [
            'Functional AI analysis pipeline',
            'Interactive results dashboard',
            'API documentation (OpenAPI/Swagger)',
          ],
          milestones: ['First successful AI-generated output', 'API v1 stable'],
        },
        {
          name: 'Phase 3: Polish & Launch',
          duration: '3 weeks',
          goals: [
            'User testing and feedback incorporation',
            'Performance optimization and security audit',
            'Marketing site and onboarding flow',
          ],
          deliverables: [
            'Production-ready application',
            'Landing page with waitlist',
            'Onboarding tutorial and documentation',
          ],
          milestones: ['Beta launch with 50 users', 'First paying customer'],
        },
      ],
      features: {
        mustHave: [
          { name: 'User Authentication', description: 'JWT-based auth with email/password and OAuth', priority: 'P0', effort: 'Medium' },
          { name: 'AI Analysis Engine', description: 'Core AI pipeline for processing user inputs', priority: 'P0', effort: 'High' },
          { name: 'Results Dashboard', description: 'Interactive visualization of AI-generated insights', priority: 'P0', effort: 'Medium' },
          { name: 'Project Management', description: 'CRUD operations for user projects', priority: 'P0', effort: 'Low' },
        ],
        shouldHave: [
          { name: 'Export to PDF', description: 'Download analysis results as formatted PDF reports', priority: 'P1', effort: 'Medium' },
          { name: 'Team Collaboration', description: 'Invite team members and share projects', priority: 'P1', effort: 'High' },
          { name: 'Email Notifications', description: 'Automated emails for completed analyses', priority: 'P1', effort: 'Low' },
        ],
        niceToHave: [
          { name: 'AI Chat Assistant', description: 'Conversational interface for refining analyses', priority: 'P2', effort: 'High' },
          { name: 'Custom Branding', description: 'White-label options for enterprise clients', priority: 'P2', effort: 'Medium' },
          { name: 'Mobile App', description: 'React Native companion app for on-the-go access', priority: 'P2', effort: 'High' },
        ],
      },
      successMetrics: [
        { metric: 'User Activation Rate', target: '> 40% within first week', measurement: 'Users completing first analysis / total sign-ups' },
        { metric: 'Weekly Active Users', target: '500 WAU by month 3', measurement: 'Unique users performing actions per week' },
        { metric: 'Net Promoter Score', target: '> 50', measurement: 'Quarterly NPS survey to active users' },
        { metric: 'Monthly Recurring Revenue', target: '$5,000 MRR by month 6', measurement: 'Stripe dashboard tracking' },
      ],
      launchChecklist: [
        'Security audit completed (OWASP Top 10)',
        'Load testing passed (1000 concurrent users)',
        'GDPR compliance verified',
        'Monitoring and alerting configured (Sentry, Datadog)',
        'Backup and disaster recovery plan tested',
        'Terms of Service and Privacy Policy published',
        'Customer support workflow established',
      ],
    };
  }

  async generateArchitecture(
    projectName: string,
    description: string
  ): Promise<AIGenerationResult> {
    await this.simulateDelay();
    return {
      overview: `${projectName} follows a modern microservices-inspired architecture with a clear separation between the presentation layer, business logic, and data access. The system is designed for horizontal scalability and high availability.`,
      techStack: {
        frontend: {
          framework: 'Next.js 16 (App Router)',
          styling: 'Tailwind CSS 4 with custom design system',
          stateManagement: 'React Server Components + Zustand for client state',
          reasoning:
            'Next.js provides SSR/SSG for SEO, App Router for modern patterns, and excellent DX. Tailwind ensures consistent styling at scale.',
        },
        backend: {
          runtime: 'Node.js 22 LTS',
          framework: 'Express 5 with TypeScript',
          api: 'RESTful API with OpenAPI 3.1 specification',
          reasoning:
            'Express 5 offers mature ecosystem and middleware support. TypeScript ensures type safety across the stack.',
        },
        database: {
          primary: 'PostgreSQL 17 (via Neon serverless)',
          cache: 'Redis (Upstash) for session management and job queues',
          reasoning:
            'PostgreSQL provides ACID compliance and JSON support. Redis enables sub-millisecond caching and reliable background job processing.',
        },
        infrastructure: {
          hosting: 'Vercel (frontend) + Railway (backend) + Neon (database)',
          ci_cd: 'GitHub Actions with automated testing and preview deployments',
          monitoring: 'Sentry (errors) + Vercel Analytics (performance) + Grafana (metrics)',
        },
      },
      systemDesign: {
        components: [
          { name: 'API Gateway', responsibility: 'Request routing, rate limiting, authentication', technology: 'Express middleware' },
          { name: 'Auth Service', responsibility: 'JWT token management, OAuth integration', technology: 'jsonwebtoken + bcrypt' },
          { name: 'AI Pipeline', responsibility: 'Orchestrate AI generation workflows', technology: 'OpenAI SDK + BullMQ' },
          { name: 'Storage Service', responsibility: 'File uploads and asset management', technology: 'AWS S3 / Cloudflare R2' },
          { name: 'Notification Service', responsibility: 'Email and webhook notifications', technology: 'Resend + webhooks' },
        ],
        dataFlow:
          'Client → Next.js (SSR) → Express API → Service Layer → Repository → PostgreSQL. AI requests are queued via BullMQ → Worker → OpenAI API → Database update → Client polling.',
        security: [
          'JWT-based authentication with refresh token rotation',
          'CORS restricted to allowed origins',
          'Input validation with Zod schemas',
          'SQL injection prevention via Prisma ORM parameterized queries',
          'Rate limiting per IP and per user',
          'HTTPS enforced in production',
        ],
      },
      dataModels: [
        { name: 'User', fields: ['id: UUID', 'email: string (unique)', 'passwordHash: string', 'name: string', 'plan: enum', 'createdAt: timestamp'], relationships: 'Has many Projects' },
        { name: 'Project', fields: ['id: UUID', 'name: string', 'description: text', 'status: enum', 'userId: UUID (FK)', 'createdAt: timestamp'], relationships: 'Belongs to User, Has many Artifacts' },
        { name: 'Artifact', fields: ['id: UUID', 'type: enum (IDEA|ROADMAP|ARCHITECTURE)', 'content: JSONB', 'projectId: UUID (FK)', 'createdAt: timestamp'], relationships: 'Belongs to Project' },
      ],
      apiEndpoints: [
        { method: 'POST', path: '/api/auth/register', description: 'Register a new user account' },
        { method: 'POST', path: '/api/auth/login', description: 'Authenticate and receive JWT tokens' },
        { method: 'GET', path: '/api/projects', description: 'List all projects for authenticated user' },
        { method: 'POST', path: '/api/projects', description: 'Create a new project' },
        { method: 'GET', path: '/api/projects/:id', description: 'Get project details with all artifacts' },
        { method: 'POST', path: '/api/projects/:id/generate', description: 'Trigger AI generation for a project' },
        { method: 'DELETE', path: '/api/projects/:id', description: 'Delete a project and its artifacts' },
      ],
      deploymentStrategy: {
        approach: 'GitOps with automated deployments on push to main branch',
        environments: ['development (local)', 'staging (preview URLs)', 'production'],
        scalingStrategy:
          'Horizontal scaling via serverless functions (Vercel) and containerized backend (Railway). Database scales vertically with Neon auto-scaling. Redis handles burst traffic with connection pooling.',
      },
      starterCode: {
        projectStructure:
          '├── frontend/\n│   ├── src/app/          # Next.js App Router pages\n│   ├── src/components/  # Reusable UI components\n│   ├── src/lib/         # API client, utilities\n│   └── src/types/       # TypeScript interfaces\n├── backend/\n│   ├── src/domain/      # Entities & interfaces\n│   ├── src/application/  # Use cases\n│   ├── src/infrastructure/ # External services\n│   └── src/interfaces/  # Controllers & routes\n└── shared/              # Shared types & constants',
        keyFiles: [
          { path: 'backend/src/index.ts', description: 'Express server entry point with middleware configuration', snippet: 'app.use(cors());\napp.use(express.json());\napp.use(\'/api/projects\', projectRoutes);' },
          { path: 'frontend/src/lib/api.ts', description: 'Type-safe API client for frontend-backend communication', snippet: 'export const api = {\n  projects: {\n    list: () => fetchJSON(\'/api/projects\'),\n    create: (data) => fetchJSON(\'/api/projects\', { method: \'POST\', body: data })\n  }\n};' },
        ],
      },
    };
  }

  private simulateDelay(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 1200));
  }
}
