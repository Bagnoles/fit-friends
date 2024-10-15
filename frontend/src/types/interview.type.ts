import { Level } from './level.enum';
import { Time } from './time.enum';
import { WorkoutType } from './workout-type.enum';

export type Interview = {
  level: Level;
  workoutTypes: WorkoutType[];
  workoutTime: Time;
  caloriesAmount: number;
  caloriesDay: number;
  isReady: boolean;
}
