import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import * as dayjs from 'dayjs';
import { RefreshTokenRepository } from './refresh-token.repository';
import jwtConfig from 'src/shared/config/jwt.config';
import { RefreshTokenPayload } from 'src/shared/types/token-payload.interface';
import { parseTime } from 'src/shared/utils/common';
import { RefreshTokenEntity } from './refresh-token.entity';

@Injectable()
export class RefreshTokenService {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
    @Inject(jwtConfig.KEY)
    private readonly jwtOptions: ConfigType<typeof jwtConfig>,
  ) {}

  public async createRefreshSession(payload: RefreshTokenPayload) {
    const timeValue = parseTime(this.jwtOptions.refreshTokenExpiresIn);
    const refreshToken = new RefreshTokenEntity({
      tokenId: payload.tokenId,
      createdAt: new Date(),
      userId: payload.id,
      expiresIn: dayjs().add(timeValue.value, timeValue.unit).toDate(),
    });

    return this.refreshTokenRepository.saveRefreshSession(refreshToken);
  }

  public async deleteRefreshSession(tokenId: string): Promise<void> {
    await this.refreshTokenRepository.deleteByTokenId(tokenId);
  }

  public async isExists(tokenId: string): Promise<boolean> {
    const refreshToken =
      await this.refreshTokenRepository.findByTokenId(tokenId);
    return refreshToken !== null;
  }
}
