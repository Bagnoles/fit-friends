import { Module } from '@nestjs/common';
import { PrismaClientModule } from 'src/prisma-client/prisma-client.module';
import { CoachInterviewRepository } from './coach-interview.repository';
import { CoachInterviewService } from './coach-interview.service';
import { CoachInterviewFactory } from './coach-interview.factory';
import { CoachInterviewController } from './coach-interview.controller';
import { FileUploaderModule } from 'src/file-uploader/file-uploader.module';

@Module({
  imports: [PrismaClientModule, FileUploaderModule],
  providers: [
    CoachInterviewRepository,
    CoachInterviewService,
    CoachInterviewFactory,
  ],
  controllers: [CoachInterviewController],
  exports: [CoachInterviewService],
})
export class CoachInterviewModule {}
