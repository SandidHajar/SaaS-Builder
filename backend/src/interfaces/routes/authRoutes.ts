import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// POST /api/auth/register - Register a new user
router.post('/register', AuthController.register);

// POST /api/auth/login - Login
router.post('/login', AuthController.login);

// GET /api/auth/me - Get current user (protected)
router.get('/me', authMiddleware, AuthController.me);

export default router;
