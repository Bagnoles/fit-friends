import { Injectable, NotFoundException } from '@nestjs/common';
import { BasePostgresRepository } from 'src/shared/database/base-postgres.repository';
import { WorkoutEntity } from './workout.entity';
import { Workout } from 'src/shared/types/workout.interface';
import { WorkoutFactory } from './workout.factory';
import { PrismaClientService } from 'src/prisma-client/prisma-client.service';

@Injectable()
export class WorkoutRepository extends BasePostgresRepository<
  WorkoutEntity,
  Workout
> {
  constructor(
    entityFactory: WorkoutFactory,
    readonly client: PrismaClientService,
  ) {
    super(entityFactory, client);
  }

  public async findAll(): Promise<WorkoutEntity[]> {
    const documents = await this.client.workout.findMany();
    return documents.map((document) =>
      this.createEntityFromDocument(document as Workout),
    );
  }

  public async findById(id: string): Promise<WorkoutEntity> {
    const document = await this.client.workout.findFirst({
      where: {
        id,
      },
    });

    if (!document) {
      throw new NotFoundException(`Workout with id ${id} not found.`);
    }

    return this.createEntityFromDocument(document as Workout);
  }
}
