import { Injectable } from '@nestjs/common';
import { EntityFactory } from 'src/shared/database/entity-factory.interface';
import { WorkoutEntity } from './workout.entity';
import { Workout } from 'src/shared/types/workout.interface';

@Injectable()
export class WorkoutFactory implements EntityFactory<WorkoutEntity> {
  public create(entityPlainData: Workout): WorkoutEntity {
    return new WorkoutEntity(entityPlainData);
  }
}
