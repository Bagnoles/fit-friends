import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BasePostgresRepository } from 'src/shared/database/base-postgres.repository';
import { WorkoutEntity } from './workout.entity';
import { Workout } from 'src/shared/types/workout.interface';
import { WorkoutFactory } from './workout.factory';
import { PrismaClientService } from 'src/prisma-client/prisma-client.service';
import { WorkoutQuery } from './workout.query';
import { PaginationResult } from 'src/shared/types/pagination.interface';

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
  private async getWorkoutCount(
    where: Prisma.WorkoutWhereInput,
  ): Promise<number> {
    return this.client.workout.count({ where });
  }

  private calculateWorkoutsPage(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
  }

  public async findAll(
    query?: WorkoutQuery,
  ): Promise<PaginationResult<WorkoutEntity>> {
    const skip =
      query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit;
    const where: Prisma.WorkoutWhereInput = {};
    const orderBy: Prisma.WorkoutOrderByWithRelationInput = {};

    if (query?.sortType) {
      orderBy[query.sortType] = query.sortDirection;
    }

    if (query?.type) {
      where.type = query.type;
    }

    const [records, workoutCount] = await Promise.all([
      this.client.workout.findMany({ where, orderBy, skip, take }),
      this.getWorkoutCount(where),
    ]);

    return {
      entities: records.map((record) =>
        this.createEntityFromDocument(record as Workout),
      ),
      currentPage: query?.page,
      totalPages: this.calculateWorkoutsPage(workoutCount, take),
      itemsPerPage: take,
      totalItems: workoutCount,
    };
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
