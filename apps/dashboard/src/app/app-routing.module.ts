import { NgModule } from '@angular/core';
import { UiModule } from '@starter/ui';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from '@starter/ui';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  imports: [
    UiModule,
    RouterModule.forRoot([
      { path: 'home', redirectTo: 'login', pathMatch: 'full'},
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: '404', component: NotFoundComponent },
      { path: '', canActivate: [AuthGuard], children: [
          { path: '', component: MainComponent}
      ]},
      { path: '**', redirectTo: '404', pathMatch: 'full' },
    ], { initialNavigation: 'enabled' })
  ]
})
export class AppRoutingModule {}
