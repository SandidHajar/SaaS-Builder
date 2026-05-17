import { Request, Response, NextFunction } from 'express';
import { RegisterUserUseCase } from '../../application/usecases/RegisterUser';
import { LoginUserUseCase } from '../../application/usecases/LoginUser';
import { PrismaUserRepository } from '../../infrastructure/repositories/PrismaUserRepository';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';

const userRepository = new PrismaUserRepository();
const registerUseCase = new RegisterUserUseCase(userRepository);
const loginUseCase = new LoginUserUseCase(userRepository);

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, name } = req.body;
      const result = await registerUseCase.execute({ email, password, name });
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const result = await loginUseCase.execute({ email, password });
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  static async me(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const user = await userRepository.findById(req.userId!);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const { passwordHash: _, ...safeUser } = user;
      res.json(safeUser);
    } catch (error) {
      next(error);
    }
  }
}
