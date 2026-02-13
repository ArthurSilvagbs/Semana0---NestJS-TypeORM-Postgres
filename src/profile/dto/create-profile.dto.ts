import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class CreateProfileDto {
  @ApiProperty({
    description: 'The user id of the profile owner',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: 'The nickname of the profile',
    example: 'Arthur',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  nickname: string;

  @ApiProperty({
    description: 'The birthday of the profile',
    example: '1990-01-01',
  })
  @IsDateString()
  @IsNotEmpty()
  birthday: string;
}
