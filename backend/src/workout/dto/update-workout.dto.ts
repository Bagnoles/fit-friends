import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  IsOptional,
} from 'class-validator';
import { Gender } from 'src/shared/types/gender.enum';
import { Level } from 'src/shared/types/level.enum';
import { Time } from 'src/shared/types/time.enum';
import { WorkoutType } from 'src/shared/types/workout-type.enum';

export class UpdateWorkoutDto {
  @ApiProperty({
    description: 'The uniq coach ID',
    example: '6d308040-hf6s-4162-bea6-2338e9sd2760',
  })
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'Workout level',
    example: 'Beginner',
  })
  @IsEnum(Level)
  @IsOptional()
  level?: Level;

  @ApiProperty({
    description: 'Workout type',
    example: 'Running',
  })
  @IsEnum(WorkoutType)
  @IsOptional()
  type?: WorkoutType;

  @ApiProperty({
    description: 'Workout duration',
    example: 'Short',
  })
  @IsEnum(Time)
  @IsOptional()
  duration?: Time;

  @ApiProperty({
    description: 'Workout calories',
    example: '4500',
  })
  @IsInt()
  @Min(1000)
  @Max(5000)
  @IsOptional()
  calories?: number;

  @ApiProperty({
    description: 'Is discount workout',
    example: 'false',
  })
  @IsBoolean()
  @IsOptional()
  isSpecial?: boolean;

  @ApiProperty({
    description: 'Workout title',
    example: 'Box for beginners',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(15)
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Image URL',
    example: 'img/content/thumbnails/preview-01.jpg',
  })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({
    description: 'Workout price',
    example: '800',
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  price?: number;

  @ApiProperty({
    description: 'Workout description',
    example: 'Box for beginners for two hours',
  })
  @IsString()
  @MinLength(10)
  @MaxLength(140)
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Workout gender',
    example: 'Male',
  })
  @IsEnum(Gender)
  @IsOptional()
  gender?: Gender;

  @ApiProperty({
    description: 'Video URL',
    example: 'img/content/thumbnails/preview-01.jpg',
  })
  @IsString()
  @IsOptional()
  videoUrl?: string;

  @ApiProperty({
    description: 'Coach name',
    example: 'Alex',
  })
  @IsString()
  @IsOptional()
  coach?: string;
}
