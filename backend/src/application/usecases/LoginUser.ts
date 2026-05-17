import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IUserRepository } from '../../domain/interfaces/IUserRepository';
import { LoginDTO, AuthResponse } from '../../domain/entities/User';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-change-in-production';

export class LoginUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: LoginDTO): Promise<AuthResponse> {
    if (!data.email || !data.password) {
      throw new Error('Email and password are required');
    }

    // Find user
    const user = await this.userRepository.findByEmail(data.email.toLowerCase());
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Verify password
    if (!user.passwordHash) {
      throw new Error('Invalid email or password');
    }

    const isValid = await bcrypt.compare(data.password, user.passwordHash);
    if (!isValid) {
      throw new Error('Invalid email or password');
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return user without passwordHash
    const { passwordHash: _, ...safeUser } = user;
    return { user: safeUser, token };
  }
}
