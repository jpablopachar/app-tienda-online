import { Routes } from '@angular/router'
import { RoutesUrl } from './routes.enum'

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: RoutesUrl.PRODUCT,
        /* providers: [
          provideState('product', productReducers),
          provideEffects(productEffects)
        ], */
        loadChildren: () =>
          import('./pages/product/product.routes').then((r): Routes => r.ProductRoutes),
      },
      {
        path: RoutesUrl.AUTH,
        loadChildren: () =>
          import('./pages/auth/auth.routes').then((r): Routes => r.AuthRoutes),
      },
      {
        path: RoutesUrl.SHOP,
        loadChildren: () =>
          import('./pages/shop/shop.routes').then((r): Routes => r.ShopRoutes),
      },
      {
        path: RoutesUrl.STATIC,
        loadChildren: () =>
          import('./pages/static/static.routes').then(
            (r): Routes => r.staticRoutes
          ),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: RoutesUrl.STATIC_WELCOME,
      },
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: RoutesUrl.STATIC_404,
  },
];