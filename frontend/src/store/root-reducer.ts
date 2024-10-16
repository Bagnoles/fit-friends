import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { userSlice } from './user/user-slice';
import { workoutSlice } from './workout/workout-slice';
import { balanceSlice } from './balance/balance-slice';

export const rootReducer = combineReducers({
  [NameSpace.User]: userSlice.reducer,
  [NameSpace.Workout]: workoutSlice.reducer,
  [NameSpace.Balance]: balanceSlice.reducer
});
