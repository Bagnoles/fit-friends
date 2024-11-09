import { Gender } from './gender.enum';
import { Level } from './level.enum';
import { Time } from './time.enum';
import { WorkoutType } from './workout-type.enum';


export type Workout = {
  id: string;
  name: string;
  imageUrl: string;
  level: Level;
  type: WorkoutType;
  duration: Time;
  price: number;
  calories: number;
  description: string;
  gender: Gender;
  videoUrl: string;
  coach: string;
  isSpecial: boolean;
  review: {rating: number}[];
}

export type CreateWorkoutDto = {
  name: string;
  imageUrl: string;
  level: Level;
  type: WorkoutType;
  duration: Time;
  price: number;
  calories: number;
  description: string;
  gender: Gender;
  videoUrl: string;
  coach: string;
  isSpecial: boolean;
}
