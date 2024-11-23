import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCoachInterviewDto } from './dto/create-coach-interview.dto';
import { CoachInterviewRepository } from './coach-interview.repository';
import { CoachInterviewEntity } from './coach-interview.entity';
import { UpdateCoachInterviewDto } from './dto/update-coach-interview.dto';

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

  public async updateInterview(dto: UpdateCoachInterviewDto) {
    const interview = await this.interviewRepository.findByUserId(dto.userId);
    if (!interview) {
      throw new NotFoundException(
        `Опрос пользователя с ID ${dto.userId} не найден`,
      );
    }
    const updatedInterview = new CoachInterviewEntity({ ...interview, ...dto });
    await this.interviewRepository.update(updatedInterview);
    return updatedInterview;
  }

  public async addCertificate({
    userId,
    certificateId,
  }: {
    userId: string;
    certificateId: string;
  }) {
    const interview = await this.interviewRepository.findByUserId(userId);
    if (!interview) {
      throw new NotFoundException(
        `Опрос пользователя с ID ${userId} не найден`,
      );
    }
    const updatedInterview = new CoachInterviewEntity({
      ...interview,
      certificateId,
    });
    await this.interviewRepository.update(updatedInterview);
    return updatedInterview;
  }
}
