import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LoggedUserRdo {
  @ApiProperty({
    description: 'The uniq token ID',
    example: '6d308040-hf6s-4162-bea6-2338e9sd2760',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'Access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR...',
  })
  @Expose()
  public accessToken: string;

  @ApiProperty({
    description: 'Refresh token',
    example: 'eyJhbGciOiJIUzI1NiIsInR...',
  })
  @Expose()
  public refreshToken: string;
}
