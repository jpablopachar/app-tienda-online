import { Routes } from '@angular/router'
import { AuthRoutesUrl } from './auth.routes.enum'

export const staticRoutes: Routes = [
  {
    path: AuthRoutesUrl.LOGIN,
    loadComponent: () =>
      import('./pages/login/login.component').then(
        (c) => c.LoginComponent
      ),
  },
  {
    path: AuthRoutesUrl.REGISTRATION,
    loadComponent: () =>
      import('./pages/registration/registration.component').then(
        (c) => c.RegistrationComponent
      ),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: AuthRoutesUrl.LOGIN
  }
];