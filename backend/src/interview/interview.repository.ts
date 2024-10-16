import { Injectable, NotFoundException } from '@nestjs/common';
import { BasePostgresRepository } from 'src/shared/database/base-postgres.repository';
import { PrismaClientService } from 'src/prisma-client/prisma-client.service';
import { InterviewEntity } from './interview.entity';
import { Interview } from 'src/shared/types/interview.interface';
import { InterviewFactory } from './interview.factory';

@Injectable()
export class InterviewRepository extends BasePostgresRepository<
  InterviewEntity,
  Interview
> {
  constructor(
    entityFactory: InterviewFactory,
    readonly client: PrismaClientService,
  ) {
    super(entityFactory, client);
  }

  public async findByUserId(userId: string): Promise<InterviewEntity> {
    const document = await this.client.interview.findFirst({
      where: {
        userId,
      },
    });

    if (!document) {
      throw new NotFoundException(`Interview with userId ${userId} not found.`);
    }

    return this.createEntityFromDocument(document as Interview);
  }

  public async save(entity: InterviewEntity): Promise<InterviewEntity> {
    const document = await this.client.interview.create({
      data: { ...entity.toPOJO() },
    });
    //entity.id = document.id;
    return this.createEntityFromDocument(document as Interview);
  }
}
