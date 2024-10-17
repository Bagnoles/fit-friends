import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { fillDto } from 'src/shared/utils/common';
import { WorkoutRdo } from './rdo/workout.rdo';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { WorkoutQuery } from './workout.query';
import { WorkoutWithPaginationRdo } from './rdo/workout-with-pagination.rdo';

@Controller('workouts')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  public async index(@Query() query: WorkoutQuery) {
    const workoutsWithPagination =
      await this.workoutService.getAllWorkouts(query);
    const result = {
      ...workoutsWithPagination,
      entities: workoutsWithPagination.entities.map((item) => item.toPOJO()),
    };
    return fillDto(WorkoutWithPaginationRdo, result);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  public async getInfo(@Param('id') id: string) {
    const result = await this.workoutService.getWorkoutById(id);
    return fillDto(WorkoutRdo, result.toPOJO());
  }
}
