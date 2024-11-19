import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsString,
  MaxLength,
  MinLength,
  IsOptional,
} from 'class-validator';
import { Level } from 'src/shared/types/level.enum';
import { WorkoutType } from 'src/shared/types/workout-type.enum';

export class UpdateCoachInterviewDto {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '6d308040-hf6s-4162-bea6-2338e9sd2760',
  })
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'User level',
    example: 'Beginner',
  })
  @IsEnum(Level)
  @IsOptional()
  level?: Level;

  @ApiProperty({
    description: 'User preferred workouts',
    example: '[Running, Boxing]',
  })
  @IsEnum(WorkoutType, { each: true })
  @IsArray()
  @IsOptional()
  workoutTypes?: WorkoutType[];

  @ApiProperty({
    description: 'Description of coaching merit',
    example: 'Description of coaching merit',
  })
  @IsString()
  @MinLength(10)
  @MaxLength(140)
  @IsOptional()
  coachingMerit?: string;

  certificateId: string;

  @ApiProperty({
    description: 'Is ready to personal training',
    example: 'true',
  })
  @IsBoolean()
  @IsOptional()
  isPersonal?: boolean;
}
