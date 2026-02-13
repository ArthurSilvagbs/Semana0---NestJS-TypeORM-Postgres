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
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profileService.create(createProfileDto);
  }

  @Get()
  findAll() {
    return this.profileService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const profile = await this.profileService.findOne(id);
    if (!profile) {
      throw new NotFoundException();
    }
    return profile;
  }

  @Patch(':id')
  // eslint-disable-next-line prettier/prettier
  async update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto,) {
    const profile = await this.profileService.update(id, updateProfileDto);
    if (!profile) {
      throw new NotFoundException();
    }
    return profile;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    const profile = await this.profileService.remove(id);
    if (!profile) throw new NotFoundException();
  }
}
