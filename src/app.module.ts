import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { RoleModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';
import envPath from '../env.path';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: envPath, // 环境变量文件
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'mysql',
          autoLoadEntities: true,
          synchronize: true, // 根据实体自动创建数据库表，修改字段类型时会清除原有数据
          host: configService.get('DB_HOST', '49.235.126.59'), // 主机，默认为localhost
          port: configService.get<number>('DB_PORT', 13306), // 端口号
          username: configService.get('DB_USER', 'root'), // 用户名
          password: configService.get('DB_PASSWORD', 'e35fr34#232%6y6'), // 密码
          database: configService.get('DB_DATABASE', 'nest_user'), //数据库名
          timezone: '+08:00', //服务器上配置的时区
        };
      },
    }),
    RoleModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
