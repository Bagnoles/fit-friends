import { Transform } from 'class-transformer';
import { IsArray, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { SortDirection } from 'src/shared/types/sort-direction.enum';
import { SortType } from 'src/shared/types/sort-type.enum';
import { WorkoutType } from 'src/shared/types/workout-type.enum';

const DEFAULT_LIMIT = 6;
const DEFAULT_SORT_TYPE = SortType.Price;
const DEFAULT_SORT_DIRECTION = SortDirection.Desc;
const DEFAULT_PAGE_COUNT = 1;

export class WorkoutQuery {
  @Transform(({ value }) => +value || DEFAULT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_LIMIT;

  @IsEnum(SortType)
  @IsOptional()
  public sortType: SortType = DEFAULT_SORT_TYPE;

  @IsEnum(SortDirection)
  @IsOptional()
  public sortDirection: SortDirection = DEFAULT_SORT_DIRECTION;

  @Transform(({ value }) => +value || DEFAULT_PAGE_COUNT)
  @IsOptional()
  public page: number = DEFAULT_PAGE_COUNT;

  @IsArray()
  @IsOptional()
  public type: WorkoutType[];
}
