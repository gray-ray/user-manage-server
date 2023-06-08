import { IsNotEmpty, IsEmail, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // swagger 字段添加熟悉说明
import { Role } from '../../role/entities/role.entity';

export class CreateUserDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  @ApiProperty({ description: '用户名' })
  readonly userName: string;

  readonly nickName: string;

  @IsEmail(null, { message: '邮箱格式错误' })
  readonly email;

  @IsUrl(null, { message: 'url格式错误' })
  readonly avatar: string;

  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;

  // 属性为数组的时候必须手动指定数组类型
  // Role creator 出现循环依赖项
  @ApiProperty({ type: Role })
  readonly roles: Role[];
}
