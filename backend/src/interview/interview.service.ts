import { Injectable } from '@nestjs/common';
import { InterviewRepository } from './interview.repository';
import { InterviewEntity } from './interview.entity';
import { CreateInterviewDto } from './dto/create-interview.dto';

@Injectable()
export class InterviewService {
  constructor(private readonly interviewRepository: InterviewRepository) {}

  public async getInterview(id: string): Promise<InterviewEntity> {
    return await this.interviewRepository.findByUserId(id);
  }

  public async saveInterview(dto: CreateInterviewDto) {
    const interview = new InterviewEntity(dto);
    const result = await this.interviewRepository.save(interview);
    return result;
  }
}
