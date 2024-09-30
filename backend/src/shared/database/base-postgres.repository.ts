import { PrismaClientService } from 'src/prisma-client/prisma-client.service';
import { Entity } from './entity';
import { EntityFactory } from './entity-factory.interface';
import { StorableEntity } from './storable-entity.interface';

export abstract class BasePostgresRepository<
  T extends Entity & StorableEntity<ReturnType<T['toPOJO']>>,
  DocumentType = ReturnType<T['toPOJO']>,
> {
  constructor(
    protected entityFactory: EntityFactory<T>,
    protected readonly client: PrismaClientService,
  ) {}

  protected createEntityFromDocument(document: DocumentType | null): T | null {
    if (!document) {
      return null;
    }
    return this.entityFactory.create(document as ReturnType<T['toPOJO']>);
  }
}
