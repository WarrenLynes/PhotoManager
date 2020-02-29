import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { exhaustMap, filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import {of, Observable} from 'rxjs';
import {iif} from 'rxjs/internal/observable/iif';
import { AuthFacade } from '@starter/state';

// const API_URL = 'https://www.googleapis.com/youtube/v3';
const API_URL = 'api';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authFacade: AuthFacade) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return of(req.url).pipe(
      withLatestFrom(this.authFacade.token$),
      switchMap(([url, token]) => {
        console.log(url.indexOf(API_URL) > -1);
        console.log(token);
        if(url.indexOf(API_URL) > -1) {
          if(token && token.token) {
            return next.handle(
              req.clone({headers: req.headers.append('Authorization', token.token)})
            )
          } else {
            return next.handle(req.clone());
          }
        } else {
          return next.handle(req.clone());
        }
      })
    );
  }
}
