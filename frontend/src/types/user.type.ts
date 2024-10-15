import { Gender } from './gender.enum';
import { Interview } from './interview.type';
import { Subway } from './subway.enum';

export type UserInfo = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  gender: Gender
  birthday: string;
  description: string;
  subway: Subway;
  imageUrl: string;
  interview: Interview | null;
}

export type CreateUserDto = {
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

export type LoginUserDto = {
  email: string;
  password: string;
}

export type UserTokens = {
  id: string;
  accessToken: string;
  refreshToken: string;
}
