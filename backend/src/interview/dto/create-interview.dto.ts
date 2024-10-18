import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Level } from 'src/shared/types/level.enum';
import { Time } from 'src/shared/types/time.enum';
import { WorkoutType } from 'src/shared/types/workout-type.enum';

export class CreateInterviewDto {
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
  level: Level;

  @ApiProperty({
    description: 'User preferred workouts',
    example: '[Running, Boxing]',
  })
  @IsEnum(WorkoutType, { each: true })
  @IsArray()
  workoutTypes: WorkoutType[];

  @ApiProperty({
    description: 'Time for training',
    example: 'Short',
  })
  @IsEnum(Time)
  workoutTime: Time;

  @ApiProperty({
    description: 'Total calories to waste',
    example: '4500',
  })
  @IsInt()
  @Min(1000)
  @Max(5000)
  caloriesAmount: number;

  @ApiProperty({
    description: 'Calories to waste in a day',
    example: '1000',
  })
  @IsInt()
  @Min(1000)
  @Max(5000)
  caloriesDay: number;

  @ApiProperty({
    description: 'Is ready to training',
    example: 'true',
  })
  @IsBoolean()
  isReady: boolean;
}
