import { Module } from '@nestjs/common';
import { PrismaClientModule } from 'src/prisma-client/prisma-client.module';
import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';
import { OrderFactory } from './order.factory';
import { OrderController } from './order.controller';

@Module({
  imports: [PrismaClientModule],
  providers: [OrderRepository, OrderService, OrderFactory],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}
