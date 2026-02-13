import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from './dto/pagination.dto';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create a new user' })
  @ApiCreatedResponse({
    description: 'The user has been successfully created.',
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data.',
  })
  @ApiConflictResponse({
    description: 'A user with the same email already exists.',
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Get all users with pagination' })
  @ApiOkResponse({
    description: 'List of users retrieved successfully.',
  })
  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.userService.getAllPaginated(paginationDto);
  }

  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiOkResponse({
    description: 'The user retrieved successfully.',
  })
  @ApiNotFoundResponse({
    description: 'User not found.',
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiOkResponse({
    description: 'The user updated successfully.',
  })
  @ApiNotFoundResponse({
    description: 'User not found.',
  })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.update(id, updateUserDto);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiNoContentResponse({
    description: 'The user has been successfully deleted.',
  })
  @ApiNotFoundResponse({
    description: 'User not found.',
  })
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    const user = await this.userService.remove(id);
    if (!user) throw new NotFoundException();
  }
}
