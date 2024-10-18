import { Workout } from './types/workout.type';

export const getAverageRating = (workout: Workout) => {
  if (workout.review.length === 0) {
    return 0;
  }
  return Math.round(workout.review.reduce((total, item) => total + item.rating, 0) / workout.review.length);
}
