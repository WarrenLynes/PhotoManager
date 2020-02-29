import { Injectable } from '@angular/core';
import { Action, select, Store, ActionsSubject } from '@ngrx/store';
import * as fromPhotos from './photos.reducer';
import * as photosActions from './photos.actions';
import {
  selectAllPhotos,
  selectPhoto,
  selectPhotosLoading
} from './photos.selectors';
import { Photo } from '@starter/core';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PhotosFacade {
  allPhotos$ = this.store.pipe(select(selectAllPhotos));
  selectedPhoto$ = this.store.pipe(select(selectPhoto));
  photoLoading$ = this.store.pipe(select(selectPhotosLoading));

  constructor(
    private store: Store<fromPhotos.PhotosPartialState>,
    private actions$: ActionsSubject
  ) {}

  selectPhoto(selectedPhotoId: any) {
    this.dispatch(photosActions.photoSelected({ selectedPhotoId }));
  }

  loadPhotos() {
    this.dispatch(photosActions.loadPhotos());
  }

  createPhoto({name, photo}) {
    this.dispatch(photosActions.createPhoto({name, photo}));
  }

  updatePhoto(photo: Photo) {
    this.dispatch(photosActions.updatePhoto({ photo }));
  }

  deletePhoto(photoId: any) {
    this.dispatch(photosActions.deletePhoto({ photoId }));
  }

  private dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
