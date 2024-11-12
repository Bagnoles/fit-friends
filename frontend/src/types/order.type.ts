import { PaymentType } from './payment-type.enum';
import { PurchaseType } from './purchase-type.enum';
import { Workout } from './workout.type';

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

export type CoachOrder = {
  id: string;
  userId: string;
  serviceId: string;
  orderType: PurchaseType;
  count: number;
  price: number;
  payment: PaymentType;
  workout: Workout;
}
