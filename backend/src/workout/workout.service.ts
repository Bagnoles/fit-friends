import { Injectable } from '@nestjs/common';
import { WorkoutRepository } from './workout.repository';
import { WorkoutEntity } from './workout.entity';
import { WorkoutQuery } from './workout.query';
import { PaginationResult } from 'src/shared/types/pagination.interface';

@Injectable()
export class WorkoutService {
  constructor(private readonly workoutRepository: WorkoutRepository) {}

  public async getAllWorkouts(
    query?: WorkoutQuery,
  ): Promise<PaginationResult<WorkoutEntity>> {
    return await this.workoutRepository.findAll(query);
  }

  public async getWorkoutById(id: string): Promise<WorkoutEntity> {
    return await this.workoutRepository.findById(id);
  }
}
