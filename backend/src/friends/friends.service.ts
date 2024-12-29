import { Injectable } from '@nestjs/common';
import { FriendsRepository } from './friends.repository';
import { FriendsEntity } from './friends.entity';

@Injectable()
export class FriendsService {
  constructor(private readonly friendsRepository: FriendsRepository) {}

  public async getFriends(userId: string) {
    return await this.friendsRepository.findAllForUserId(userId);
  }

  public async saveFriend(userId: string, friendId: string) {
    const newRecord = new FriendsEntity({
      firstId: userId,
      secondId: friendId,
    });
    return await this.friendsRepository.saveRecord(newRecord);
  }

  public async deleteFriend(userId: string, friendId: string) {
    return await this.friendsRepository.deleteRecord(userId, friendId);
  }
}
