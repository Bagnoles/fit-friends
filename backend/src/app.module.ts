import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { WorkoutModule } from './workout/workout.module';

@Module({
  imports: [UserModule, WorkoutModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
