import { AuthGuard } from '@nestjs/passport';
import {
  Injectable,
  UnauthorizedException,
  ExecutionContext,
} from '@nestjs/common';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    return request;
  }

  handleRequest<TUser>(err: any, user: TUser): TUser {
    if (err || !user) {
      throw new UnauthorizedException('身份验证失败');
    }
    return user;
  }
}
