import { Level } from 'src/shared/types/level.enum';
import { Time } from 'src/shared/types/time.enum';
import { WorkoutType } from 'src/shared/types/workout-type.enum';

export class CreateInterviewDto {
  userId: string;
  level: Level;
  workoutTypes: WorkoutType[];
  workoutTime: Time;
  caloriesAmount: number;
  caloriesDay: number;
  isReady: boolean;
}
