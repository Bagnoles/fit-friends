import { Injectable } from '@nestjs/common';
import { EntityFactory } from 'src/shared/database/entity-factory.interface';
import { CoachInterviewEntity } from './coach-interview.entity';
import { CoachInterview } from 'src/shared/types/interview.interface';

@Injectable()
export class CoachInterviewFactory
  implements EntityFactory<CoachInterviewEntity>
{
  public create(entityPlainData: CoachInterview): CoachInterviewEntity {
    return new CoachInterviewEntity(entityPlainData);
  }
}
