import { Injectable } from '@nestjs/common';
import { BasePostgresRepository } from 'src/shared/database/base-postgres.repository';
import { PrismaClientService } from 'src/prisma-client/prisma-client.service';
import { OrderEntity } from './order.entity';
import { Order } from 'src/shared/types/order.interface';
import { OrderFactory } from './order.factory';

@Injectable()
export class OrderRepository extends BasePostgresRepository<
  OrderEntity,
  Order
> {
  constructor(
    entityFactory: OrderFactory,
    readonly client: PrismaClientService,
  ) {
    super(entityFactory, client);
  }

  public async findAllByUserId(userId: string): Promise<OrderEntity[]> {
    const documents = await this.client.order.findMany({
      where: {
        userId,
      },
    });
    return documents.map((document) =>
      this.createEntityFromDocument(document as Order),
    );
  }

  public async save(entity: OrderEntity): Promise<OrderEntity> {
    const document = await this.client.order.create({
      data: { ...entity.toPOJO() },
    });
    return this.createEntityFromDocument(document as Order);
  }

  public async findAllByCoachId(userId: string) {
    const documents = await this.client.order.findMany({
      where: {
        workout: {
          coachId: userId,
        },
      },
      include: {
        workout: true,
      },
    });
    return documents;
  }
}
