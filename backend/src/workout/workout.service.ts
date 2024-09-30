import { Injectable } from '@nestjs/common';
import { WorkoutRepository } from './workout.repository';
import { WorkoutEntity } from './workout.entity';

@Injectable()
export class WorkoutService {
  constructor(private readonly workoutRepository: WorkoutRepository) {}

  public async getAllWorkouts(): Promise<WorkoutEntity[]> {
    return await this.workoutRepository.findAll();
  }

  public async getWorkoutById(id: string): Promise<WorkoutEntity> {
    return await this.workoutRepository.findById(id);
  }
}
