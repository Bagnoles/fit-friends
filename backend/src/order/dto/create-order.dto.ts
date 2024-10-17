import { IsEnum, IsInt, IsUUID, Min, Max } from 'class-validator';
import { PaymentType } from 'src/shared/types/payment-type.enum';
import { PurchaseType } from 'src/shared/types/purchase-type.enum';

export class CreateOrderDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  serviceId: string;

  @IsEnum(PurchaseType)
  orderType: PurchaseType;

  @IsInt()
  @Min(1)
  @Max(50)
  count: number;

  @IsInt()
  price: number;

  @IsEnum(PaymentType)
  payment: PaymentType;
}
