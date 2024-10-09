import { Injectable } from '@nestjs/common';
import { EntityFactory } from 'src/shared/database/entity-factory.interface';
import { InterviewEntity } from './interview.entity';
import { Interview } from 'src/shared/types/interview.interface';

@Injectable()
export class InterviewFactory implements EntityFactory<InterviewEntity> {
  public create(entityPlainData: Interview): InterviewEntity {
    return new InterviewEntity(entityPlainData);
  }
}
