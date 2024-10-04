import { Module } from '@nestjs/common';
import { PrismaClientModule } from 'src/prisma-client/prisma-client.module';
import { UserRepository } from './user.repository';
import { UserFactory } from './user.factory';

@Module({
  imports: [PrismaClientModule],
  providers: [UserRepository, UserFactory],
  exports: [UserRepository],
})
export class UserModule {}
