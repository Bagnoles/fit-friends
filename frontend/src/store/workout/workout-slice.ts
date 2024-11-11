import { createSlice } from '@reduxjs/toolkit';
import { Workout } from '../../types/workout.type';
import { NameSpace } from '../../const';
import { addReview, createWorkout, fetchCoachWorkouts, fetchWorkoutReviews, fetchWorkouts } from '../api-actions';
import { Review } from '../../types/review.type';
import { PaginationResult } from '../../types/pagination.interface';

type WorkoutInitialStateType = {
  workouts: {
    data: PaginationResult<Workout>;
    isLoading: boolean;
    isError: boolean;
  };
  reviews: {
    data: Review[];
    isLoading: boolean;
    isError: boolean;
  };
}

const initialState: WorkoutInitialStateType = {
  workouts: {
    data: {
      entities: [],
      totalPages: 0,
      totalItems: 0,
      currentPage: 0,
      itemsPerPage: 0
    },
    isLoading: false,
    isError: false
  },
  reviews: {
    data: [],
    isLoading: false,
    isError: false
  }
}

export const workoutSlice = createSlice({
  name: NameSpace.Workout,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchWorkouts.pending, (state) => {
        state.workouts.isError = false;
        state.workouts.isLoading = true;
      })
      .addCase(fetchWorkouts.rejected, (state) => {
        state.workouts.isError = true;
        state.workouts.isLoading = false;
      })
      .addCase(fetchWorkouts.fulfilled, (state, action) => {
        state.workouts.isError = false;
        state.workouts.isLoading = false;
        state.workouts.data = action.payload;
      })
      .addCase(fetchCoachWorkouts.pending, (state) => {
        state.workouts.isError = false;
        state.workouts.isLoading = true;
      })
      .addCase(fetchCoachWorkouts.rejected, (state) => {
        state.workouts.isError = true;
        state.workouts.isLoading = false;
      })
      .addCase(fetchCoachWorkouts.fulfilled, (state, action) => {
        state.workouts.isError = false;
        state.workouts.isLoading = false;
        state.workouts.data = action.payload;
      })
      .addCase(fetchWorkoutReviews.pending, (state) => {
        state.reviews.isError = false;
        state.reviews.isLoading = true;
      })
      .addCase(fetchWorkoutReviews.rejected, (state) => {
        state.reviews.isError = true;
        state.reviews.isLoading = false;
      })
      .addCase(fetchWorkoutReviews.fulfilled, (state, action) => {
        state.reviews.isError = false;
        state.reviews.isLoading = false;
        state.reviews.data = action.payload;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.reviews.data.push(action.payload);
      })
      .addCase(createWorkout.pending, (state) => {
        state.workouts.isError = false;
        state.workouts.isLoading = true;
      })
      .addCase(createWorkout.rejected, (state) => {
        state.workouts.isError = true;
        state.workouts.isLoading = false;
      })
      .addCase(createWorkout.fulfilled, (state, action) => {
        state.workouts.isError = false;
        state.workouts.isLoading = false;
        state.workouts.data.entities.push(action.payload);
      })
  }
});
