export const IDEA_ANALYSIS_PROMPT = `You are an expert startup advisor and business analyst. Analyze the following startup idea and provide a comprehensive breakdown.

**Project Name:** {{projectName}}
**Description:** {{description}}

Respond in valid JSON format with the following structure:
{
  "summary": "A concise 2-3 sentence summary of the business idea",
  "problemStatement": "The core problem this startup solves",
  "targetAudience": {
    "primary": "Primary target user segment",
    "secondary": "Secondary target user segments",
    "marketSize": "Estimated total addressable market"
  },
  "valueProposition": "The unique value proposition",
  "competitiveAdvantage": ["List of competitive advantages"],
  "revenueModel": {
    "primary": "Primary revenue stream",
    "secondary": ["Other potential revenue streams"],
    "pricingStrategy": "Suggested pricing approach"
  },
  "risks": ["Key risks and challenges"],
  "opportunities": ["Growth opportunities"],
  "viabilityScore": 8,
  "recommendation": "Overall recommendation and next steps"
}`;

export const ROADMAP_PROMPT = `You are a senior product manager and startup strategist. Create a detailed MVP roadmap for the following project.

**Project Name:** {{projectName}}
**Description:** {{description}}

Respond in valid JSON format with the following structure:
{
  "vision": "Product vision statement",
  "mvpGoal": "The primary goal of the MVP",
  "timeline": "Estimated timeline for MVP (e.g., 8-12 weeks)",
  "phases": [
    {
      "name": "Phase 1: Foundation",
      "duration": "2 weeks",
      "goals": ["Goal 1", "Goal 2"],
      "deliverables": ["Deliverable 1", "Deliverable 2"],
      "milestones": ["Milestone 1"]
    }
  ],
  "features": {
    "mustHave": [
      {
        "name": "Feature name",
        "description": "Feature description",
        "priority": "P0",
        "effort": "Medium"
      }
    ],
    "shouldHave": [
      {
        "name": "Feature name",
        "description": "Feature description",
        "priority": "P1",
        "effort": "Low"
      }
    ],
    "niceToHave": [
      {
        "name": "Feature name",
        "description": "Feature description",
        "priority": "P2",
        "effort": "High"
      }
    ]
  },
  "successMetrics": [
    {
      "metric": "Metric name",
      "target": "Target value",
      "measurement": "How to measure"
    }
  ],
  "launchChecklist": ["Pre-launch task 1", "Pre-launch task 2"]
}`;

export const ARCHITECTURE_PROMPT = `You are a senior software architect with deep expertise in modern web technologies. Design the technical architecture for the following project.

**Project Name:** {{projectName}}
**Description:** {{description}}

Respond in valid JSON format with the following structure:
{
  "overview": "High-level architecture overview",
  "techStack": {
    "frontend": {
      "framework": "Recommended framework",
      "styling": "CSS framework/approach",
      "stateManagement": "State management solution",
      "reasoning": "Why this choice"
    },
    "backend": {
      "runtime": "Runtime environment",
      "framework": "Backend framework",
      "api": "API approach (REST/GraphQL)",
      "reasoning": "Why this choice"
    },
    "database": {
      "primary": "Primary database",
      "cache": "Caching solution",
      "reasoning": "Why this choice"
    },
    "infrastructure": {
      "hosting": "Hosting provider",
      "ci_cd": "CI/CD approach",
      "monitoring": "Monitoring tools"
    }
  },
  "systemDesign": {
    "components": [
      {
        "name": "Component name",
        "responsibility": "What it does",
        "technology": "Technology used"
      }
    ],
    "dataFlow": "Description of how data flows through the system",
    "security": ["Security considerations and implementations"]
  },
  "dataModels": [
    {
      "name": "Model name",
      "fields": ["field1: type", "field2: type"],
      "relationships": "Relationships with other models"
    }
  ],
  "apiEndpoints": [
    {
      "method": "GET/POST/PUT/DELETE",
      "path": "/api/resource",
      "description": "What this endpoint does"
    }
  ],
  "deploymentStrategy": {
    "approach": "Deployment approach",
    "environments": ["development", "staging", "production"],
    "scalingStrategy": "How to scale"
  },
  "starterCode": {
    "projectStructure": "Recommended folder structure as a tree string",
    "keyFiles": [
      {
        "path": "path/to/file",
        "description": "What this file does",
        "snippet": "Key code snippet"
      }
    ]
  }
}`;
