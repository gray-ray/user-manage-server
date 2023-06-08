
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ description: '角色名称' })
  @IsNotEmpty({ message: '角色名称不能为空' })
  readonly roleName: string;

  @ApiProperty({ description: '角色码' })
  @IsNotEmpty({ message: '角色码不能为空' })
  readonly roleCode: string;

  @ApiProperty({ description: '角色状态' })
  readonly roleStatus: boolean;

  @ApiProperty({ description: '备注' })
  readonly mark: string;

}
