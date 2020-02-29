import { Action, createReducer, createSelector, on } from '@ngrx/store';
import {
  authenticateSuccess,
  authenticateFailure,
  reset,
  logout,
  logoutSuccess,
  logoutFailure, authenticate
} from './auth.actions';
import { AppState } from '@starter/state';

export interface IUser {
  email: string;
  name?: string;
}

export interface IAuthState {
  authenticated: boolean;
  loading: boolean;
  user: any;
  token: any;
}

const initialState: IAuthState = {
  authenticated: false,
  loading: false,
  user: null,
  token: null
};

const reducer = createReducer(
  initialState,
  on(reset, () => ({ ...initialState })),
  on(authenticateSuccess, (state, {user, tokenData}) => ({...state, user, token: tokenData, authenticated: true, loading: false })),
  on(authenticateFailure, () => ({ ...initialState })),
  on(logout, (state) => ({ ...state, loading: true })),
  on(logoutSuccess, () => ({ ...initialState })),
  on(logoutFailure, () => ({ ...initialState }))
);

export function authReducer(state = initialState, action: Action): IAuthState {
  return reducer(state, action);
}

export const getAuthState = (state: AppState) => state.auth;
export const mapToAuthenticated = (state: IAuthState) => state.authenticated;
export const mapToLoading = (state: IAuthState) => state.loading;
export const mapToToken = (state: IAuthState) => state.token;
export const token = createSelector(getAuthState, mapToToken);
export const authenticated = createSelector(getAuthState, mapToAuthenticated);
export const loading = createSelector(getAuthState, mapToLoading);

