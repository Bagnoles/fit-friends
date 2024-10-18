import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class BalanceDto {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '6d308040-hf6s-4162-bea6-2338e9sd2760',
  })
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'The uniq workout ID',
    example: '6d308040-hf6s-4162-bea6-2338e9sd2760',
  })
  @IsString()
  workoutId: string;

  @ApiProperty({
    description: 'Workouts count',
    example: '5',
  })
  @IsInt()
  count: number;
}
