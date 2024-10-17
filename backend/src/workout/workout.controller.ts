import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { fillDto } from 'src/shared/utils/common';
import { WorkoutRdo } from './rdo/workout.rdo';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('workouts')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  public async index() {
    const result = await this.workoutService.getAllWorkouts();
    return fillDto(
      WorkoutRdo,
      result.map((item) => item.toPOJO()),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  public async getInfo(@Param('id') id: string) {
    const result = await this.workoutService.getWorkoutById(id);
    return fillDto(WorkoutRdo, result.toPOJO());
  }
}
