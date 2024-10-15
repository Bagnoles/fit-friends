import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../const';
import { UserInfo } from '../../types/user.type';
import { addInterview, loginAction, registerAction } from '../api-actions';

type UserInitialStateType = {
  authorizationStatus: AuthorizationStatus;
  isRegisterError: boolean;
  isLoginError: boolean;
  isInterviewError: boolean;
  userInfo: UserInfo | null;
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
        state.userInfo = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(addInterview.rejected, (state) => {
        state.isInterviewError = true;
      })
  }
});
