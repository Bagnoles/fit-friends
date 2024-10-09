import { Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { OrderEntity } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  public async getUserOrders(userId: string): Promise<OrderEntity[]> {
    return await this.orderRepository.findAllByUserId(userId);
  }

  public async addOrder(dto: CreateOrderDto) {
    const newOrder = new OrderEntity(dto);
    const result = await this.orderRepository.save(newOrder);
    return result;
  }
}
