import { State } from '..';
import { NameSpace } from '../../const';
import { Balance } from '../../types/balance.type';

export const getBalance = (state: Pick<State, NameSpace.Balance>): Balance[] => state[NameSpace.Balance].balance.data;
export const getBalanceLoadingStatus = (state: Pick<State, NameSpace.Balance>): boolean => state[NameSpace.Balance].balance.isLoading;
export const getBalanceErrorStatus = (state: Pick<State, NameSpace.Balance>): boolean => state[NameSpace.Balance].balance.isError;
