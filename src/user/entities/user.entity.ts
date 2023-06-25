import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import * as dayjs from 'dayjs';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../role/entities/role.entity';
import { Exclude } from 'class-transformer';

// 实体序列化 转换返回 可以隐藏字段
// https://docs.nestjs.cn/8/techniques?id=%e5%ba%8f%e5%88%97%e5%8c%96%ef%bc%88serialization%ef%bc%89

// 当前类型的文件在数据库中创建一个对应的表， autoLoadEntities: true 数据库配置属性将会自动载入实体
// 当前创建的是 user表

@Entity('user')
export class User {
  @ApiProperty({ description: '用户ID' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, name: 'user_name' })
  userName: string;

  @Column({ length: 100, name: 'nick_name', default: '' })
  nickName: string;

  @Exclude()
  @Column({ nullable: true, select: false }) // 指示列的值是否可以设置为 NULL。 指示列是否始终由 QueryBuilder 和查找操作选择。
  password: string;

  @Column({ default: null })
  avatar: string; //头像

  @Column({ default: null })
  email: string;

  @Column({ default: '' })
  role: string;

  @Column({
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;

  @Column({
    name: 'update_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateTime: Date;

  // 插入数据之前要对密码加密
  @BeforeInsert()
  async encryptPwd() {
    this.password = await bcrypt.hashSync(this.password, 10);
  }
}
