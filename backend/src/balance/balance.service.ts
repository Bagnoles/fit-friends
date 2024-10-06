import { Injectable } from '@nestjs/common';
import { BalanceRepository } from './balance.repository';
import { BalanceEntity } from './balance.entity';

@Injectable()
export class BalanceService {
  constructor(private readonly balanceRepository: BalanceRepository) {}

  public async getBalance(userId: string): Promise<BalanceEntity[]> {
    return await this.balanceRepository.findAllByUserId(userId);
  }

  public async addToBalance(userId: string, workoutId: string) {
    return await this.balanceRepository.addToBalance(userId, workoutId);
  }

  public async deleteFromBalance(userId: string, workoutId: string) {
    return await this.balanceRepository.deleteFromBalance(userId, workoutId);
  }
}
