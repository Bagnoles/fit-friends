import { Injectable } from '@nestjs/common';
import { EntityFactory } from 'src/shared/database/entity-factory.interface';
import { ReviewEntity } from './review.entity';
import { Review } from 'src/shared/types/review.interface';

@Injectable()
export class ReviewFactory implements EntityFactory<ReviewEntity> {
  public create(entityPlainData: Review): ReviewEntity {
    return new ReviewEntity(entityPlainData);
  }
}
