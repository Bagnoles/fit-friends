import { Injectable, NotFoundException } from '@nestjs/common';
import { InterviewRepository } from './interview.repository';
import { InterviewEntity } from './interview.entity';
import { CreateInterviewDto } from './dto/create-interview.dto';
import { UpdateInterviewDto } from './dto/update-interview.dto';

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

  public async updateInterview(dto: UpdateInterviewDto) {
    const interview = await this.interviewRepository.findByUserId(dto.userId);
    if (!interview) {
      throw new NotFoundException(
        `Опрос пользователя с ID ${dto.userId} не найден`,
      );
    }
    const updatedInterview = new InterviewEntity({ ...interview, ...dto });
    await this.interviewRepository.update(updatedInterview);
    return updatedInterview;
  }
}
