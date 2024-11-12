import { State } from '..';
import { NameSpace } from '../../const';
import { CoachOrder } from '../../types/order.type';

export const getOrders = (state: Pick<State, NameSpace.Order>): CoachOrder[] => state[NameSpace.Order].order.data;
export const getOrdersLoadingStatus = (state: Pick<State, NameSpace.Order>): boolean => state[NameSpace.Order].order.isLoading;
export const getOrdersErrorStatus = (state: Pick<State, NameSpace.Order>): boolean => state[NameSpace.Order].order.isError;
