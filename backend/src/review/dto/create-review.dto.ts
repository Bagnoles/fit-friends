import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateReviewDto {
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
    description: 'Rating',
    example: '4',
  })
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({
    description: 'Review Text',
    example: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
  })
  @IsString()
  @MinLength(100)
  @MaxLength(1024)
  text: string;
}
