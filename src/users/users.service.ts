import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './user.entity';
import { UserDTO } from './dto/users.dto.ts/users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async findAllUsers(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  async createUser(userDTO: UserDTO): Promise<UserDTO> {
    const createdUser = await this.usersRepository.save(userDTO);
    return createdUser;
  }
}
