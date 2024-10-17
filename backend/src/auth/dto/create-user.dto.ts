import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Gender } from 'src/shared/types/gender.enum';
import { Subway } from 'src/shared/types/subway.enum';

export class CreateUserDto {
  @IsString()
  @MinLength(1)
  @MaxLength(15)
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  avatarUrl: string;

  @IsString()
  @MinLength(6)
  @MaxLength(12)
  password: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsOptional()
  birthday?: Date;

  @IsString()
  @MinLength(10)
  @MaxLength(140)
  description: string;

  @IsEnum(Subway)
  subway: Subway;

  @IsString()
  imageUrl: string;
}
