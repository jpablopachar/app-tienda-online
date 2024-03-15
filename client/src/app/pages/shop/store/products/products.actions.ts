import { HttpParams } from "@angular/common/http"
import { Pagination } from "@app/models/server"
import { createAction, props } from '@ngrx/store'
import { ProductsTypes } from "./products.types"

export const getProductsAction = createAction(
  ProductsTypes.GET_PRODUCTS,
  props<{ paginationRequest: HttpParams, paramsUrl: string }>()
);

export const getProductsSuccessAction = createAction(
  ProductsTypes.GET_PRODUCTS_SUCCESS,
  props<{ pagination: Pagination | null }>()
);

export const getProductsErrorAction = createAction(
  ProductsTypes.GET_PRODUCTS_ERROR,
  props<{ error: string }>()
);