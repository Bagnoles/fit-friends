import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
  Patch,
  ForbiddenException,
} from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { fillDto } from 'src/shared/utils/common';
import { WorkoutRdo } from './rdo/workout.rdo';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { WorkoutQuery } from './workout.query';
import { WorkoutWithPaginationRdo } from './rdo/workout-with-pagination.rdo';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { InjectUserIdInterceptor } from 'src/shared/interceptors/inject-user-id.interceptor';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';

@ApiTags('workouts')
@Controller('workouts')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @ApiResponse({
    type: WorkoutWithPaginationRdo,
    status: HttpStatus.OK,
  })
  @UseGuards(JwtAuthGuard)
  @Get('/')
  public async index(@Query() query: WorkoutQuery) {
    const workoutsWithPagination =
      await this.workoutService.getAllWorkouts(query);
    return fillDto(WorkoutWithPaginationRdo, workoutsWithPagination);
  }

  @ApiResponse({
    type: WorkoutWithPaginationRdo,
    status: HttpStatus.OK,
  })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Get('/coach')
  public async getCoachWorkouts(
    @Query() query: WorkoutQuery,
    @Body() { userId }: { userId: string },
  ) {
    const workoutsWithPagination = await this.workoutService.getAllWorkouts(
      query,
      userId,
    );
    return fillDto(WorkoutWithPaginationRdo, workoutsWithPagination);
  }

  @ApiResponse({
    type: WorkoutRdo,
    status: HttpStatus.OK,
  })
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  public async getInfo(@Param('id') id: string) {
    const result = await this.workoutService.getWorkoutById(id);
    return fillDto(WorkoutRdo, result.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Save workout',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access denied',
  })
  @UseInterceptors(InjectUserIdInterceptor)
  @UseGuards(JwtAuthGuard)
  @Post('/')
  public async add(@Body() dto: CreateWorkoutDto) {
    const result = await this.workoutService.saveWorkout(dto);
    return fillDto(WorkoutRdo, result.toPOJO());
  }

  @ApiResponse({
    type: WorkoutRdo,
    status: HttpStatus.CREATED,
    description: 'Workout was updated',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Workout not found',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'You can only edit your workout',
  })
  @UseInterceptors(InjectUserIdInterceptor)
  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  public async update(@Param('id') id: string, @Body() dto: UpdateWorkoutDto) {
    const workout = await this.workoutService.getWorkoutById(id);
    if (workout.coachId !== dto.userId) {
      throw new ForbiddenException(`You can't edit this workout!`);
    }
    const updatedWorkout = await this.workoutService.updateWorkout(id, dto);
    return updatedWorkout;
  }
}
