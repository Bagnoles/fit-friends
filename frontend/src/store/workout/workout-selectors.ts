import { State } from '..';
import { NameSpace } from '../../const';
import { Review } from '../../types/review.type';
import { Workout } from '../../types/workout.type';

export const getWorkouts = (state: Pick<State, NameSpace.Workout>): Workout[] => state[NameSpace.Workout].workouts.data;
export const getWorkoutErrorStatus = (state: Pick<State, NameSpace.Workout>): boolean => state[NameSpace.Workout].workouts.isError;
export const getWorkoutLoadingStatus = (state: Pick<State, NameSpace.Workout>): boolean => state[NameSpace.Workout].workouts.isLoading;

export const getReviews = (state: Pick<State, NameSpace.Workout>): Review[] => state[NameSpace.Workout].reviews.data;
export const getReviewsErrorStatus = (state: Pick<State, NameSpace.Workout>): boolean => state[NameSpace.Workout].reviews.isError;
export const getReviewsLoadingStatus = (state: Pick<State, NameSpace.Workout>): boolean => state[NameSpace.Workout].reviews.isLoading;
