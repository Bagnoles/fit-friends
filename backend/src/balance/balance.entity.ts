import { Entity } from 'src/shared/database/entity';
import { StorableEntity } from 'src/shared/database/storable-entity.interface';
import { Balance } from 'src/shared/types/balance.interface';

export class BalanceEntity extends Entity implements StorableEntity<Balance> {
  userId: string;
  workoutId: string;
  count: number;

  constructor(balance?: Balance) {
    super();
    this.populate(balance);
  }

  public populate(balance?: Balance) {
    if (!balance) {
      return;
    }

    this.id = balance.id ?? undefined;
    this.userId = balance.userId;
    this.workoutId = balance.workoutId;
    this.count = balance.count;
  }

  public toPOJO(): Balance {
    return {
      id: this.id,
      userId: this.userId,
      workoutId: this.workoutId,
      count: this.count,
    };
  }
}
