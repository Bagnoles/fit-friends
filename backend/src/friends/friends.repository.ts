import { Injectable } from '@nestjs/common';
import { BasePostgresRepository } from 'src/shared/database/base-postgres.repository';
import { PrismaClientService } from 'src/prisma-client/prisma-client.service';
import { FriendsEntity } from './friends.entity';
import { FriendsFactory } from './friends.factory';

@Injectable()
export class FriendsRepository extends BasePostgresRepository<
  FriendsEntity,
  { firstId: string; secondId: string }
> {
  constructor(
    entityFactory: FriendsFactory,
    readonly client: PrismaClientService,
  ) {
    super(entityFactory, client);
  }

  public async findAllForUserId(userId: string) {
    const documents = await this.client.friends.findMany({
      where: {
        OR: [
          {
            firstId: userId,
          },
          {
            secondId: userId,
          },
        ],
      },
      include: {
        user2: {
          include: {
            interview: true,
            coachInterview: true,
          },
        },
        user1: {
          include: {
            interview: true,
            coachInterview: true,
          },
        },
      },
    });
    return documents;
  }

  public async saveRecord(entity: FriendsEntity) {
    const pojoEntity = entity.toPOJO();
    const document = await this.client.friends.create({
      data: {
        ...pojoEntity,
      },
    });
    return document;
  }

  public async deleteRecord(firstId: string, secondId: string) {
    await this.client.friends.delete({
      where: {
        firstId_secondId: { firstId, secondId },
      },
    });
  }
}
