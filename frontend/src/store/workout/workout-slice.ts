import { createSlice } from '@reduxjs/toolkit';
import { Workout } from '../../types/workout.type';
import { NameSpace } from '../../const';
import { fetchWorkouts } from '../api-actions';

type WorkoutInitialStateType = {
  workouts: {
    data: Workout[];
    isLoading: boolean;
    isError: boolean;
  };
}

const initialState: WorkoutInitialStateType = {
  workouts: {
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
  }
});
