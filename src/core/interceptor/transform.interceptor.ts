/**
 *  返回数据拦截器
 */

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const extra = {
      success: true,
      message: '操作成功!',
      code: HttpStatus.OK,
    };
    return next.handle().pipe(
      map((data) => {
        // 具体业务操作的message，可以通过接口包装返回
        return { data, ...extra };
      }),
    );
  }
}
