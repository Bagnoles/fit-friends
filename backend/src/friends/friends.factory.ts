import { Injectable } from '@nestjs/common';
import { EntityFactory } from 'src/shared/database/entity-factory.interface';
import { FriendsEntity } from './friends.entity';

@Injectable()
export class FriendsFactory implements EntityFactory<FriendsEntity> {
  public create(entityPlainData: {
    firstId: string;
    secondId: string;
  }): FriendsEntity {
    return new FriendsEntity(entityPlainData);
  }
}
