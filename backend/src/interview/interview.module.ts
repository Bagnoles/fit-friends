import { Module } from '@nestjs/common';
import { PrismaClientModule } from 'src/prisma-client/prisma-client.module';
import { InterviewRepository } from './interview.repository';
import { InterviewService } from './interview.service';
import { InterviewFactory } from './interview.factory';
import { InterviewController } from './interview.controller';

@Module({
  imports: [PrismaClientModule],
  providers: [InterviewRepository, InterviewService, InterviewFactory],
  controllers: [InterviewController],
  exports: [InterviewService],
})
export class InterviewModule {}
