import { IMAGE_PATH } from './const';
import { File } from './types/file.type';
import { Workout } from './types/workout.type';

export const getAverageRating = (workout: Workout) => {
  if (workout.review.length === 0) {
    return 0;
  }
  return Math.round(workout.review.reduce((total, item) => total + item.rating, 0) / workout.review.length);
}

export const getImagePath = (image: File) => IMAGE_PATH + image.subDirectory+ '/' + image.hashName;
