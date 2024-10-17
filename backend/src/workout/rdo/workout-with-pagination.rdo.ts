import { Expose } from 'class-transformer';
import { WorkoutRdo } from './workout.rdo';

export class WorkoutWithPaginationRdo {
  @Expose()
  public entities: WorkoutRdo[];

  @Expose()
  public totalPages: number;

  @Expose()
  public totalItems: number;

  @Expose()
  public currentPage: number;

  @Expose()
  public itemsPerPage: number;
}
