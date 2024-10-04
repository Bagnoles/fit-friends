import { Gender } from 'src/shared/types/gender.enum';
import { Subway } from 'src/shared/types/subway.enum';

export class CreateUserDto {
  name: string;
  email: string;
  avatarUrl: string;
  password: string;
  gender: Gender;
  birthday?: Date;
  description: string;
  subway: Subway;
  imageUrl: string;
}
