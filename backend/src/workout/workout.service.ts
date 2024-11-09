import { Injectable } from '@nestjs/common';
import { WorkoutRepository } from './workout.repository';
import { WorkoutEntity } from './workout.entity';
import { WorkoutQuery } from './workout.query';
import { CreateWorkoutDto } from './dto/create-workout.dto';

@Injectable()
export class WorkoutService {
  constructor(private readonly workoutRepository: WorkoutRepository) {}

  public async getAllWorkouts(query?: WorkoutQuery) {
    return await this.workoutRepository.findAll(query);
  }

  public async getWorkoutById(id: string): Promise<WorkoutEntity> {
    return await this.workoutRepository.findById(id);
  }

  public async saveWorkout(dto: CreateWorkoutDto) {
    const workout = new WorkoutEntity({ ...dto, coachId: dto.userId });
    const result = await this.workoutRepository.save(workout);
    return result;
  }
}
