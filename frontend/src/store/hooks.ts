import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { State, store } from '.';

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
