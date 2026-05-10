import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create a sample user
  const user = await prisma.user.upsert({
    where: { email: 'demo@aisaasbuilder.com' },
    update: {},
    create: {
      email: 'demo@aisaasbuilder.com',
      name: 'Demo User',
    },
  });

  console.log('Created user:', user);

  // Create a sample project
  const project = await prisma.project.upsert({
    where: { id: 'seed-project-001' },
    update: {},
    create: {
      id: 'seed-project-001',
      name: 'Smart Grocery List',
      description:
        'An AI-powered grocery shopping app that learns user preferences, suggests recipes based on what is on sale, creates optimized shopping lists, and tracks nutritional intake. Target audience is busy professionals who want to eat healthy without spending time planning meals.',
      status: 'COMPLETED',
      userId: user.id,
    },
  });

  console.log('Created project:', project);

  // Create sample artifacts
  const ideaArtifact = await prisma.artifact.upsert({
    where: { projectId_type: { projectId: project.id, type: 'IDEA' } },
    update: {},
    create: {
      projectId: project.id,
      type: 'IDEA',
      content: {
        summary:
          'Smart Grocery List is an AI-powered grocery shopping assistant that learns user dietary preferences, monitors local store sales, suggests healthy recipes, and generates optimized shopping lists.',
        problemStatement:
          'Busy professionals struggle to plan healthy meals, often resorting to unhealthy takeout because grocery shopping and meal planning take too much time and mental energy.',
        targetAudience: {
          primary: 'Busy professionals aged 25-45',
          secondary: 'Health-conscious families, meal prep enthusiasts',
          marketSize: '$12B grocery delivery and meal planning market',
        },
        valueProposition:
          'Save 3+ hours per week on meal planning and grocery shopping while eating healthier and spending less.',
        competitiveAdvantage: [
          'AI learns individual taste preferences over time',
          'Real-time sale integration from local stores',
          'Nutritional tracking built into meal suggestions',
          'One-tap ordering from grocery delivery services',
        ],
        revenueModel: {
          primary: 'Freemium subscription ($9.99/mo premium)',
          secondary: [
            'Affiliate commissions from grocery delivery partners',
            'Sponsored recipe placements from food brands',
          ],
          pricingStrategy: 'Free tier with basic lists, premium unlocks AI recipes and nutritional tracking',
        },
        risks: [
          'High competition from established meal planning apps',
          'Dependency on grocery store API access for sale data',
          'User trust for dietary recommendations',
        ],
        opportunities: [
          'Partnership with major grocery chains',
          'Expansion to dietary-restricted markets (keto, vegan, allergen-free)',
          'Integration with smart home devices',
        ],
        viabilityScore: 8,
        recommendation:
          'Strong product-market fit with clear monetization paths. Recommend starting with a single metro area to prove the sale-integration model before scaling.',
      },
    },
  });

  const roadmapArtifact = await prisma.artifact.upsert({
    where: { projectId_type: { projectId: project.id, type: 'ROADMAP' } },
    update: {},
    create: {
      projectId: project.id,
      type: 'ROADMAP',
      content: {
        vision: 'Be the default grocery companion for health-conscious professionals',
        mvpGoal: 'Validate core loop: input preferences → get recipes → generate shopping list',
        timeline: '10 weeks',
        phases: [
          {
            name: 'Phase 1: Foundation',
            duration: '2 weeks',
            goals: ['Set up tech stack', 'Design core data models'],
            deliverables: ['Auth flow', 'Preference onboarding', 'Database schema'],
            milestones: ['Users can sign up and set dietary preferences'],
          },
          {
            name: 'Phase 2: Core Engine',
            duration: '3 weeks',
            goals: ['Build recipe suggestion engine', 'Shopping list generation'],
            deliverables: ['AI recipe API', 'List builder UI', 'Ingredient parser'],
            milestones: ['Users receive recipe suggestions and generate lists'],
          },
          {
            name: 'Phase 3: Polish & Launch',
            duration: '3 weeks',
            goals: ['UI polish', 'Testing', 'Soft launch'],
            deliverables: ['Responsive mobile UI', 'Push notifications', 'Landing page'],
            milestones: ['Beta launch with 100 test users'],
          },
        ],
        features: {
          mustHave: [
            { name: 'User onboarding', description: 'Dietary preference survey', priority: 'P0', effort: 'Medium' },
            { name: 'Recipe suggestions', description: 'AI-generated meal ideas', priority: 'P0', effort: 'High' },
            { name: 'Shopping list', description: 'Auto-generated optimized list', priority: 'P0', effort: 'Medium' },
          ],
          shouldHave: [
            { name: 'Nutritional info', description: 'Calorie & macro tracking', priority: 'P1', effort: 'Medium' },
            { name: 'Favorites', description: 'Save favorite recipes', priority: 'P1', effort: 'Low' },
          ],
          niceToHave: [
            { name: 'Sale alerts', description: 'Notify on relevant store sales', priority: 'P2', effort: 'High' },
            { name: 'Social sharing', description: 'Share lists with family', priority: 'P2', effort: 'Medium' },
          ],
        },
        successMetrics: [
          { metric: 'Weekly active users', target: '500', measurement: 'Analytics dashboard' },
          { metric: 'List generation rate', target: '3 lists/user/week', measurement: 'Backend logs' },
          { metric: 'Retention D7', target: '40%', measurement: 'Cohort analysis' },
        ],
        launchChecklist: [
          'Performance audit',
          'Security review',
          'App store listing',
          'Customer support setup',
          'Analytics integration',
        ],
      },
    },
  });

  const archArtifact = await prisma.artifact.upsert({
    where: { projectId_type: { projectId: project.id, type: 'ARCHITECTURE' } },
    update: {},
    create: {
      projectId: project.id,
      type: 'ARCHITECTURE',
      content: {
        overview: 'Mobile-first progressive web app with a microservices backend',
        techStack: {
          frontend: {
            framework: 'Next.js 14 with App Router',
            styling: 'Tailwind CSS',
            stateManagement: 'Zustand',
            reasoning: 'SSR for SEO, Tailwind for rapid UI, Zustand for lightweight state',
          },
          backend: {
            runtime: 'Node.js 20 LTS',
            framework: 'Express.js',
            api: 'REST API with OpenAPI spec',
            reasoning: 'Mature ecosystem, easy to hire for, extensive middleware support',
          },
          database: {
            primary: 'PostgreSQL 16',
            cache: 'Redis for session and recipe cache',
            reasoning: 'Relational data model fits recipes/ingredients, Redis for fast lookups',
          },
          infrastructure: {
            hosting: 'Vercel (frontend) + Railway (backend)',
            ci_cd: 'GitHub Actions',
            monitoring: 'Sentry + Vercel Analytics',
          },
        },
        systemDesign: {
          components: [
            { name: 'Web Client', responsibility: 'User-facing PWA', technology: 'Next.js' },
            { name: 'API Gateway', responsibility: 'Request routing & auth', technology: 'Express.js' },
            { name: 'Recipe Engine', responsibility: 'AI recipe generation', technology: 'OpenAI API' },
            { name: 'List Builder', responsibility: 'Shopping list optimization', technology: 'Node.js' },
          ],
          dataFlow: 'Client → API Gateway → Service Layer → Database / AI Provider',
          security: ['JWT auth', 'Rate limiting', 'Input sanitization', 'HTTPS everywhere'],
        },
        dataModels: [
          {
            name: 'User',
            fields: ['id: uuid', 'email: string', 'preferences: json', 'createdAt: timestamp'],
            relationships: 'Has many ShoppingLists, has many SavedRecipes',
          },
          {
            name: 'Recipe',
            fields: ['id: uuid', 'title: string', 'ingredients: json', 'instructions: text', 'nutrition: json'],
            relationships: 'Has many Ingredients, belongs to many Users',
          },
        ],
        apiEndpoints: [
          { method: 'POST', path: '/api/auth/signup', description: 'Register new user' },
          { method: 'GET', path: '/api/recipes/suggest', description: 'Get AI recipe suggestions' },
          { method: 'POST', path: '/api/lists', description: 'Create shopping list from recipes' },
          { method: 'GET', path: '/api/lists/:id', description: 'Get shopping list details' },
        ],
        deploymentStrategy: {
          approach: 'Continuous deployment via GitHub Actions',
          environments: ['development', 'staging', 'production'],
          scalingStrategy: 'Horizontal scaling on Railway, edge caching on Vercel',
        },
        starterCode: {
          projectStructure:
            'src/\n├── app/\n├── components/\n├── lib/\n├── services/\n├── models/\n└── utils/',
          keyFiles: [
            {
              path: 'src/services/recipeEngine.ts',
              description: 'Core AI recipe generation service',
              snippet: 'export async function suggestRecipes(preferences: UserPrefs): Promise<Recipe[]> { ... }',
            },
          ],
        },
      },
    },
  });

  console.log('Created artifacts:', {
    idea: ideaArtifact.id,
    roadmap: roadmapArtifact.id,
    architecture: archArtifact.id,
  });

  console.log('✅ Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
