import { PaymentType } from './payment-type.enum';
import { PurchaseType } from './purchase-type.enum';

export type Order = {
  userId: string;
  serviceId: string;
  orderType: PurchaseType;
  count: number;
  price: number;
  payment: PaymentType;
}

export type CreateOrderDto = {
  serviceId: string;
  orderType: PurchaseType;
  count: number;
  price: number;
  payment: PaymentType;
}
