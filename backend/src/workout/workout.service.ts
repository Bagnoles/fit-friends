import { Injectable, NotFoundException } from '@nestjs/common';
import { WorkoutRepository } from './workout.repository';
import { WorkoutEntity } from './workout.entity';
import { WorkoutQuery } from './workout.query';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';

@Injectable()
export class WorkoutService {
  constructor(private readonly workoutRepository: WorkoutRepository) {}

  public async getAllWorkouts(query?: WorkoutQuery, userId?: string) {
    return await this.workoutRepository.findAll(query, userId);
  }

  public async getWorkoutById(id: string): Promise<WorkoutEntity> {
    return await this.workoutRepository.findById(id);
  }

  public async saveWorkout(dto: CreateWorkoutDto) {
    const workout = new WorkoutEntity({ ...dto, coachId: dto.userId });
    const result = await this.workoutRepository.save(workout);
    return result;
  }

  public async updateWorkout(id: string, dto: UpdateWorkoutDto) {
    const workout = await this.workoutRepository.findById(id);
    if (!workout) {
      throw new NotFoundException(`Workout with ID ${id} not found`);
    }
    const updateWorkout = new WorkoutEntity({
      ...workout,
      ...dto,
      coachId: dto.userId,
      id,
    });
    const result = await this.workoutRepository.update(updateWorkout);
    return result;
  }
}
