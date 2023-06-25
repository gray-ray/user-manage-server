import { Injectable, BadRequestException, HttpException } from '@nestjs/common';

import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  login(user: Partial<User>) {
    const token = this.jwtService.sign({
      userId: user?.id,
      userName: user?.userName,
      role: user?.role,
    });
    return { token };
  }

  async getUser(user) {
    return await this.userService.findOne(user.id);
  }

  // TODO: 微信登录
}
