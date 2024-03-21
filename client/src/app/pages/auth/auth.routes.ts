import { Routes } from '@angular/router'
import { unAuthGuardCanActivate } from '@app/guards'
import { AuthRoutesUrl } from './auth.routes.enum'

export const AuthRoutes: Routes = [
  {
    path: AuthRoutesUrl.LOGIN,
    loadComponent: () =>
      import('./pages/login/login.component').then(
        (c) => c.LoginComponent
      ),
    canActivate: [unAuthGuardCanActivate],
  },
  {
    path: AuthRoutesUrl.REGISTRATION,
    loadComponent: () =>
      import('./pages/registration/registration.component').then(
        (c) => c.RegistrationComponent
      ),
    canActivate: [unAuthGuardCanActivate],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: AuthRoutesUrl.LOGIN
  }
];