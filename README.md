# AI SaaS Builder

Turn your startup ideas into production-ready plans with AI-powered analysis.

## 🎯 What it does

Input a startup idea → Get instant AI-generated:
- **Business Analysis** — target audience, revenue model, viability score
- **MVP Roadmap** — phased timeline, feature priorities, success metrics
- **Technical Architecture** — tech stack, system design, API endpoints, starter code

## 🧱 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16 (App Router) + TypeScript + Tailwind CSS |
| Backend | Node.js + Express 5 + TypeScript |
| Database | PostgreSQL + Prisma 7 ORM |
| Queue | BullMQ + Redis (optional for dev) |
| AI | OpenAI API (GPT-4o-mini) |
| Deploy | Vercel (frontend) + Railway (backend) |

## 📁 Project Structure

```
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma          # Database models
│   │   └── seed.ts                # Sample data
│   ├── prisma.config.ts           # Prisma 7 config
│   └── src/
│       ├── domain/                # Entities & interfaces
│       │   ├── entities/
│       │   └── interfaces/
│       ├── application/           # Use cases
│       │   └── usecases/
│       ├── infrastructure/        # External services
│       │   ├── ai/
│       │   │   ├── agents/        # Modular AI agents
│       │   │   ├── prompts/       # Prompt templates
│       │   │   ├── openaiClient.ts
│       │   │   └── OpenAIService.ts
│       │   ├── database/
│       │   ├── queue/
│       │   └── repositories/
│       ├── interfaces/            # API layer
│       │   ├── controllers/
│       │   ├── middlewares/
│       │   └── routes/
│       └── index.ts
├── frontend/
│   └── src/
│       ├── app/
│       │   ├── page.tsx           # Dashboard
│       │   ├── projects/new/      # Create project
│       │   └── projects/[id]/     # Project details + tabs
│       ├── lib/api.ts             # API client
│       └── types/index.ts
```

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- PostgreSQL database
- OpenAI API key

### 1. Backend Setup

```bash
cd backend
cp .env.example .env
# Edit .env with your DATABASE_URL and OPENAI_API_KEY

npm install
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed   # Load sample data
npm run dev           # Starts on :3001
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev           # Starts on :3000
```

### 3. (Optional) Queue Worker

If you have Redis running and set `REDIS_URL` in `.env`:

```bash
cd backend
npm run worker
```

## 🔌 API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/projects` | List all projects |
| `POST` | `/api/projects` | Create a project |
| `GET` | `/api/projects/:id` | Get project with artifacts |
| `POST` | `/api/projects/:id/generate` | Trigger AI generation |

## 🎨 Design

- **Glassmorphism** UI with frosted-glass cards
- **Auto dark/light** mode (follows system preference)
- **Animated background** with floating gradient orbs
- **Micro-animations** — skeleton loaders, fade-ins, pulse dots
- **Responsive** — works on mobile, tablet, desktop

## 🧠 Architecture

Follows **Clean Architecture** with clear separation:

- **Domain** — Pure entities and interfaces (no framework deps)
- **Application** — Use cases orchestrating business logic
- **Infrastructure** — Prisma, OpenAI, BullMQ implementations
- **Interfaces** — Express controllers, routes, middleware

## ⚡ Key Design Decisions

- **Queue is optional** — Falls back to sync generation when `REDIS_URL` is not set
- **Modular AI agents** — Each generator (idea, roadmap, architecture) is independent
- **JSON mode** — OpenAI responses use `response_format: json_object` for reliable parsing
- **Upsert artifacts** — Regeneration overwrites previous results cleanly
- **Polling** — Frontend polls every 3s during generation for progressive updates

## 📝 License

MIT
