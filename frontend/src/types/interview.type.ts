import { Level } from './level.enum';
import { Time } from './time.enum';
import { WorkoutType } from './workout-type.enum';
import { File } from './file.type';

export type Interview = {
  level: Level;
  workoutTypes: WorkoutType[];
  workoutTime: Time;
  caloriesAmount: number;
  caloriesDay: number;
  isReady: boolean;
}

export type CoachInterviewDto = {
  level: Level;
  workoutTypes: WorkoutType[];
  coachingMerit: string;
  isPersonal: boolean;
}

export type CoachInterview = {
  level: Level;
  workoutTypes: WorkoutType[];
  coachingMerit: string;
  isPersonal: boolean;
  certificate: File;
}
