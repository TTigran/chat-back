import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../user/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/users.entity';
import { AccessToken, Payload } from './types/auth.types';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async signIn(username: string, pass: string): Promise<AccessToken> {
    const user: User = await this.usersService.getUserByUsername(username);

    if (user && (await this.isMatch(pass, user.password))) {
      console.log('The user is signed in successfully');
    } else {
      throw new UnauthorizedException();
    }

    const payload: Payload = { username: user.username, sub: user.user_id };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async isMatch(realPassword: string, hashPassword: string) {
    return await bcrypt.compare(realPassword, hashPassword);
  }
}
