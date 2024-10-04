import { Expose } from 'class-transformer';

export class UserRdo {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  avatarUrl: string;

  @Expose()
  gender: string;

  @Expose()
  birthday: string;

  @Expose()
  description: string;

  @Expose()
  subway: string;

  @Expose()
  imageUrl: string;
}
