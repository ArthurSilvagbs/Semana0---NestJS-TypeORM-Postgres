import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import * as express from 'express';
import { UserDTO } from './dto/users.dto.ts/users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAllUsers(@Res() response: express.Response) {
    return response.status(200).json(await this.usersService.findAllUsers());
  }

  @Post()
  async createUser(@Res() response: express.Response, @Body() dto: UserDTO) {
    const userCreated = await this.usersService.createUser(dto);
    return response.status(201).json(userCreated);
  }
}
