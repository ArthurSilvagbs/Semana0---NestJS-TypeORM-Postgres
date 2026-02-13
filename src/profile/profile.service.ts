import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly repository: Repository<Profile>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(dto: CreateProfileDto): Promise<Profile> {
    const user = await this.userRepository.findOneBy({ id: dto.userId });
    if (!user) {
      throw new NotFoundException();
    }
    const profile = this.repository.create(dto);
    profile.owners = [user];
    return await this.repository.save(profile);
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: string) {
    return await this.repository.findOne({
      where: { id },
      relations: ['owners'],
    });
  }

  async update(id: string, dto: UpdateProfileDto) {
    const profile = await this.repository.findOneBy({ id });
    if (!profile) {
      return null;
    }
    this.repository.merge(profile, dto);
    return this.repository.save(profile);
  }

  async remove(id: string) {
    const profile = await this.repository.findOneBy({ id });
    if (!profile) {
      return null;
    }
    return this.repository.remove(profile);
  }
}
