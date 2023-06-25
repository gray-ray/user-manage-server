// 授权守卫 基于角色认证
/**
 * 每个守卫必须实现一个canActivate()函数。此函数应该返回一个布尔值，指示是否允许当前请求。它可以同步或异步地返回响应(通过 Promise 或 Observable)。
 * Nest使用返回值来控制下一个行为:
 * 如果返回 true, 将处理用户调用。
 * 如果返回 false, 则 Nest 将忽略当前处理的请求。
 */

/**
 * Nest提供了通过@SetMetadata()装饰器将自定义元数据附加在路径处理程序的能力。我们可以在类中获取这些元数据来执行特定决策。
 */
import {
  CanActivate,
  Injectable,
  ExecutionContext,
  SetMetadata,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/role/entities/role.entity';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    const hasRoles = roles.some(
      (item: Role) => item?.roleCode === user?.roleCode,
    );
    if (hasRoles) {
      throw new UnauthorizedException('暂无权限');
    }
    return hasRoles;
  }
}
