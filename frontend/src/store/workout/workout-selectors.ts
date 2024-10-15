import { State } from '..';
import { NameSpace } from '../../const';
import { Workout } from '../../types/workout.type';

export const getWorkouts = (state: Pick<State, NameSpace.Workout>): Workout[] => state[NameSpace.Workout].workouts.data;
export const getWorkoutErrorStatus = (state: Pick<State, NameSpace.Workout>): boolean => state[NameSpace.Workout].workouts.isError;
export const getWorkoutLoadingStatus = (state: Pick<State, NameSpace.Workout>): boolean => state[NameSpace.Workout].workouts.isLoading;
