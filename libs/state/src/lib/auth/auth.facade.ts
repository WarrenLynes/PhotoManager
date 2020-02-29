import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { authenticated, loading, token } from './auth.reducer';
import { Store } from '@ngrx/store';
import { authenticate as authenticateAction, logout, register as registerAction} from './auth.actions';
import { AppState } from '../index';

@Injectable({providedIn: 'root'})
export class AuthFacade {
  get authenticated$(): Observable<boolean> {
    return this.store.select(authenticated);
  }

  get token$(): Observable<any> {
    return this.store.select(token);
  }

  get loading$(): Observable<boolean> {
    return this.store.select(loading);
  }

  constructor(private store: Store<AppState>) {}


  authenticate({email, password}) {
    this.store.dispatch(authenticateAction({email, password}));
  }

  register({email, password, name, phone}) {
    this.store.dispatch(registerAction({email, password, name, phone}));
  }

  logout() {
    this.store.dispatch(logout());
  }
}
