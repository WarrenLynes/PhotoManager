import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as photosActions from './photos.actions';
import { Photo } from '@starter/core';

export const PHOTOS_FEATURE_KEY = 'photos';

export interface PhotosState extends EntityState<Photo> {
  selectedPhotoId?: string | number;
  isLoading: boolean;
}

export interface PhotosPartialState {
  readonly [PHOTOS_FEATURE_KEY]: PhotosState;
}

export const photosAdapter: EntityAdapter<Photo> = createEntityAdapter<Photo>();

export const initialState: PhotosState = photosAdapter.getInitialState({
  selectedPhotoId: null,
  isLoading: false
});

const photosReducer = createReducer(
  initialState,
  on(photosActions.photoSelected, (state, { selectedPhotoId }) =>
    Object.assign({}, state, { selectedPhotoId })
  ),
  on(photosActions.photosLoaded, (state, { photos }) =>
    photosAdapter.addAll(photos, { ...state, isLoading: false })
  ),
  on(photosActions.photoCreated, (state, { photo }) =>
    photosAdapter.addOne(photo, { ...state, isLoading: false })
  ),
  on(photosActions.photoUpdated, (state, { photo }) =>
    photosAdapter.upsertOne(photo, { ...state, isLoading: false })
  ),
  on(photosActions.photoDeleted, (state, { photoId }) =>
    photosAdapter.removeOne(photoId, { ...state, isLoading: false })
  ),
  on(
    photosActions.loadPhotos,
    photosActions.createPhoto,
    photosActions.updatePhoto,
    photosActions.deletePhoto,
    (state) => ({
      ...state,
      isLoading: true
    })
  ),
);

export function reducer(state: PhotosState | undefined, action: Action) {
  return photosReducer(state, action);
}
