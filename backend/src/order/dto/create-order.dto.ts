import { PaymentType } from 'src/shared/types/payment-type.enum';
import { PurchaseType } from 'src/shared/types/purchase-type.enum';

export class CreateOrderDto {
  userId: string;
  serviceId: string;
  orderType: PurchaseType;
  count: number;
  price: number;
  payment: PaymentType;
}
