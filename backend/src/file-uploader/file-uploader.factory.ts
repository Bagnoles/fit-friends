import { Injectable } from '@nestjs/common';
import { FileUploaderEntity } from './file-uploader.entity';
import { EntityFactory } from 'src/shared/database/entity-factory.interface';
import { File } from 'src/shared/types/file.interface';

@Injectable()
export class FileUploaderFactory implements EntityFactory<FileUploaderEntity> {
  public create(entityPlainData: File): FileUploaderEntity {
    return new FileUploaderEntity(entityPlainData);
  }
}
