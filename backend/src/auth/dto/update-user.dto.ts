import { Gender } from 'src/shared/types/gender.enum';
import { Subway } from 'src/shared/types/subway.enum';

export class UpdateUserDto {
  name?: string;
  avatarUrl?: string;
  gender?: Gender;
  birthday?: Date;
  description?: string;
  subway?: Subway;
  imageUrl?: string;
}
