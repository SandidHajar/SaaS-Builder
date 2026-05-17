import { User } from '../entities/User';

export interface IUserRepository {
  create(data: { email: string; name?: string; passwordHash: string }): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}
