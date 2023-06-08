import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // swagger文档添加登录认证
  const options = new DocumentBuilder()
    .setTitle('接口文档')
    .setDescription('文档管理接口')
    // .setBasePath('/api')
    // .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  // app.setGlobalPrefix('api');

  await app.listen(3001);
}
bootstrap();
