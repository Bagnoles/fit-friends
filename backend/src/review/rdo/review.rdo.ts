import { Expose } from 'class-transformer';
import { UserRdo } from 'src/auth/rdo/user.rdo';

export class ReviewRdo {
  @Expose()
  public id: string;

  @Expose()
  public user: UserRdo;

  @Expose()
  public rating: number;

  @Expose()
  public text: string;
}
