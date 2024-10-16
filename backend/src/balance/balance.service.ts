import { Injectable } from '@nestjs/common';
import { BalanceRepository } from './balance.repository';

@Injectable()
export class BalanceService {
  constructor(private readonly balanceRepository: BalanceRepository) {}

  public async getBalance(userId: string) {
    return await this.balanceRepository.findAllByUserId(userId);
  }

  public async addToBalance(userId: string, workoutId: string, count: number) {
    return await this.balanceRepository.addToBalance(userId, workoutId, count);
  }

  public async deleteFromBalance(userId: string, workoutId: string) {
    return await this.balanceRepository.deleteFromBalance(userId, workoutId);
  }
}
