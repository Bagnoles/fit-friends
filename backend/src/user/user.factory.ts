import { Injectable } from '@nestjs/common';
import { EntityFactory } from 'src/shared/database/entity-factory.interface';
import { UserEntity } from './user.entity';
import { User } from 'src/shared/types/user.interface';

@Injectable()
export class UserFactory implements EntityFactory<UserEntity> {
  public create(entityPlainData: User): UserEntity {
    return new UserEntity(entityPlainData);
  }
}
