import { IMAGE_PATH } from './const';
import { File } from './types/file.type';
import { Workout } from './types/workout.type';

const IMAGES_URL = [
  'img/content/thumbnails/preview-01.jpg',
  'img/content/thumbnails/preview-02.jpg',
  'img/content/thumbnails/preview-03.jpg',
];

export const getAverageRating = (workout: Workout) => {
  if (workout.review.length === 0) {
    return 0;
  }
  return Math.round(workout.review.reduce((total, item) => total + item.rating, 0) / workout.review.length);
}

export const getImagePath = (image: File) => IMAGE_PATH + image.subDirectory+ '/' + image.hashName;

const getRandomNumber = (min: number, max: number) => Math.floor(min + Math.random() * (max + 1 - min));

const getRandomArrayEl= <T>(array: T[]) => array[getRandomNumber(0, array.length - 1)];

export const getRandomWorkoutImage = () => getRandomArrayEl(IMAGES_URL);
