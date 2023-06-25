import { Column, PrimaryGeneratedColumn, Entity, OneToOne, ManyToOne} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';

@Entity('role')
export class Role {
  @ApiProperty({ description: '角色ID' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: '角色名称' })
  @Column({ name: 'role_name' })
  roleName: string;

  @ApiProperty({ description: '角色Code' })
  @Column({ name: 'role_code' })
  roleCode: string;

  @ApiProperty({ description: '角色状态' })
  @Column('enum', { name: 'role_status', enum: [true, false], default: true })
  roleStatus: boolean;

  @ApiProperty({ description: '备注' })
  @Column({ length: 500 })
  mark: string;

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
