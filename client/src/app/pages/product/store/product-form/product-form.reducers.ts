import { createReducer, on } from '@ngrx/store'
import { Action, ActionReducer } from '@ngrx/store/src/models'
import * as fromActions from './product-form.actions'
import { ProductFormState } from './product-form.state'

export const productFormInitialState: ProductFormState = {
  name: null,
  description: null,
  category: null,
  price: null,
  brand: null,
  photoURL: null,
  stock: null
}

export const productFormReducers: ActionReducer<ProductFormState, Action> =
  createReducer<ProductFormState>(
    productFormInitialState,
    on(
      fromActions.setForm,
      (state: ProductFormState, action): ProductFormState => ({
        ...state,
        ...action.productForm
      })
    ),
    on(
      fromActions.updateForm,
      (state: ProductFormState, action): ProductFormState => ({
        ...state,
        ...action.changes
      })
    ),
    on(
      fromActions.clearForm,
      (state: ProductFormState, action): ProductFormState => ({
        ...productFormInitialState
      })
    )
  );