import { Entity } from 'src/shared/database/entity';
import { StorableEntity } from 'src/shared/database/storable-entity.interface';
import { Interview } from 'src/shared/types/interview.interface';
import { Level } from 'src/shared/types/level.enum';
import { Time } from 'src/shared/types/time.enum';
import { WorkoutType } from 'src/shared/types/workout-type.enum';

export class InterviewEntity
  extends Entity
  implements StorableEntity<Interview>
{
  userId: string;
  level: Level;
  workoutTypes: WorkoutType[];
  workoutTime: Time;
  caloriesAmount: number;
  caloriesDay: number;
  isReady: boolean;

  constructor(interview?: Interview) {
    super();
    this.populate(interview);
  }

  public populate(interview?: Interview) {
    if (!interview) {
      return;
    }

    this.id = interview.id ?? undefined;
    this.userId = interview.userId;
    this.level = interview.level;
    this.workoutTypes = interview.workoutTypes;
    this.workoutTime = interview.workoutTime;
    this.caloriesAmount = interview.caloriesAmount;
    this.caloriesDay = interview.caloriesDay;
    this.isReady = interview.isReady;
  }

  public toPOJO(): Interview {
    return {
      id: this.id,
      userId: this.userId,
      level: this.level,
      workoutTypes: this.workoutTypes,
      workoutTime: this.workoutTime,
      caloriesAmount: this.caloriesAmount,
      caloriesDay: this.caloriesDay,
      isReady: this.isReady,
    };
  }
}
