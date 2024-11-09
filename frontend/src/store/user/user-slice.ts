import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../const';
import { UserInfo } from '../../types/user.type';
import { addCoachInterview, addInterview, checkAuthorization, getCoachInterview, getInterview, loginAction, refreshTokens, registerAction } from '../api-actions';

type UserInitialStateType = {
  authorizationStatus: AuthorizationStatus;
  isRegisterError: boolean;
  isLoginError: boolean;
  isInterviewError: boolean;
  userInfo: UserInfo | null ;
}

const initialState: UserInitialStateType = {
  authorizationStatus: AuthorizationStatus.Unknown,
  isRegisterError: false,
  isLoginError: false,
  isInterviewError: false,
  userInfo: null,
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
  }
});
