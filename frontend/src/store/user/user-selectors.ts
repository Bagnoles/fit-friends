import { State } from '..';
import { AuthorizationStatus, NameSpace } from '../../const';
import { UserInfo } from '../../types/user.type';

export const getAuthorizationStatus = (state: Pick<State, NameSpace.User>): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getUserInfo = (state: Pick<State, NameSpace.User>): UserInfo | null => state[NameSpace.User].userInfo;
export const getLoginErrorStatus = (state: Pick<State, NameSpace.User>): boolean => state[NameSpace.User].isLoginError;
export const getRegisterErrorStatus = (state: Pick<State, NameSpace.User>): boolean => state[NameSpace.User].isRegisterError;
