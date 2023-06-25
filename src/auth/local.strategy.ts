// 本地用户验证策略
import { Repository } from 'typeorm';
import { compareSync } from 'bcrypt';
import { HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { PassportStrategy } from '@nestjs/passport';
import { IStrategyOptions, Strategy } from 'passport-local';
import { User } from '../user/entities/user.entity';

export class LocalStorage extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super({
      usernameField: 'userName',
      passwordField: 'password',
    } as IStrategyOptions);
  }

  async validate(userName, password) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.userName=:userName', { userName })
      .getOne();
    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    }
    if (!compareSync(password, user.password)) {
      throw new HttpException('密码错误', HttpStatus.BAD_REQUEST);
    }
    return user;
  }
}
