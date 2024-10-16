import { Injectable, NotFoundException } from '@nestjs/common';
import { BasePostgresRepository } from 'src/shared/database/base-postgres.repository';
import { RefreshTokenEntity } from './refresh-token.entity';
import { JwtToken } from 'src/shared/types/jwt-token.interface';
import { RefreshTokenFactory } from './refresh-token.factory';
import { PrismaClientService } from 'src/prisma-client/prisma-client.service';

@Injectable()
export class RefreshTokenRepository extends BasePostgresRepository<
  RefreshTokenEntity,
  JwtToken
> {
  constructor(
    entityFactory: RefreshTokenFactory,
    readonly client: PrismaClientService,
  ) {
    super(entityFactory, client);
  }

  public async findByTokenId(tokenId: string): Promise<RefreshTokenEntity> {
    const document = await this.client.refreshSession.findFirst({
      where: {
        tokenId,
      },
    });

    if (!document) {
      throw new NotFoundException(`Token with id ${tokenId} not found.`);
    }

    return this.createEntityFromDocument(document);
  }

  public async deleteByTokenId(tokenId: string) {
    return this.client.refreshSession.deleteMany({
      where: {
        tokenId,
      },
    });
  }

  public async deleteExpiredTokens(): Promise<void> {
    this.client.refreshSession.deleteMany({
      where: { expiresIn: { lt: new Date() } },
    });
  }

  public async saveRefreshSession(entity: RefreshTokenEntity) {
    const pojoEntity = entity.toPOJO();
    const document = await this.client.refreshSession.create({
      data: pojoEntity,
    });
    return this.createEntityFromDocument(document);
  }
}
