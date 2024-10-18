import { Expose } from 'class-transformer';
import { Gender } from 'src/shared/types/gender.enum';
import { Level } from 'src/shared/types/level.enum';
import { Review } from 'src/shared/types/review.interface';
import { Time } from 'src/shared/types/time.enum';
import { WorkoutType } from 'src/shared/types/workout-type.enum';
import { ApiProperty } from '@nestjs/swagger';

export class WorkoutRdo {
  @ApiProperty({
    description: 'The uniq workout ID',
    example: '6d308040-hf6s-4162-bea6-2338e9sd2760',
  })
  @Expose()
  id: string;

  @ApiProperty({
    description: 'Workout title',
    example: 'Тренировка 1',
  })
  @Expose()
  name: string;

  @ApiProperty({
    description: 'URL for image',
    example: 'img/content/thumbnails/training-12.jpg',
  })
  @Expose()
  imageUrl: string;

  @ApiProperty({
    description: 'Workout Level',
    example: 'Beginner',
  })
  @Expose()
  level: Level;

  @ApiProperty({
    description: 'Workout type',
    example: 'Running',
  })
  @Expose()
  type: WorkoutType;

  @ApiProperty({
    description: 'Workout duration',
    example: 'Short',
  })
  @Expose()
  duration: Time;

  @ApiProperty({
    description: 'Workout price',
    example: '1200',
  })
  @Expose()
  price: number;

  @ApiProperty({
    description: 'Workout wasted calories',
    example: '700',
  })
  @Expose()
  calories: number;

  @ApiProperty({
    description: 'Workout description',
    example: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
  })
  @Expose()
  description: string;

  @ApiProperty({
    description: 'Workout gender',
    example: 'Male',
  })
  @Expose()
  gender: Gender;

  @ApiProperty({
    description: 'URL for workout video',
    example: 'img/content/training-video/video-thumbnail.png',
  })
  @Expose()
  videoUrl: string;

  @ApiProperty({
    description: 'Workout coach name',
    example: 'Nastya',
  })
  @Expose()
  coach: string;

  @ApiProperty({
    description: 'Is workout special price',
    example: 'true',
  })
  @Expose()
  isSpecial: boolean;

  @Expose()
  review: Review[];
}
