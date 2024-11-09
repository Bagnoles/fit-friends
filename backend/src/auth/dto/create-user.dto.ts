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
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/shared/types/role.enum';

export class CreateUserDto {
  @ApiProperty({
    description: 'User name',
    example: 'Ivan',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(15)
  name: string;

  @ApiProperty({
    description: 'User email',
    example: 'ivanov@mail.ru',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User avatar URL',
    example: 'img/content/user-photo-2.png',
  })
  @IsString()
  avatarUrl: string;

  @ApiProperty({
    description: 'User password',
    example: 'qwerty',
  })
  @IsString()
  @MinLength(6)
  @MaxLength(12)
  password: string;

  @ApiProperty({
    description: 'User gender',
    example: 'Male',
  })
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({
    description: 'User birthday',
    example: '1981-02-03T00:00:00.000Z',
  })
  @IsOptional()
  birthday?: Date;

  @ApiProperty({
    description: 'User description',
    example:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
  })
  @IsString()
  @MinLength(10)
  @MaxLength(140)
  description: string;

  @ApiProperty({
    description: 'User metro address',
    example: 'Sportivnaya',
  })
  @IsEnum(Subway)
  subway: Subway;

  @ApiProperty({
    description: 'User role',
    example: 'Customer',
  })
  @IsEnum(Role)
  role: Role;

  @ApiProperty({
    description: 'User image URL',
    example: 'img/content/user-photo-2.png',
  })
  @IsString()
  imageUrl: string;

  avatarId: string;
}
