import { Column, PrimaryGeneratedColumn, Entity, OneToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';

@Entity('role')
export class Role {
  @ApiProperty({ description: '角色ID' })
  @PrimaryGeneratedColumn('uuid', {
    name: 'role_id',
  })
  roleId: string;

  @ApiProperty({ description: '角色名称' })
  @Column({ name: 'role_name' })
  roleName: string;

  @ApiProperty({ description: '角色Code' })
  @Column({ name: 'role_Code' })
  roleCode: string;

  @ApiProperty({ description: '角色状态' })
  @Column('enum', { name: 'role_status', enum: [true, false], default: true })
  roleStatus: boolean;

  @ApiProperty({ description: '备注' })
  @Column({ length: 500 })
  mark: string;

  @ApiProperty({ description: '创建者' })
  @OneToOne(() => User, (user) => user?.userName)
  creator: User;

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
}
