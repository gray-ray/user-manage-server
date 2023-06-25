import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';

import { LocalStorage } from './local.strategy';
import { JwtStorage } from './jwt.strategy';

import { Role } from 'src/role/entities/role.entity';
import { RoleService } from 'src/role/role.service'

const jwtModule = JwtModule.registerAsync({
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    return {
      secret: configService.get('SECRET', 'nest-user'),
      signOptions: { expiresIn: '2d' },
    };
  },
});

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserService, LocalStorage, JwtStorage, RoleService],
  imports: [
    UserModule,
    jwtModule,
    TypeOrmModule.forFeature([User, Role]), // Role 用户添加角色使用
    PassportModule,
  ],
  exports: [JwtModule],
})
export class AuthModule {}
