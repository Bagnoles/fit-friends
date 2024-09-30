import { Entity } from 'src/shared/database/entity';
import { StorableEntity } from 'src/shared/database/storable-entity.interface';
import { Gender } from 'src/shared/types/gender.enum';
import { Level } from 'src/shared/types/level.enum';
import { Time } from 'src/shared/types/time.enum';
import { WorkoutType } from 'src/shared/types/workout-type.enum';
import { Workout } from 'src/shared/types/workout.interface';

export class WorkoutEntity extends Entity implements StorableEntity<Workout> {
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

  constructor(workout?: Workout) {
    super();
    this.populate(workout);
  }

  public populate(workout?: Workout) {
    if (!workout) {
      return;
    }

    this.id = workout.id ?? undefined;
    this.name = workout.name;
    this.imageUrl = workout.imageUrl;
    this.level = workout.level;
    this.type = workout.type;
    this.duration = workout.duration;
    this.price = workout.price;
    this.calories = workout.calories;
    this.description = workout.description;
    this.gender = workout.gender;
    this.videoUrl = workout.videoUrl;
    this.coach = workout.coach;
    this.isSpecial = workout.isSpecial;
  }

  public toPOJO(): Workout {
    return {
      id: this.id,
      name: this.name,
      imageUrl: this.imageUrl,
      level: this.level,
      type: this.type,
      duration: this.duration,
      price: this.price,
      calories: this.calories,
      description: this.description,
      gender: this.gender,
      videoUrl: this.videoUrl,
      coach: this.coach,
      isSpecial: this.isSpecial,
    };
  }
}
