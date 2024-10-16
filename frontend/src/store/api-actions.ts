import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { State, store } from '.';
import { CreateUserDto, LoginUserDto, UserInfo, UserTokens } from '../types/user.type';
import { APIRoute } from '../const';
import { saveTokens } from '../services/token';
import { Interview } from '../types/interview.type';
import { Workout } from '../types/workout.type';

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

export const addInterview = createAppAsyncThunk<UserInfo, Interview>('user/interview',
  async (dto, {extra: api}) => {
    const {data} = await api.post<UserInfo>(APIRoute.Interview, dto);
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

export const fetchWorkouts = createAppAsyncThunk<Workout[], undefined>('workouts/fetchWorkouts',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Workout[]>(APIRoute.Workout);
    return data;
  }
);
