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
  @IsString()
  userId: string;

  @IsEnum(Level)
  level: Level;

  @IsEnum(WorkoutType, { each: true })
  @IsArray()
  workoutTypes: WorkoutType[];

  @IsEnum(Time)
  workoutTime: Time;

  @IsInt()
  @Min(1000)
  @Max(5000)
  caloriesAmount: number;

  @IsInt()
  @Min(1000)
  @Max(5000)
  caloriesDay: number;

  @IsBoolean()
  isReady: boolean;
}
