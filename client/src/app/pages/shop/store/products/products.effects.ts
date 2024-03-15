import { inject } from '@angular/core'
import { Pagination } from '@app/models/server'
import { ProductService } from '@app/services'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, delay, map, mergeMap, of } from 'rxjs'
import * as fromActions from './products.actions'

export const getProducts$ = createEffect(
  (
    actions$ = inject(Actions),
    productService: ProductService = inject(ProductService)
  ) => {
    return actions$.pipe(
      ofType(fromActions.getProducts),
      mergeMap((action) => {
        return productService.getProducts(action.paramsUrl).pipe(
          delay(1000),
          map((pagination: Pagination) => fromActions.getProductsSuccess({ pagination })),
          catchError((error) => of(fromActions.getProductsError(error)))
        );
      })
    );
  },
  { functional: true }
);