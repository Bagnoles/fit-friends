import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../const';
import { UserInfo } from '../../types/user.type';
import { addCoachInterview, addInterview, checkAuthorization, fetchUsers, getCoachInterview, getInterview, loginAction, refreshTokens, registerAction, updateProfile } from '../api-actions';

type UserInitialStateType = {
  authorizationStatus: AuthorizationStatus;
  isRegisterError: boolean;
  isLoginError: boolean;
  isInterviewError: boolean;
  userInfo: UserInfo | null ;
  users: {
    data: UserInfo[];
    isLoading: boolean;
    isError: boolean;
  }
}

const initialState: UserInitialStateType = {
  authorizationStatus: AuthorizationStatus.Unknown,
  isRegisterError: false,
  isLoginError: false,
  isInterviewError: false,
  userInfo: null,
  users: {
    data: [],
    isLoading: false,
    isError: false
  }
};

export const userSlice = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(registerAction.fulfilled, (state, action) => {
        state.isRegisterError = false;
        state.userInfo = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(registerAction.rejected, (state) => {
        state.isRegisterError = true;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.isLoginError = false;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(loginAction.rejected, (state) => {
        state.isLoginError = true;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(addInterview.fulfilled, (state, action) => {
        state.isInterviewError = false;
        if (state.userInfo) {
          state.userInfo.interview = action.payload;
        }
      })
      .addCase(addInterview.rejected, (state) => {
        state.isInterviewError = true;
      })
      .addCase(getInterview.fulfilled, (state, action) => {
        state.isInterviewError = false;
        if (state.userInfo) {
          state.userInfo.interview = action.payload;
        }
      })
      .addCase(getInterview.rejected, (state) => {
        state.isInterviewError = true;
      })
      .addCase(checkAuthorization.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthorization.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(refreshTokens.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(refreshTokens.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.userInfo = action.payload;
      })
      .addCase(addCoachInterview.fulfilled, (state, action) => {
        state.isInterviewError = false;
        if (state.userInfo) {
          state.userInfo.interview = action.payload;
        }
      })
      .addCase(addCoachInterview.rejected, (state) => {
        state.isInterviewError = true;
      })
      .addCase(getCoachInterview.fulfilled, (state, action) => {
        state.isInterviewError = false;
        if (state.userInfo) {
          state.userInfo.interview = action.payload;
        }
      })
      .addCase(getCoachInterview.rejected, (state) => {
        state.isInterviewError = true;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.users.isError = false;
        state.users.isLoading = true;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.users.isError = true;
        state.users.isLoading = false;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users.isError = false;
        state.users.isLoading = false;
        state.users.data = action.payload;
      })
  }
});
