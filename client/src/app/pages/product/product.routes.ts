import { Routes } from '@angular/router'
import { authGuardCanActivate } from '@app/guards'
import { AuthRoutesUrl } from '../auth/auth.routes.enum'
import { ProductRoutesUrl } from './product.routes.enum'

export const ProductRoutes: Routes = [
  {
    path: ProductRoutesUrl.NEW,
    loadComponent: () =>
      import('./pages/new-product/new-product.component').then(
        (c) => c.NewProductComponent
      ),
    canActivate: [authGuardCanActivate],
  },
  {
    path: `:${ProductRoutesUrl.ID}`,
    loadComponent: () =>
      import('./pages/update-product/update-product.component').then(
        (c) => c.UpdateProductComponent
      ),
    canActivate: [authGuardCanActivate],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: AuthRoutesUrl.LOGIN,
  },
];
