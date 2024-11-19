import { Injectable, NotFoundException } from '@nestjs/common';
import { BasePostgresRepository } from 'src/shared/database/base-postgres.repository';
import { PrismaClientService } from 'src/prisma-client/prisma-client.service';
import { CoachInterviewEntity } from './coach-interview.entity';
import { CoachInterview } from 'src/shared/types/interview.interface';
import { CoachInterviewFactory } from './coach-interview.factory';

@Injectable()
export class CoachInterviewRepository extends BasePostgresRepository<
  CoachInterviewEntity,
  CoachInterview
> {
  constructor(
    entityFactory: CoachInterviewFactory,
    readonly client: PrismaClientService,
  ) {
    super(entityFactory, client);
  }

  public async findByUserId(userId: string): Promise<CoachInterviewEntity> {
    const document = await this.client.coachInterview.findFirst({
      where: {
        userId,
      },
    });

    if (!document) {
      throw new NotFoundException(`Interview with userId ${userId} not found.`);
    }

    return this.createEntityFromDocument(document as CoachInterview);
  }

  public async save(
    entity: CoachInterviewEntity,
  ): Promise<CoachInterviewEntity> {
    const document = await this.client.coachInterview.create({
      data: { ...entity.toPOJO() },
    });
    return this.createEntityFromDocument(document as CoachInterview);
  }

  public async update(entity: CoachInterviewEntity) {
    const pojoEntity = entity.toPOJO();
    const document = await this.client.coachInterview.update({
      where: {
        userId: entity.userId,
      },
      data: pojoEntity,
    });
    return this.createEntityFromDocument(document as CoachInterview);
  }
}
