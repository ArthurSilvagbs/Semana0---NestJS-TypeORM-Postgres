import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './user.entity';
import { UserDomain } from './user.domain';

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

  async findUserById(id: string): Promise<Users> {
    const userFound = await this.usersRepository.findOneBy({ id });

    if (userFound === null) {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }

    return userFound;
  }

  async createUser(user: UserDomain): Promise<UserDomain> {
    const createdUser = await this.usersRepository.save(user);
    return createdUser;
  }

  async deleteUserById(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
