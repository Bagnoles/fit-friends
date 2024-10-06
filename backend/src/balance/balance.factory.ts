import { Injectable } from '@nestjs/common';
import { EntityFactory } from 'src/shared/database/entity-factory.interface';
import { BalanceEntity } from './balance.entity';
import { Balance } from 'src/shared/types/balance.interface';

@Injectable()
export class BalanceFactory implements EntityFactory<BalanceEntity> {
  public create(entityPlainData: Balance): BalanceEntity {
    return new BalanceEntity(entityPlainData);
  }
}
