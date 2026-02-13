import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEmail,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'The name of the user',
    example: 'Arthur',
  })
  @IsString({ message: 'Name should be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  @MinLength(3, { message: 'Name should be at least 3 characters long' })
  @MaxLength(100, { message: 'Name should not exceed 100 characters' })
  readonly name: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'arthur@example.com',
  })
  @IsString({ message: 'Email should be a string' })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  readonly email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password123',
  })
  @IsOptional()
  @IsString({ message: 'Password should be a string' })
  @MinLength(6, { message: 'Password should be at least 6 characters long' })
  @MaxLength(255, { message: 'Password should not exceed 255 characters' })
  readonly password?: string;
}
