import { ProductForm } from '@app/models/client'
import { createReducer, on } from '@ngrx/store'
import { Action, ActionReducer } from '@ngrx/store/src/models'
import * as fromActions from './product.actions'

export type ProductFormState = ProductForm;

const productFormInitialState: ProductFormState = {
  name: null,
  description: null,
  category: null,
  brand: null,
  photoURL: null,
  price: null,
  stock: null
}

export const productFormReducers: ActionReducer<ProductFormState, Action> =
  createReducer<ProductFormState>(
    productFormInitialState,
    on(
      fromActions.setForm,
      (state: ProductForm, action): ProductFormState => ({
        ...state,
        ...action.productForm
      })
    ),
    on(
      fromActions.updateForm,
      (state: ProductForm, action): ProductFormState => ({
        ...state,
        ...action.changes
      })
    ),
    on(
      fromActions.clearForm,
      (state: ProductForm): ProductFormState => ({
        ...state
      })
    )
  );