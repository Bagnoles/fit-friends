import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WorkoutModule } from './workout/workout.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import jwtConfig from './shared/config/jwt.config';
import applicationConfig from './shared/config/app.config';
import { BalanceModule } from './balance/balance.module';
import { ReviewModule } from './review/review.module';
import { OrderModule } from './order/order.module';
import { InterviewModule } from './interview/interview.module';
import fileConfig from './shared/config/file.config';
import { FileUploaderModule } from './file-uploader/file-uploader.module';
import { CoachInterviewModule } from './coach-interview/coach-interview.module';
import { FriendsModule } from './friends/friends.module';

@Module({
  imports: [
    AuthModule,
    WorkoutModule,
    UserModule,
    FriendsModule,
    BalanceModule,
    ReviewModule,
    OrderModule,
    InterviewModule,
    CoachInterviewModule,
    FileUploaderModule,
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [applicationConfig, jwtConfig, fileConfig],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
