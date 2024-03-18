import { ProductForm } from '@app/models/client'
import { createSelector } from '@ngrx/store'
import { ProductState, selectProduct } from '..'

export const selectGetProductForm = createSelector(
  selectProduct,
  (state: ProductState): ProductForm => state.form
);