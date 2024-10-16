export type Review = {
  id: string;
  userId: string;
  rating: number;
  text: string;
}

export type CreateReviewDto = {
  //userId: string;
  workoutId: string;
  rating: number;
  text: string;
}
