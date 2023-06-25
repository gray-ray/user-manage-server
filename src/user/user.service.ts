import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { RoleService } from 'src/role/role.service';
import { Role } from 'src/role/entities/role.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly roleService: RoleService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { userName } = createUserDto;
    const existUser = await this.userRepository.findOne({
      where: { userName },
    });
    if (existUser) {
      throw new HttpException('用户已存在', HttpStatus.BAD_REQUEST);
    }
    // let newParam = createUserDto;
    // if (roles?.length > 0) {
    //   const rolesArr = await this.roleService.findByIds(roles);
    //   console.log(rolesArr, createUserDto);
    // }
    // return true
    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  // 验证用户时使用
  findOne(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }
}
