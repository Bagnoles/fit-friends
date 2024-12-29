import { Module } from '@nestjs/common';
import { PrismaClientModule } from 'src/prisma-client/prisma-client.module';
import { FriendsRepository } from './friends.repository';
import { FriendsFactory } from './friends.factory';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';

@Module({
  imports: [PrismaClientModule],
  providers: [FriendsRepository, FriendsService, FriendsFactory],
  controllers: [FriendsController],
  exports: [FriendsRepository],
})
export class FriendsModule {}
