import { createReducer, on } from '@ngrx/store'
import { Action, ActionReducer } from '@ngrx/store/src/models'
import * as fromActions from './product.actions'
import { ProductState } from './product.state'

export const productInitialState: ProductState = {
  product: null,
  loading: null,
  error: null

}

export const productReducers: ActionReducer<ProductState, Action> =
  createReducer<ProductState>(
    productInitialState,
    on(
      fromActions.createProduct,
      (state: ProductState): ProductState => ({
        ...state,
        loading: true,
        error: null
      })
    ),
    on(
      fromActions.createProductSuccess,
      (state: ProductState, action): ProductState => ({
        ...state,
        loading: false,
        error: null,
        product: action.product
      })
    ),
    on(
      fromActions.createProductError,
      (state: ProductState, action): ProductState => ({
        ...state,
        loading: false,
        error: action.error,
        product: null
      })
    ),
    on(
      fromActions.updateProduct,
      (state: ProductState): ProductState => ({
        ...state,
        loading: true,
        error: null
      })
    ),
    on(
      fromActions.updateProductSuccess,
      (state: ProductState, action): ProductState => ({
        ...state,
        loading: false,
        error: null,
        product: action.product
      })
    ),
    on(
      fromActions.updateProductError,
      (state: ProductState, action): ProductState => ({
        ...state,
        loading: false,
        error: action.error,
        product: null
      })
    ),
    on(
      fromActions.getProduct,
      (state: ProductState): ProductState => ({
        ...state,
        loading: true,
        error: null
      })
    ),
    on(
      fromActions.getProductSuccess,
      (state: ProductState, action): ProductState => ({
        ...state,
        loading: false,
        error: null,
        product: action.product
      })
    ),
    on(
      fromActions.getProductError,
      (state: ProductState, action): ProductState => ({
        ...state,
        loading: false,
        error: action.error,
        product: null
      })
    )
  );