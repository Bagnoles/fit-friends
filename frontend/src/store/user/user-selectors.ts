import { State } from '..';
import { AuthorizationStatus, NameSpace } from '../../const';
import { UserInfo } from '../../types/user.type';

export const getAuthorizationStatus = (state: Pick<State, NameSpace.User>): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getUserInfo = (state: Pick<State, NameSpace.User>): UserInfo | null => state[NameSpace.User].userInfo;
export const getLoginErrorStatus = (state: Pick<State, NameSpace.User>): boolean => state[NameSpace.User].isLoginError;
export const getRegisterErrorStatus = (state: Pick<State, NameSpace.User>): boolean => state[NameSpace.User].isRegisterError;

export const getAllUsers = (state: Pick<State, NameSpace.User>): UserInfo[] => state[NameSpace.User].users.data;
export const getUsersErrorStatus = (state: Pick<State, NameSpace.User>): boolean => state[NameSpace.User].users.isError;
export const getUsersLoadingStatus = (state: Pick<State, NameSpace.User>): boolean => state[NameSpace.User].users.isLoading;

export const getAllFriends = (state: Pick<State, NameSpace.User>): UserInfo[] => state[NameSpace.User].friends.data;
export const getFriendsErrorStatus = (state: Pick<State, NameSpace.User>): boolean => state[NameSpace.User].friends.isError;
export const getFriendsLoadingStatus = (state: Pick<State, NameSpace.User>): boolean => state[NameSpace.User].friends.isLoading;
