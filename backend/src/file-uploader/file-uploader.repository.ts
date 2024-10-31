import { Injectable, NotFoundException } from '@nestjs/common';
import { BasePostgresRepository } from 'src/shared/database/base-postgres.repository';
import { PrismaClientService } from 'src/prisma-client/prisma-client.service';
import { File } from 'src/shared/types/file.interface';
import { FileUploaderEntity } from './file-uploader.entity';
import { FileUploaderFactory } from './file-uploader.factory';

@Injectable()
export class FileUploaderRepository extends BasePostgresRepository<
  FileUploaderEntity,
  File
> {
  constructor(
    entityFactory: FileUploaderFactory,
    readonly client: PrismaClientService,
  ) {
    super(entityFactory, client);
  }

  public async findById(id: string): Promise<FileUploaderEntity> {
    const document = await this.client.file.findFirst({
      where: {
        id,
      },
    });

    if (!document) {
      throw new NotFoundException(`File with id ${id} not found.`);
    }

    return this.createEntityFromDocument(document);
  }

  public async save(entity: FileUploaderEntity) {
    const pojoEntity = entity.toPOJO();
    const document = await this.client.file.create({
      data: pojoEntity,
    });
    return this.createEntityFromDocument(document);
  }
}
