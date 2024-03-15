import { createReducer, on } from '@ngrx/store'
import { Action, ActionReducer } from '@ngrx/store/src/models'
import * as fromActions from './products.actions'
import { ProductsState } from './products.state'

export const productsInitialState : ProductsState = {
  pagination:  null,
  requestPagination: null,
  loading: null,
  error: null
}

export const productsReducers: ActionReducer<ProductsState, Action> =
  createReducer<ProductsState>(
    productsInitialState,
    on(
      fromActions.getProductsAction,
      (state: ProductsState, action): ProductsState => ({
        ...state,
        loading: true,
        error: null,
        requestPagination: action.paginationRequest
      })
    ),
    on(
      fromActions.getProductsSuccessAction,
      (state: ProductsState, action): ProductsState => ({
        ...state,
        loading: false,
        error: null,
        pagination: action.pagination
      })
    ),
    on(
      fromActions.getProductsErrorAction,
      (state: ProductsState, action): ProductsState => ({
        ...state,
        loading: false,
        error: action.error
      })
    )
  );