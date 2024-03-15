import { inject } from '@angular/core'
import { Router } from '@angular/router'
import { Product } from '@app/models/server'
import { ProductService } from '@app/services'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, delay, map, mergeMap, of, tap } from 'rxjs'
import {
  createProduct,
  createProductError,
  createProductSuccess,
  getProduct,
  getProductError,
  getProductSuccess,
  updateProduct,
  updateProductError,
  updateProductSuccess,
} from './product.actions'

export const createProduct$ = createEffect(
  (
    actions$ = inject(Actions),
    router: Router = inject(Router),
    productService: ProductService = inject(ProductService)
  ) => {
    return actions$.pipe(
      ofType(createProduct),
      mergeMap((params) => {
        return productService.createProduct(params.product).pipe(
          delay(1000),
          tap((res: Product): void => {
            router.navigate(['/shop']);
          }),
          map((product: Product) => createProductSuccess({ product })),
          catchError((error) => of(createProductError(error)))
        );
      })
    );
  },
  { functional: true }
);

export const updateProduct$ = createEffect(
  (
    actions$ = inject(Actions),
    productService: ProductService = inject(ProductService)
  ) => {
    return actions$.pipe(
      ofType(updateProduct),
      mergeMap((action) => {
        return productService.updateProduct(action.id, action.product).pipe(
          delay(1000),
          map((product: Product) => updateProductSuccess({ product })),
          catchError((error) => of(updateProductError(error)))
        );
      })
    );
  },
  { functional: true }
);

export const getProduct$ = createEffect(
  (
    actions$ = inject(Actions),
    productService: ProductService = inject(ProductService)
  ) => {
    return actions$.pipe(
      ofType(getProduct),
      mergeMap((action) => {
        return productService.getProduct(action.id).pipe(
          delay(1000),
          map((product: Product) => getProductSuccess({ product })),
          catchError((error) => of(getProductError(error)))
        );
      })
    );
  },
  { functional: true }
);