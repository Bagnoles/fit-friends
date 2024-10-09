import { PaymentType } from './payment-type.enum';
import { PurchaseType } from './purchase-type.enum';

export interface Order {
  id?: string;
  userId: string;
  serviceId: string;
  orderType: PurchaseType;
  count: number;
  price: number;
  payment: PaymentType;
}
