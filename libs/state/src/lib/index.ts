import { ActionReducerMap } from '@ngrx/store';

import { appReducer, IAppState } from './app/app.reducer';
import { authReducer, IAuthState } from './auth/auth.reducer';
import * as fromPhotos from './photos/photos.reducer';

export interface AppState {
  app: IAppState;
  auth: IAuthState;
  photos: fromPhotos.PhotosState;
}

export const reducers: ActionReducerMap<AppState> = {
  app: appReducer,
  auth: authReducer,
  photos: fromPhotos.reducer,
};

export const defaultState: AppState = {
  app: null,
  auth: null,
  photos: {ids: [] } as fromPhotos.PhotosState,
};
