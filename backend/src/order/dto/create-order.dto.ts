import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, Min, Max, IsString } from 'class-validator';
import { PaymentType } from 'src/shared/types/payment-type.enum';
import { PurchaseType } from 'src/shared/types/purchase-type.enum';

export class CreateOrderDto {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '6d308040-hf6s-4162-bea6-2338e9sd2760',
  })
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'The uniq service ID',
    example: '6d308040-hf6s-4162-bea6-2338e9sd2760',
  })
  @IsString()
  serviceId: string;

  @ApiProperty({
    description: 'The order type',
    example: 'Subscription',
  })
  @IsEnum(PurchaseType)
  orderType: PurchaseType;

  @ApiProperty({
    description: 'Count to buy',
    example: '3',
  })
  @IsInt()
  @Min(1)
  @Max(50)
  count: number;

  @ApiProperty({
    description: 'Price for one item',
    example: '800',
  })
  @IsInt()
  price: number;

  @ApiProperty({
    description: 'Payment type',
    example: 'Mir',
  })
  @IsEnum(PaymentType)
  payment: PaymentType;
}
