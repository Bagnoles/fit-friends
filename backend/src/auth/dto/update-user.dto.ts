import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Gender } from 'src/shared/types/gender.enum';
import { Subway } from 'src/shared/types/subway.enum';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(15)
  name?: string;

  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @IsOptional()
  @IsDateString()
  birthday?: Date;

  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(140)
  description?: string;

  @IsOptional()
  @IsEnum(Subway)
  subway?: Subway;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
