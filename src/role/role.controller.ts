import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiOperation,
  ApiBearerAuth,
  ApiTags,
  ApiResponse,
} from '@nestjs/swagger';
import { Role } from './entities/role.entity';

@ApiTags('角色')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiOperation({ description: '新增角色' })
  @ApiBearerAuth()
  @Post('create')
  @ApiResponse({ status: 200, type: [Role] })
  create(@Body() createRoleDto: CreateRoleDto, @Req() req) {
    return this.roleService.create(req.user, createRoleDto);
  }

  // @Get()
  // findAll() {
  //   return this.roleService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.roleService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
  //   return this.roleService.update(+id, updateRoleDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.roleService.remove(+id);
  // }
}
