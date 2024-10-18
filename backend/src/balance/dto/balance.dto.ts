import { IsInt, IsString } from 'class-validator';

export class BalanceDto {
  @IsString()
  userId: string;

  @IsString()
  workoutId: string;

  @IsInt()
  count: number;
}
