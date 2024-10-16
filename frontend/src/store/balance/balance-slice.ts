import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Balance } from '../../types/balance.type';
import { addToBalance, deleteFromBalance, fetchUserBalance } from '../api-actions';

type BalanceInitialStateType = {
  balance: {
    data: Balance[];
    isLoading: boolean;
    isError: boolean;
  };
}

const initialState: BalanceInitialStateType = {
  balance: {
    data: [],
    isLoading: false,
    isError: false
  }
};

export const balanceSlice = createSlice({
  name: NameSpace.Balance,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUserBalance.pending, (state) => {
        state.balance.isError = false;
        state.balance.isLoading = true;
      })
      .addCase(fetchUserBalance.rejected, (state) => {
        state.balance.isError = true;
        state.balance.isLoading = false;
      })
      .addCase(fetchUserBalance.fulfilled, (state, action) => {
        state.balance.isError = false;
        state.balance.isLoading = false;
        state.balance.data = action.payload;
      })
      .addCase(addToBalance.fulfilled, (state, action) => {
        state.balance.data.push(action.payload);
      })
      .addCase(deleteFromBalance.fulfilled, (state, action) => {
        state.balance.data = state.balance.data.map((item) => {
          if (item.workout.id === action.payload.workout.id) {
            item.count--;
          }
          return item;
        });
      })
  }
});
