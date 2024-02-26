import { Routes } from '@angular/router'
import { StaticRoutesUrl } from './static.routes.enum'

export const staticRoutes: Routes = [
  {
    path: StaticRoutesUrl.WELCOME,
    loadComponent: () =>
      import('./pages/welcome/welcome.component').then(
        (c) => c.WelcomeComponent
      ),
  },
  {
    path: StaticRoutesUrl.STATIC_404,
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(
        (c) => c.NotFoundComponent
      ),
  },
];
