import { UserInfo } from './user.type';

export type Review = {
  id: string;
  user: UserInfo;
  rating: number;
  text: string;
}

export type CreateReviewDto = {
  workoutId: string;
  rating: number;
  text: string;
}
