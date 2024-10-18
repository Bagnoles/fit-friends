import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    description: 'User name',
    example: 'Ivan',
  })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(15)
  name?: string;

  @ApiProperty({
    description: 'User avatar URL',
    example: 'img/content/user-photo-2.png',
  })
  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @ApiProperty({
    description: 'User gender',
    example: 'Male',
  })
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @ApiProperty({
    description: 'User birthday',
    example: '1981-02-03T00:00:00.000Z',
  })
  @IsOptional()
  @IsDateString()
  birthday?: Date;

  @ApiProperty({
    description: 'User description',
    example:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
  })
  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(140)
  description?: string;

  @ApiProperty({
    description: 'User metro address',
    example: 'Sportivnaya',
  })
  @IsOptional()
  @IsEnum(Subway)
  subway?: Subway;

  @ApiProperty({
    description: 'User image URL',
    example: 'img/content/user-photo-2.png',
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;
}
