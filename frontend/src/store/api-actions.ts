import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { State, store } from '.';
import { CreateUserDto, LoginUserDto, UserInfo, UserTokens } from '../types/user.type';
import { APIRoute } from '../const';
import { saveTokens } from '../services/token';
import { Interview } from '../types/interview.type';
import { Workout } from '../types/workout.type';
import { CreateReviewDto, Review } from '../types/review.type';
import { CreateOrderDto, Order } from '../types/order.type';
import { Balance } from '../types/balance.type';
import { PaginationResult } from '../types/pagination.interface';
import { WorkoutQuery } from '../types/workout-query.type';

const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: State;
  dispatch: typeof store.dispatch;
  extra: AxiosInstance;
}>();

export const registerAction = createAppAsyncThunk<UserInfo, CreateUserDto>('user/register',
  async (dto, {extra: api}) => {
    const {data} = await api.post<UserInfo>(`${APIRoute.User}/register`, dto);
    return data;
  }
);

export const loginAction = createAppAsyncThunk<UserTokens, LoginUserDto>('user/login',
  async ({email, password}, {extra: api}) => {
    const {data} = await api.post<UserTokens>(`${APIRoute.User}/login`, {email, password});
    saveTokens(data.accessToken, data.refreshToken);
    return data;
  }
);

export const addInterview = createAppAsyncThunk<Interview, Interview>('user/interview',
  async (dto, {extra: api}) => {
    const {data} = await api.post<Interview>(APIRoute.Interview, dto);
    return data;
  }
);

export const getInterview = createAppAsyncThunk<Interview, string>('user/getInterview',
  async (userId, {extra: api}) => {
    const {data} = await api.get<Interview>(`${APIRoute.Interview}/${userId}`);
    return data;
  }
);

export const checkAuthorization = createAppAsyncThunk<UserInfo, undefined>('user/check',
  async (_arg, {extra: api}) => {
    const {data: dataWithId} = await api.post<{id: string}>(`${APIRoute.User}/check`);
    const {data} = await api.get<UserInfo>(`${APIRoute.User}/${dataWithId.id}`);
    return data;
  }
);

export const refreshTokens = createAppAsyncThunk<{accessToken: string, refreshToken: string}, undefined>('user/refresh',
  async (_arg, {extra: api}) => {
    const {data} = await api.post<{accessToken: string, refreshToken: string}>(`${APIRoute.User}/refresh`);
    saveTokens(data.accessToken, data.refreshToken);
    return data;
  }
);

export const fetchWorkouts = createAppAsyncThunk<PaginationResult<Workout>, WorkoutQuery | undefined>('workouts/fetchWorkouts',
  async (arg, {extra: api}) => {
    if (arg) {
      const {data} = await api.get<PaginationResult<Workout>>(`${APIRoute.Workout}?page=${arg.page}&sortType=${arg.sortType}&sortDirection=${arg.sortDirection}&type[]=${arg.type}`);
      return data;
    }
    const {data} = await api.get<PaginationResult<Workout>>(APIRoute.Workout);
    return data;
  }
);

export const fetchWorkoutReviews = createAppAsyncThunk<Review[], string>('workouts/reviews',
  async (workoutId, {extra: api}) => {
    const {data} = await api.get<Review[]>(`${APIRoute.Review}/${workoutId}`);
    return data;
  }
);

export const addReview = createAppAsyncThunk<Review, CreateReviewDto>('workouts/addReview',
  async (dto, {extra: api}) => {
    const {data} = await api.post<Review>(APIRoute.Review, dto);
    return data;
  }
);

export const addOrder = createAppAsyncThunk<Order, CreateOrderDto>('user/buy',
  async (dto, {extra: api}) => {
    const {data} = await api.post<Order>(APIRoute.Order, dto);
    return data;
  }
);

export const fetchUserBalance = createAppAsyncThunk<Balance[], string>('user/getBalance',
  async (userId, {extra: api}) => {
    const {data} = await api.get<Balance[]>(`${APIRoute.Balance}/${userId}`);
    return data;
  }
);

export const addToBalance = createAppAsyncThunk<Balance, {workoutId: string, count: number}>('user/addToBalance',
  async (dto, {extra: api}) => {
    const {data} = await api.post<Balance>(APIRoute.Balance, dto);
    return data;
  }
);

export const deleteFromBalance = createAppAsyncThunk<Balance, {workoutId: string}>('user/deleteFromBalance',
  async (dto, {extra: api}) => {
    const {data} = await api.post<Balance>(`${APIRoute.Balance}/delete`, dto);
    return data;
  }
);
