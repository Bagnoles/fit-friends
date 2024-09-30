import { Controller, Get, Param } from '@nestjs/common';
import { WorkoutService } from './workout.service';

@Controller('workouts')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @Get('/')
  public async index() {
    const result = await this.workoutService.getAllWorkouts();
    return result;
  }

  @Get('/:id')
  public async getInfo(@Param('id') id: string) {
    const result = await this.workoutService.getWorkoutById(id);
    return result;
  }
}
