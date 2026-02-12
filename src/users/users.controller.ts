import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import * as express from 'express';
import { UserDomain } from './user.domain';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAllUsers(@Res() response: express.Response) {
    return response.status(200).json(await this.usersService.findAllUsers());
  }

  @Post()
  // eslint-disable-next-line prettier/prettier
  async createUser(@Res() response: express.Response, @Body() user: UserDomain) {
    const userCreated = await this.usersService.createUser(user);
    return response.status(201).json(userCreated);
  }

  @Delete(':id')
  deleteUser(@Res() response: express.Response, @Param('id') id: string) {
    if (this.usersService.findUserById(id) === null) {
      return response.status(404);
    }

    this.usersService.deleteUserById(id);
    return response.status(204);
  }
}
