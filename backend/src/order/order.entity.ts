import { Entity } from 'src/shared/database/entity';
import { StorableEntity } from 'src/shared/database/storable-entity.interface';
import { Order } from 'src/shared/types/order.interface';
import { PaymentType } from 'src/shared/types/payment-type.enum';
import { PurchaseType } from 'src/shared/types/purchase-type.enum';

export class OrderEntity extends Entity implements StorableEntity<Order> {
  userId: string;
  serviceId: string;
  orderType: PurchaseType;
  count: number;
  price: number;
  payment: PaymentType;

  constructor(order?: Order) {
    super();
    this.populate(order);
  }

  public populate(order?: Order) {
    if (!order) {
      return;
    }

    this.id = order.id ?? undefined;
    this.userId = order.userId;
    this.serviceId = order.serviceId;
    this.orderType = order.orderType;
    this.count = order.count;
    this.price = order.price;
    this.payment = order.payment;
  }

  public toPOJO(): Order {
    return {
      id: this.id,
      userId: this.userId,
      serviceId: this.serviceId,
      orderType: this.orderType,
      count: this.count,
      price: this.price,
      payment: this.payment,
    };
  }
}
