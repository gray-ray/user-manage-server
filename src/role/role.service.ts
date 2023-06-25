import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(user, createRoleDto: CreateRoleDto) {
    const { roleName } = createRoleDto;
    const exitRole = await this.roleRepository.findOne({ where: { roleName } });
    if (exitRole) {
      throw new HttpException('角色已存在', HttpStatus.BAD_REQUEST);
    }

    const roleParam = {
      ...createRoleDto,
      user,
    };
    // console.log(user, roleParam);
    const newRole: Role = this.roleRepository.create(createRoleDto);
    const created = await this.roleRepository.save(newRole);
    return { ...created };
  }

  async findByIds(ids: string[]) {
    // .findBy({ id: In([1, 2, 3]) })
    return this.roleRepository.findBy({ id: In([...ids]) });
  }

  // findAll() {
  //   return `This action returns all role`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} role`;
  // }

  // update(id: number, updateRoleDto: UpdateRoleDto) {
  //   return `This action updates a #${id} role`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} role`;
  // }
}
