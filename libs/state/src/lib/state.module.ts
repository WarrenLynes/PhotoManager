import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataPersistence } from '@nrwl/angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RootStoreConfig, StoreModule } from '@ngrx/store';

import { CoreModule } from '@starter/core';
import { reducers } from '.';
import { AuthEffects } from './auth/auth.effects';
import { PhotosEffects } from './photos/photos.effects';

const storeConfig: RootStoreConfig<any> = {
  runtimeChecks: {
    strictActionImmutability: true,
    strictStateImmutability: true
  }
};

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    StoreModule.forRoot(reducers, storeConfig),
    EffectsModule.forRoot([
      AuthEffects,
      PhotosEffects
    ]),
    StoreDevtoolsModule.instrument({ name: 'starter Store' })
  ],
  providers: [DataPersistence]
})
export class StateModule {}
