import { Router } from 'express';
import { ProjectController } from '../controllers/ProjectController';
import { rateLimiter } from '../middlewares/rateLimiter';

const router = Router();

// GET /api/projects - List all projects
router.get('/', ProjectController.list);

// POST /api/projects - Create a new project
router.post('/', ProjectController.create);

// GET /api/projects/:id - Get project details with artifacts
router.get('/:id', ProjectController.getById);

// POST /api/projects/:id/generate - Trigger AI generation
router.post('/:id/generate', rateLimiter, ProjectController.generate);

export default router;
