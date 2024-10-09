import { Injectable } from '@nestjs/common';
import { EntityFactory } from 'src/shared/database/entity-factory.interface';
import { OrderEntity } from './order.entity';
import { Order } from 'src/shared/types/order.interface';

@Injectable()
export class OrderFactory implements EntityFactory<OrderEntity> {
  public create(entityPlainData: Order): OrderEntity {
    return new OrderEntity(entityPlainData);
  }
}
