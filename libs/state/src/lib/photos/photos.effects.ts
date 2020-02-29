import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { map, tap } from 'rxjs/operators';

import { PhotosFacade } from './photos.facade';
import * as photosActions from './photos.actions';
import { Photo, PhotosService, SnackbarService } from '@starter/core';
import { PhotosPartialState } from './photos.reducer';
import { AppFacade } from '../app/app.facade';

@Injectable()
export class PhotosEffects {
  loadPhotos$ = createEffect(() =>
    this.dataPersistence.fetch(photosActions.loadPhotos, {
      run: (
        action: ReturnType<typeof photosActions.loadPhotos>,
        state: PhotosPartialState
      ) => {
        this.appFacade.addLoad('[PHOTOS][LOAD]');
        return this.photosService.all().pipe(
          tap(() => this.notifyService.openSnackBar('Successfully Loaded Photos')),
          tap(() => this.appFacade.removeLoad('[PHOTOS][LOAD]')),
          map((photos: any) => photosActions.photosLoaded({ photos: photos})),
        );
      },
      onError: (action: ReturnType<typeof photosActions.loadPhotos>, error) => {
        console.log('Effect Error:', error);
      }
    })
  );

  addPhoto$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(photosActions.createPhoto, {
      run: (
        action: ReturnType<typeof photosActions.createPhoto>,
        state: PhotosPartialState
      ) => {
        this.appFacade.addLoad('[PHOTOS][CREATE]');

        return this.photosService.create(action.name, action.photo).pipe(
          map((photo: Photo) => photosActions.photoCreated({ photo })),
          tap(() => this.notifyService.openSnackBar('Successfully Added a Photo')),
          tap(() => this.appFacade.removeLoad('[PHOTOS][CREATE]'))
        );
      },
      onError: (action: ReturnType<typeof photosActions.createPhoto>, error) => {
        console.log('Effect Error:', error);
      }
    })
  );

  updatePhoto$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(photosActions.updatePhoto, {
      run: (
        action: ReturnType<typeof photosActions.updatePhoto>,
        state: PhotosPartialState
      ) => {
        this.appFacade.addLoad('[PHOTOS][UPDATE]');

        return this.photosService.update(action.photo).pipe(
          map((photo: any) => photosActions.photoUpdated({ photo })),
          tap(() => this.notifyService.openSnackBar('Successfully Updated a Photo')),
          tap(() => this.appFacade.removeLoad('[PHOTOS][UPDATE]'))
        );
      },
      onError: (action: ReturnType<typeof photosActions.updatePhoto>, error) => {
        console.log('Effect Error:', error);
      }
    })
  );

  deletePhoto$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(photosActions.deletePhoto, {
      run: (
        action: ReturnType<typeof photosActions.deletePhoto>,
        state: PhotosPartialState
      ) => {
        this.appFacade.addLoad('[PHOTOS][DELETE]');
        return this.photosService.delete(action.photoId).pipe(
          map((photos: any[]) => photosActions.photoDeleted({ photoId: action.photoId, photos })),
          tap(() => this.notifyService.openSnackBar('Successfully Deleted a Photo')),
          // tap(() => this.photosFacade.loadPhotos()),
          tap(() => this.appFacade.removeLoad('[PHOTOS][DELETE]'))
        );
      },
      onError: (action: ReturnType<typeof photosActions.deletePhoto>, error) => {
        console.log('Effect Error:', error);
      }
    })
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<PhotosPartialState>,
    private photosService: PhotosService,
    private photosFacade: PhotosFacade,
    private notifyService: SnackbarService,
    private appFacade: AppFacade
  ) {}
}
