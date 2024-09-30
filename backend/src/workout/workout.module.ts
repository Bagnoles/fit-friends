import { Module } from '@nestjs/common';
import { PrismaClientModule } from 'src/prisma-client/prisma-client.module';
import { WorkoutRepository } from './workout.repository';
import { WorkoutService } from './workout.service';
import { WorkoutFactory } from './workout.factory';
import { WorkoutController } from './workout.controller';

@Module({
  imports: [PrismaClientModule],
  providers: [WorkoutRepository, WorkoutService, WorkoutFactory],
  controllers: [WorkoutController],
  exports: [WorkoutService],
})
export class WorkoutModule {}
