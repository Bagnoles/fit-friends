import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { File } from 'src/shared/types/file.interface';

export class UserRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '6d308040-hf6s-4162-bea6-2338e9sd2760',
  })
  @Expose()
  id: string;

  @ApiProperty({
    description: 'User name',
    example: 'Ivan',
  })
  @Expose()
  name: string;

  @ApiProperty({
    description: 'User email',
    example: 'ivanov@mail.ru',
  })
  @Expose()
  email: string;

  @ApiProperty({
    description: 'User avatar URL',
    example: 'img/content/user-photo-2.png',
  })
  @Expose()
  avatarUrl: string;

  @ApiProperty({
    description: 'User gender',
    example: 'Male',
  })
  @Expose()
  gender: string;

  @ApiProperty({
    description: 'User birthday',
    example: '1981-02-03T00:00:00.000Z',
  })
  @Expose()
  birthday: string;

  @ApiProperty({
    description: 'User description',
    example:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
  })
  @Expose()
  description: string;

  @ApiProperty({
    description: 'User metro address',
    example: 'Sportivnaya',
  })
  @Expose()
  subway: string;

  @ApiProperty({
    description: 'User role',
    example: 'Customer',
  })
  @Expose()
  role: string;

  @ApiProperty({
    description: 'User image URL',
    example: 'img/content/user-photo-2.png',
  })
  @Expose()
  imageUrl: string;

  @Expose()
  avatar: File;
}
