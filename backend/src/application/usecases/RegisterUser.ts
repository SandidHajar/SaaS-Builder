import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IUserRepository } from '../../domain/interfaces/IUserRepository';
import { CreateUserDTO, AuthResponse } from '../../domain/entities/User';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-change-in-production';

export class RegisterUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: CreateUserDTO): Promise<AuthResponse> {
    if (!data.email || !data.password) {
      throw new Error('Email and password are required');
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      throw new Error('Invalid email format');
    }

    // Validate password strength
    if (data.password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    // Check if user already exists
    const existing = await this.userRepository.findByEmail(data.email.toLowerCase());
    if (existing) {
      throw new Error('User with this email already exists');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(data.password, 12);

    // Create user
    const user = await this.userRepository.create({
      email: data.email.toLowerCase(),
      name: data.name,
      passwordHash,
    });

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
