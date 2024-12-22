import { File } from './file.type';
import { Gender } from './gender.enum';
import { CoachInterview, Interview } from './interview.type';
import { Role } from './role.enum';
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
  interview: Interview | CoachInterview | null;
  coachInterview: CoachInterview | null;
  avatar?: File;
  role: Role;
}

export type CreateUserDto = {
  name: string;
  email: string;
  avatarUrl: string;
  password: string;
  gender: Gender;
  birthday?: string;
  description: string;
  subway: Subway;
  imageUrl: string;
  role: Role;
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
