import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Req,
} from '@nestjs/common';
// https://docs.nestjs.cn/8/openapi?id=openapi
import { ApiResponse, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
// https://docs.nestjs.cn/8/security?id=jwt-%e5%8a%9f%e8%83%bd
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ description: '用户注册' })
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  @ApiResponse({ status: 200, type: [User] })
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @ApiOperation({ description: '用户信息' })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('getUser')
  // @ApiResponse({ status: 200, type: [User] })
  getUser(@Req() req) {
    return req.user;
  }
}
