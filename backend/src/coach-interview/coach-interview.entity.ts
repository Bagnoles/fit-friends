import { Entity } from 'src/shared/database/entity';
import { StorableEntity } from 'src/shared/database/storable-entity.interface';
import { CoachInterview } from 'src/shared/types/interview.interface';
import { Level } from 'src/shared/types/level.enum';
import { WorkoutType } from 'src/shared/types/workout-type.enum';

export class CoachInterviewEntity
  extends Entity
  implements StorableEntity<CoachInterview>
{
  userId: string;
  level: Level;
  workoutTypes: WorkoutType[];
  coachingMerit: string;
  certificateId: string;
  isPersonal: boolean;

  constructor(interview?: CoachInterview) {
    super();
    this.populate(interview);
  }

  public populate(interview?: CoachInterview) {
    if (!interview) {
      return;
    }

    this.id = interview.id ?? undefined;
    this.userId = interview.userId;
    this.level = interview.level;
    this.workoutTypes = interview.workoutTypes;
    this.coachingMerit = interview.coachingMerit;
    this.certificateId = interview.certificateId;
    this.isPersonal = interview.isPersonal;
  }

  public toPOJO(): CoachInterview {
    return {
      id: this.id,
      userId: this.userId,
      level: this.level,
      workoutTypes: this.workoutTypes,
      coachingMerit: this.coachingMerit,
      certificateId: this.certificateId,
      isPersonal: this.isPersonal,
    };
  }
}
