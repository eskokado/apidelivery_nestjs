import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserPojo } from './user.pojo';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async createToken(user: UserPojo) {
    const accessToken = this.jwtService.sign(
      {
        id: user.username,
        role: user.role,
      },
      {
        expiresIn: '7 days',
        subject: user.username,
        issuer: 'login',
        audience: 'users',
      },
    );
    return { accessToken: accessToken };
  }

  async checkToken(token: string) {
    try {
      const result = this.jwtService.verify(token, {
        audience: 'users',
        issuer: 'login',
      });
      return result;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async login(username: string, password) {
    const user = await UserPojo.findByUserName(username);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!user || !isMatch) {
      return { error: 'Username unauthorized' };
    }
    return this.createToken(user);
  }

  async isValidToken(token: string) {
    try {
      await this.checkToken(token);
      return true;
    } catch (e) {
      return false;
    }
  }
}
