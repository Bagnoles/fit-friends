import { Injectable } from '@nestjs/common';
import { CreateCoachInterviewDto } from './dto/create-coach-interview.dto';
import { CoachInterviewRepository } from './coach-interview.repository';
import { CoachInterviewEntity } from './coach-interview.entity';

@Injectable()
export class CoachInterviewService {
  constructor(private readonly interviewRepository: CoachInterviewRepository) {}

  public async getInterview(id: string): Promise<CoachInterviewEntity> {
    return await this.interviewRepository.findByUserId(id);
  }

  public async saveInterview(dto: CreateCoachInterviewDto) {
    const interview = new CoachInterviewEntity(dto);
    const result = await this.interviewRepository.save(interview);
    return result;
  }
}
