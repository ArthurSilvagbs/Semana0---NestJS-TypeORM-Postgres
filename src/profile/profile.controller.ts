import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  HttpCode,
  Query,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PaginationDto } from './dto/pagination.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('profiles')
@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @ApiOperation({ summary: 'Create a new profile' })
  @ApiCreatedResponse({
    description: 'The profile has been successfully created.',
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data.',
  })
  @Post()
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profileService.create(createProfileDto);
  }

  @ApiOperation({ summary: 'Get all profiles with pagination' })
  @ApiOkResponse({
    description: 'List of profiles retrieved successfully.',
  })
  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.profileService.getAllPaginated(paginationDto);
  }

  @ApiOperation({ summary: 'Get a profile by ID' })
  @ApiOkResponse({
    description: 'The profile retrieved successfully.',
  })
  @ApiNotFoundResponse({
    description: 'Profile not found.',
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const profile = await this.profileService.findOne(id);
    if (!profile) {
      throw new NotFoundException();
    }
    return profile;
  }

  @ApiOperation({ summary: 'Update a profile by ID' })
  @ApiOkResponse({
    description: 'The profile updated successfully.',
  })
  @ApiNotFoundResponse({
    description: 'Profile not found.',
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    const profile = await this.profileService.update(id, updateProfileDto);
    if (!profile) {
      throw new NotFoundException();
    }
    return profile;
  }

  @ApiOperation({ summary: 'Delete a profile by ID' })
  @ApiNoContentResponse({
    description: 'The profile has been successfully deleted.',
  })
  @ApiNotFoundResponse({
    description: 'Profile not found.',
  })
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    const profile = await this.profileService.remove(id);
    if (!profile) throw new NotFoundException();
  }
}
