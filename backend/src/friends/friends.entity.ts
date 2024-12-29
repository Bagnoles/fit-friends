import { Entity } from 'src/shared/database/entity';
import { StorableEntity } from 'src/shared/database/storable-entity.interface';

export class FriendsEntity
  extends Entity
  implements StorableEntity<{ firstId: string; secondId: string }>
{
  firstId: string;
  secondId: string;

  constructor(record?: { firstId: string; secondId: string }) {
    super();
    this.populate(record);
  }

  public populate(review?: { firstId: string; secondId: string }) {
    if (!review) {
      return;
    }

    this.firstId = review.firstId;
    this.secondId = review.secondId;
  }

  public toPOJO() {
    return {
      firstId: this.firstId,
      secondId: this.secondId,
    };
  }
}
