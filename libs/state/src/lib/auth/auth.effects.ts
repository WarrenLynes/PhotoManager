import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, delay, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '@starter/core';
import { AppState } from '../index';
import {
  authenticate,
  authenticateFailure,
  authenticateSuccess,
  logout,
  logoutFailure,
  logoutSuccess, register
} from './auth.actions';
import { IUser } from './auth.reducer';
import { SnackbarService } from '@starter/core';
import { AppFacade } from '../app/app.facade';


@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private service: AuthService,
    private store: Store<AppState>,
    private router: Router,
    private appFacade: AppFacade,
    private snackbarService: SnackbarService,
    private route: ActivatedRoute
  ) {}

  authenticate$ = createEffect(
    () => this.actions$.pipe(
      ofType(authenticate),
      switchMap(({type, email, password}) => {
        console.log(email, password);
        return this.service.authenticate({email, password}).pipe(
          map(({user, tokenData}: any) => authenticateSuccess({user, tokenData})),
          catchError(error => of(authenticateFailure({error})))
        )
      })
    )
  );

  register$ = createEffect(
    () => this.actions$.pipe(
      ofType(register),
      switchMap(({type, email, password, name, phone}) => {
        return this.service.register({email, password, name, phone}).pipe(
          map(({user, tokenData}: any) => authenticateSuccess({user, tokenData})),
          catchError(error => of(authenticateFailure({error})))
        )
      })
    )
  );

  logout$ = createEffect(
    () => this.actions$.pipe(
      ofType(logout),
      tap((type) => {
        this.appFacade.addLoad('[LOGOUT]');
        this.snackbarService.openSnackBar('adios!', 500)
      }),
      switchMap(() => {
        return this.service.logout().pipe(
          map((user: IUser) => logoutSuccess()),
          tap(() => this.snackbarService.openSnackBar('Logout Success')),
          catchError(error => of(logoutFailure()))
        )
      })
    )
  );

  logoutSuccess$ = createEffect(
    () => this.actions$.pipe(
      ofType(logoutSuccess),
      tap(() => {
        localStorage.removeItem('token');
        this.appFacade.removeLoad('[LOGOUT]');
        this.router.navigateByUrl('/');
      })
    ), {dispatch: false});

  authenticateSuccess$ = createEffect(
    () => this.actions$.pipe(
      ofType(authenticateSuccess),
      tap(({user, tokenData}) => {
        localStorage.setItem('token', tokenData.token);
        if(this.route.snapshot.queryParams['returnUrl']) {
          this.router.navigateByUrl(this.route.snapshot.queryParams['returnUrl'])
        } else {
          this.router.navigateByUrl('');
          this.snackbarService.openSnackBar(`Hello ${user.name}!`);
        }
      })
    )
    , {dispatch: false});
}
