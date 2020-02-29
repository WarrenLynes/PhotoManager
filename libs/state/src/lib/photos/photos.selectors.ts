import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  PHOTOS_FEATURE_KEY,
  photosAdapter,
  PhotosState
} from './photos.reducer';

export const selectPhotosState =
  createFeatureSelector<PhotosState>(PHOTOS_FEATURE_KEY);

const { selectAll, selectEntities } = photosAdapter.getSelectors();

export const selectPhotosLoading = createSelector(
  selectPhotosState,
  (state: PhotosState) => state.isLoading
);

export const selectAllPhotos = createSelector(
  selectPhotosState,
  (state: PhotosState) => selectAll(state)
);

export const selectPhotosEntities = createSelector(
  selectPhotosState,
  (state: PhotosState) => selectEntities(state)
);

export const selectPhotoId = createSelector(
  selectPhotosState,
  (state: PhotosState) => state.selectedPhotoId
);

export const selectPhoto = createSelector(
  selectPhotosEntities,
  selectPhotoId,
  (entities, selectedId) => {
    return selectedId ? entities[selectedId] : {name: null, imageUrl: null}
  }
);
