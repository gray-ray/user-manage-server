import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { RoleService } from '../role/role.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from '../role/entities/role.entity';

@Module({
  controllers: [UserController],
  providers: [UserService, RoleService],
  imports: [
    TypeOrmModule.forFeature([User, Role]),
  ],
})
export class UserModule {}
