import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Workout } from 'src/shared/types/workout.interface';

export class BalanceRdo {
  @ApiProperty({
    description: 'Workout Info',
    example: 'WorkoutRdo',
  })
  @Expose()
  public workout: Workout;

  @ApiProperty({
    description: 'Workouts count on balance',
    example: '5',
  })
  @Expose()
  public count: number;
}
