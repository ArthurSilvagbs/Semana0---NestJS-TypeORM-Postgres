import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    const users = await this.usersRepository.find();

    if (users.length === 0) {
      throw new HttpException('Users not found!', HttpStatus.NOT_FOUND);
    }

    return users;
  }

  async createUser(userDTO: UserDTO): Promise<UserDTO> {
    const createdUser = await this.usersRepository.save(userDTO);
    return createdUser;
  }
}
