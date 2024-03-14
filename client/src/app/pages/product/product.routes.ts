import { Routes } from '@angular/router'
import { AuthRoutesUrl } from '../auth/auth.routes.enum'
import { ProductRoutesUrl } from './product.routes.enum'

export const ProductRoutes: Routes = [
  {
    path: ProductRoutesUrl.NEW,
    loadComponent: () =>
      import('./pages/new-product/new-product.component').then(
        (c) => c.NewProductComponent
      ),
  },
  {
    path: `:${ProductRoutesUrl.ID}`,
    loadComponent: () =>
      import('./pages/update-product/update-product.component').then(
        (c) => c.UpdateProductComponent
      ),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: AuthRoutesUrl.LOGIN
  }
];