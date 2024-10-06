import { Module } from '@nestjs/common';
import { PrismaClientModule } from 'src/prisma-client/prisma-client.module';
import { ReviewRepository } from './review.repository';
import { ReviewService } from './review.service';
import { ReviewFactory } from './review.factory';
import { ReviewController } from './review.controller';

@Module({
  imports: [PrismaClientModule],
  providers: [ReviewRepository, ReviewService, ReviewFactory],
  controllers: [ReviewController],
  exports: [ReviewService],
})
export class ReviewModule {}
