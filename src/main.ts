import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/filter/http-exception.filter';
import { TimeoutInterceptor } from './core/interceptor/timeout.interceptor';
import { TransformInterceptor } from './core/interceptor/transform.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  // swagger文档添加登录认证
  const options = new DocumentBuilder()
    .setTitle('接口文档')
    .setDescription('文档管理接口')
    // .setBasePath('/api')
    // .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  app
    .useGlobalFilters(new HttpExceptionFilter())
    .useGlobalInterceptors(new TimeoutInterceptor())
    .useGlobalInterceptors(new TransformInterceptor());
  await app.listen(3001);
}
bootstrap();
