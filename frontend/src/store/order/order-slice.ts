import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { CoachOrder } from '../../types/order.type';
import { fetchCoachOrders } from '../api-actions';

type OrderInitialStateType = {
  order: {
    data: CoachOrder[];
    isLoading: boolean;
    isError: boolean;
  };
}

const initialState: OrderInitialStateType = {
  order: {
    data: [],
    isLoading: false,
    isError: false
  }
};

export const orderSlice = createSlice({
  name: NameSpace.Order,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCoachOrders.pending, (state) => {
        state.order.isError = false;
        state.order.isLoading = true;
      })
      .addCase(fetchCoachOrders.rejected, (state) => {
        state.order.isError = true;
        state.order.isLoading = false;
      })
      .addCase(fetchCoachOrders.fulfilled, (state, action) => {
        state.order.isError = false;
        state.order.isLoading = false;
        state.order.data = action.payload;
      })
  }
});
