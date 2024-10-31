import { Gender } from './gender.enum';
import { Subway } from './subway.enum';

export interface User {
  id?: string;
  name: string;
  email: string;
  avatarUrl: string;
  passwordHash: string;
  gender: Gender;
  birthday?: Date;
  description: string;
  subway: Subway;
  imageUrl: string;
  avatarId: string;
}
