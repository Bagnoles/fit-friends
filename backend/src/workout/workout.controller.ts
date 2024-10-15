import { Controller, Get, Param } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { fillDto } from 'src/shared/utils/common';
import { WorkoutRdo } from './rdo/workout.rdo';

@Controller('workouts')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @Get('/')
  public async index() {
    const result = await this.workoutService.getAllWorkouts();
    return fillDto(
      WorkoutRdo,
      result.map((item) => item.toPOJO()),
    );
  }

  @Get('/:id')
  public async getInfo(@Param('id') id: string) {
    const result = await this.workoutService.getWorkoutById(id);
    return fillDto(WorkoutRdo, result.toPOJO());
  }
}
