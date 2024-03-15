import { createReducer, on } from '@ngrx/store'
import { Action, ActionReducer } from '@ngrx/store/src/models'
import * as fromActions from './product.actions'
import { ProductListState } from './product.state'

export const productInitialState: ProductListState = {
  product: null,
  loading: null,
  error: null
}

export const productReducers: ActionReducer<ProductListState, Action> =
  createReducer<ProductListState>(
    productInitialState,
    on(
      fromActions.createProduct,
      (state: ProductListState): ProductListState => ({
        ...state,
        loading: true,
        error: null
      })
    ),
    on(
      fromActions.createProductSuccess,
      (state: ProductListState, action): ProductListState => ({
        ...state,
        loading: false,
        error: null,
        product: action.product
      })
    ),
    on(
      fromActions.createProductError,
      (state: ProductListState, action): ProductListState => ({
        ...state,
        loading: false,
        error: action.error,
        product: null
      })
    ),
    on(
      fromActions.updateProduct,
      (state: ProductListState): ProductListState => ({
        ...state,
        loading: true,
        error: null
      })
    ),
    on(
      fromActions.updateProductSuccess,
      (state: ProductListState, action): ProductListState => ({
        ...state,
        loading: false,
        error: null,
        product: action.product
      })
    ),
    on(
      fromActions.updateProductError,
      (state: ProductListState, action): ProductListState => ({
        ...state,
        loading: false,
        error: action.error,
        product: null
      })
    ),
    on(
      fromActions.getProduct,
      (state: ProductListState): ProductListState => ({
        ...state,
        loading: true,
        error: null
      })
    ),
    on(
      fromActions.getProductSuccess,
      (state: ProductListState, action): ProductListState => ({
        ...state,
        loading: false,
        error: null,
        product: action.product
      })
    ),
    on(
      fromActions.getProductError,
      (state: ProductListState, action): ProductListState => ({
        ...state,
        loading: false,
        error: action.error,
        product: null
      })
    )
  );