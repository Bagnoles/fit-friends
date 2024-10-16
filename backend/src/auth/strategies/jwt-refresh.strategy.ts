import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from 'src/shared/config/jwt.config';
import { AuthService } from '../auth.service';
import { RefreshTokenService } from 'src/refresh-token/refresh-token.service';
import { RefreshTokenPayload } from 'src/shared/types/token-payload.interface';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly authService: AuthService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtOptions.refreshTokenSecret,
    });
  }

  public async validate(payload: RefreshTokenPayload) {
    if (!(await this.refreshTokenService.isExists(payload.tokenId))) {
      throw new NotFoundException(`Token with ID ${payload.tokenId} not found`);
    }

    await this.refreshTokenService.deleteRefreshSession(payload.tokenId);
    await this.refreshTokenService.deleteExpiredRefreshTokens();
    return this.authService.getUserByEmail(payload.email);
  }
}
