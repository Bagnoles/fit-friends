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

@Module({
  imports: [
    AuthModule,
    WorkoutModule,
    UserModule,
    BalanceModule,
    ReviewModule,
    OrderModule,
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [applicationConfig, jwtConfig],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
