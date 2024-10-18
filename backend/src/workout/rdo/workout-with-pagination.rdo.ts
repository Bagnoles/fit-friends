import { Expose } from 'class-transformer';
import { WorkoutRdo } from './workout.rdo';
import { ApiProperty } from '@nestjs/swagger';

export class WorkoutWithPaginationRdo {
  @ApiProperty({
    description: 'Workouts list',
    example: 'WorkoutRdo',
  })
  @Expose()
  public entities: WorkoutRdo[];

  @ApiProperty({
    description: 'Total pages',
    example: '5',
  })
  @Expose()
  public totalPages: number;

  @ApiProperty({
    description: 'total workouts count',
    example: '18',
  })
  @Expose()
  public totalItems: number;

  @ApiProperty({
    description: 'Current page',
    example: '1',
  })
  @Expose()
  public currentPage: number;

  @ApiProperty({
    description: 'Workouts count in one page',
    example: '6',
  })
  @Expose()
  public itemsPerPage: number;
}
