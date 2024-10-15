import { Expose } from 'class-transformer';
import { Gender } from 'src/shared/types/gender.enum';
import { Level } from 'src/shared/types/level.enum';
import { Time } from 'src/shared/types/time.enum';
import { WorkoutType } from 'src/shared/types/workout-type.enum';

export class WorkoutRdo {
  @Expose()
  public id: string;

  @Expose()
  name: string;

  @Expose()
  imageUrl: string;

  @Expose()
  level: Level;

  @Expose()
  type: WorkoutType;

  @Expose()
  duration: Time;

  @Expose()
  price: number;

  @Expose()
  calories: number;

  @Expose()
  description: string;

  @Expose()
  gender: Gender;

  @Expose()
  videoUrl: string;

  @Expose()
  coach: string;

  @Expose()
  isSpecial: boolean;
}
