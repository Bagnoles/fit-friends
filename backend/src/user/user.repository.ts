import { Injectable, NotFoundException } from '@nestjs/common';
import { BasePostgresRepository } from 'src/shared/database/base-postgres.repository';
import { PrismaClientService } from 'src/prisma-client/prisma-client.service';
import { UserEntity } from './user.entity';
import { User } from 'src/shared/types/user.interface';
import { UserFactory } from './user.factory';

@Injectable()
export class UserRepository extends BasePostgresRepository<UserEntity, User> {
  constructor(
    entityFactory: UserFactory,
    readonly client: PrismaClientService,
  ) {
    super(entityFactory, client);
  }

  public async findById(id: string): Promise<UserEntity> {
    const document = await this.client.user.findFirst({
      where: {
        id,
      },
    });

    if (!document) {
      throw new NotFoundException(`User with id ${id} not found.`);
    }

    return this.createEntityFromDocument(document as User);
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    const document = await this.client.user.findUnique({
      where: {
        email,
      },
    });

    return this.createEntityFromDocument(document as User);
  }

  public async save(entity: UserEntity) {
    const pojoEntity = entity.toPOJO();
    const document = await this.client.user.create({
      data: pojoEntity,
    });
    return this.createEntityFromDocument(document as User);
  }

  public async update(entity: UserEntity) {
    const pojoEntity = entity.toPOJO();
    const document = await this.client.user.update({
      where: {
        id: entity.id,
      },
      data: pojoEntity,
    });
    return this.createEntityFromDocument(document as User);
  }

  public async findAll() {
    const documents = await this.client.user.findMany({
      include: {
        interview: true,
        coachInterview: true,
      },
    });
    return documents.map((item) =>
      Object.fromEntries(
        Object.entries(item).filter(
          ([key]) => key !== 'passwordHash' && key !== 'email',
        ),
      ),
    );
  }
}
