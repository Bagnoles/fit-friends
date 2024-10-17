import { IsInt, IsUUID } from 'class-validator';

export class BalanceDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  workoutId: string;

  @IsInt()
  count: number;
}
