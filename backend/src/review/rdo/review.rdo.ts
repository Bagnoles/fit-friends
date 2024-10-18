import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { UserRdo } from 'src/auth/rdo/user.rdo';

export class ReviewRdo {
  @ApiProperty({
    description: 'The uniq review ID',
    example: '6d308040-hf6s-4162-bea6-2338e9sd2760',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'User info',
    example: 'UserRdo',
  })
  @Expose()
  public user: UserRdo;

  @ApiProperty({
    description: 'Rating',
    example: '4',
  })
  @Expose()
  public rating: number;

  @ApiProperty({
    description: 'Review Text',
    example: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
  })
  @Expose()
  public text: string;
}
