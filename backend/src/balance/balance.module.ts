import { Module } from '@nestjs/common';
import { PrismaClientModule } from 'src/prisma-client/prisma-client.module';
import { BalanceRepository } from './balance.repository';
import { BalanceService } from './balance.service';
import { BalanceFactory } from './balance.factory';
import { BalanceController } from './balance.controller';

@Module({
  imports: [PrismaClientModule],
  providers: [BalanceRepository, BalanceService, BalanceFactory],
  controllers: [BalanceController],
  exports: [BalanceService],
})
export class BalanceModule {}
