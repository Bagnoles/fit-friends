import { Injectable } from '@nestjs/common';
import { BasePostgresRepository } from 'src/shared/database/base-postgres.repository';
import { PrismaClientService } from 'src/prisma-client/prisma-client.service';
import { ReviewEntity } from './review.entity';
import { Review } from 'src/shared/types/review.interface';
import { ReviewFactory } from './review.factory';

@Injectable()
export class ReviewRepository extends BasePostgresRepository<
  ReviewEntity,
  Review
> {
  constructor(
    entityFactory: ReviewFactory,
    readonly client: PrismaClientService,
  ) {
    super(entityFactory, client);
  }

  public async findAllByWorkoutId(workoutId: string) {
    const documents = await this.client.review.findMany({
      where: {
        workoutId,
      },
      include: {
        user: true,
      },
    });
    return documents;
  }

  public async save(entity: ReviewEntity): Promise<ReviewEntity> {
    const pojoEntity = entity.toPOJO();
    const document = await this.client.review.create({
      data: {
        ...pojoEntity,
      },
    });
    //entity.id = document.id;
    return this.createEntityFromDocument(document);
  }
}
