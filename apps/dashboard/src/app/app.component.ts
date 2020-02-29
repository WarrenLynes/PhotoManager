import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AppFacade, AuthFacade} from '@starter/state';
import { Observable, Subject } from 'rxjs';
import { filter, first, map, takeUntil, withLatestFrom } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'starter-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  authenticated$: Observable<boolean> = this.authFacade.authenticated$;
  destroy$: Subject<boolean> = new Subject();
  loading: boolean;

  links = [
    // {path: '', title: '', icon: ''},
  ];

  constructor(
    private authFacade: AuthFacade,
    private appFacade: AppFacade,
    private cdRef: ChangeDetectorRef
  ){}

  ngOnInit(): void {
    this.appFacade.initialize();

    this.appFacade.loading$.pipe(takeUntil(this.destroy$)).subscribe((x) => {
      if (x !== this.loading) {
        this.loading = x;
        this.cdRef.detectChanges()
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  onLogout() {
    this.authFacade.logout();
  }

  onAuthenticate() {
    window.location.replace('http://localhost:3333/api/login')
  }

}
