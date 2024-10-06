import { Injectable } from '@nestjs/common';
import { BasePostgresRepository } from 'src/shared/database/base-postgres.repository';
import { PrismaClientService } from 'src/prisma-client/prisma-client.service';
import { BalanceEntity } from './balance.entity';
import { Balance } from 'src/shared/types/balance.interface';
import { BalanceFactory } from './balance.factory';

@Injectable()
export class BalanceRepository extends BasePostgresRepository<
  BalanceEntity,
  Balance
> {
  constructor(
    entityFactory: BalanceFactory,
    readonly client: PrismaClientService,
  ) {
    super(entityFactory, client);
  }

  public async findAllByUserId(userId: string): Promise<BalanceEntity[]> {
    const documents = await this.client.balance.findMany({
      where: {
        userId,
      },
    });
    return documents.map((document) => this.createEntityFromDocument(document));
  }

  public async addToBalance(userId: string, workoutId: string) {
    await this.client.balance.upsert({
      where: {
        userId_workoutId: { userId, workoutId },
      },
      update: {
        count: {
          increment: 1,
        },
      },
      create: {
        userId,
        workoutId,
        count: 1,
      },
    });
  }

  public async deleteFromBalance(userId: string, workoutId: string) {
    await this.client.balance.update({
      where: {
        userId_workoutId: { userId, workoutId },
      },
      data: {
        count: {
          decrement: 1,
        },
      },
    });
  }
}
