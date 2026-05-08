import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private users: any[] = []; // In production, use database

  async register(email: string, password: string, firstName?: string, lastName?: string) {
    const existingUser = this.users.find(u => u.email === email);
    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      id: `user_${Date.now()}`,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role: 'CUSTOMER',
      createdAt: new Date(),
    };

    this.users.push(user);
    return { user: { id: user.id, email: user.email, firstName, lastName }, token: this.generateToken(user.id) };
  }

  async login(email: string, password: string) {
    const user = this.users.find(u => u.email === email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return { user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName }, token: this.generateToken(user.id) };
  }

  private generateToken(userId: string): string {
    return `jwt_${userId}_${Date.now()}`; // Use JWT in production
  }
}
