import { Expose } from 'class-transformer';
import { Workout } from 'src/shared/types/workout.interface';

export class BalanceRdo {
  @Expose()
  public workout: Workout;

  @Expose()
  public count: number;
}
