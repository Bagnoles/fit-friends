import { Level } from './level.enum';
import { Time } from './time.enum';
import { WorkoutType } from './workout-type.enum';

export interface Interview {
  id?: string;
  userId: string;
  level: Level;
  workoutTypes: WorkoutType[];
  workoutTime: Time;
  caloriesAmount: number;
  caloriesDay: number;
  isReady: boolean;
}

export interface CoachInterview {
  id?: string;
  userId: string;
  level: Level;
  workoutTypes: WorkoutType[];
  coachingMerit: string;
  certificateId: string;
  isPersonal: boolean;
}
