import { createAction, props } from '@ngrx/store';

import { Photo } from '@starter/core';

export const photoSelected = createAction(
  '[PHOTOS][SELECTED]',
  props<{ selectedPhotoId: string }>()
);
export const loadPhotos = createAction(
  '[PHOTOS][LOAD]'
);
export const photosLoaded = createAction(
  '[PHOTOS][LOADED]',
  props<{ photos: any[] }>()
);
export const createPhoto = createAction(
  '[PHOTOS][CREATE]',
  props<{ name: any, photo: any}>()
);
export const photoCreated = createAction(
  '[PHOTOS][CREATED]',
  props<{ photo: any }>()
);
export const updatePhoto = createAction(
  '[PHOTOS][UPDATE]',
  props<{ photo: any }>()
);
export const photoUpdated = createAction(
  '[PHOTOS][UPDATED]',
  props<{ photo: any }>()
);
export const deletePhoto = createAction(
  '[PHOTOS][DELETE]',
  props<{ photoId: any }>()
);
export const photoDeleted = createAction(
  '[PHOTOS][DELETED]',
  props<{ photoId: any, photos: any[] }>()
);
