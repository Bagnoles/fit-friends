import { Module } from '@nestjs/common';
import { PrismaClientModule } from 'src/prisma-client/prisma-client.module';
import { RefreshTokenService } from './refresh-token.service';
import { RefreshTokenRepository } from './refresh-token.repository';
import { RefreshTokenFactory } from './refresh-token.factory';

@Module({
  imports: [PrismaClientModule],
  providers: [RefreshTokenService, RefreshTokenRepository, RefreshTokenFactory],
  exports: [RefreshTokenService],
})
export class RefreshTokenModule {}
